import { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
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
          setLoading(true);
          await checkAdminRole(session.user);
        } else {
          setUser(null);
          setIsAdmin(false);
          setLoading(false);
        }
      } catch (error) {
        setUser(null);
        setIsAdmin(false);
        setLoading(false);
      }
    };
    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        setUser(session.user);
        setLoading(true);
        await checkAdminRole(session.user);
      } else {
        setUser(null);
        setIsAdmin(false);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function checkAdminRole(supabaseUser) {
    try {
      setUser(supabaseUser);
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', supabaseUser.id)
        .single();

      if (!error && data?.role === 'admin') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (err) {
      setIsAdmin(false);
    } finally {
      setLoading(false); // Fixes the infinite loading pulse
    }
  }

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
      setIsAdmin(false);
      setLoading(false);
    }

    return result;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: Boolean(user), isAdmin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);