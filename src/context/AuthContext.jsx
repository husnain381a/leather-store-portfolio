import { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    if (!isSupabaseConfigured) {
      return { data: null, error: { message: 'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.' } };
    }

    setLoading(true);
    const result = await supabase.auth.signInWithPassword({ email, password });
    if (!result.error) {
      const signedInUser = result.data?.user || result.data?.session?.user || null;
      setUser(signedInUser);
    } else {
      setLoading(false);
    }

    return result;
  };

  const logout = async () => {
    if (!isSupabaseConfigured) {
      return { error: null };
    }

    const result = await supabase.auth.signOut();
    if (!result.error) {
      setUser(null);
      setLoading(false);
    }

    return result;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: Boolean(user), loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);