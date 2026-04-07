import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { isSupabaseConfigured } from '@/lib/supabase';
import { toast } from "sonner";
import Header from '@/components/Header';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!isSupabaseConfigured) {
        setError('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
        return;
      }

      const { error: authError } = await login(email, password);
      
      if (authError) {
        setError(authError.message || 'Invalid credentials');
        return;
      }

      toast.success("Access Granted. Welcome back.");
      navigate('/admin', { replace: true });
    } catch (err) {
      setError('Connection error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      <Header />

      <div className="relative flex min-h-[calc(100vh-88px)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-amber-400/15 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl"
        >
          <div className="grid lg:grid-cols-2">
            <div className="hidden lg:flex flex-col justify-between p-10 xl:p-14 bg-gradient-to-br from-amber-400/20 via-orange-500/10 to-black/20 border-r border-white/10">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-white/70">Stahl Tech Leather</p>
                <h1 className="mt-4 font-serif text-4xl xl:text-5xl leading-tight text-white">
                  Secure access for your admin workspace.
                </h1>
                <p className="mt-6 max-w-md text-base leading-relaxed text-white/70">
                  Sign in to manage products, content, and the premium storefront experience.
                </p>
              </div>

              <div className="space-y-4 text-sm text-white/70">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-amber-300" />
                  Fast admin access
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-orange-300" />
                  Premium dashboard control
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-white" />
                  Secure session authentication
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-10 xl:p-14">
              <div className="mb-8 text-center lg:text-left">
                <Link to="/" className="font-serif text-3xl sm:text-4xl font-bold text-white">
                  Stahl <span className="text-amber-300">Tech</span>
                </Link>
                <p className="mt-3 text-base text-white/65">Admin Authentication</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/45" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="input-luxury w-full pl-12 pr-4 py-4 text-base bg-black/20 border-white/10 text-white placeholder:text-white/40"
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/45" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="input-luxury w-full pl-12 pr-12 py-4 text-base bg-black/20 border-white/10 text-white placeholder:text-white/40"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/45 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-luxury w-full flex items-center justify-center gap-2 py-4 text-base font-semibold"
                >
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Sign In'}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}