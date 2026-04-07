import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, User, LogOut, Shield } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const userLabel = user?.name || user?.email || 'User';
  const userInitial = userLabel.charAt(0).toUpperCase();

  const handleLogout = async () => {
    const { error } = await logout();
    if (!error) {
      navigate('/login');
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Collections', href: '/#collection' },
    { label: 'About', href: '/about' },
    { label: 'Custom Order', href: '/custom-manufacture' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-50 border-b border-white/10 bg-black/20 backdrop-blur-md transition-all duration-300"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Link 
              to="/" 
              className="font-serif font-bold text-3xl bg-gradient-to-r from-amber-300 via-amber-200 to-orange-300 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              Stahl <span className="text-white">Tech</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation - Centered Capsule */}
          <nav className="hidden lg:flex items-center gap-1 px-2 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/15 rounded-full transition-all duration-300 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-amber-300 to-orange-400 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  {isAuthenticated && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-gradient-to-r from-amber-400 to-orange-500 text-black rounded-full hover:shadow-lg hover:shadow-amber-500/40 transition-all duration-300 group"
                      >
                        <Shield className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                        Dashboard
                      </Link>
                    </motion.div>
                  )}
                  
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-300 to-orange-400 flex items-center justify-center text-xs font-bold text-black">
                      {userInitial}
                    </div>
                    <span className="text-xs text-white/80 max-w-[100px] truncate">
                      {userLabel.split(' ')[0]}
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={handleLogout}
                    className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300"
                    title="Logout"
                  >
                    <LogOut className="h-4 w-4" />
                  </motion.button>
                </div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to="/login"
                    className="flex items-center gap-2 px-6 py-2 text-sm font-semibold bg-gradient-to-r from-amber-400 to-orange-500 text-black rounded-full hover:shadow-lg hover:shadow-amber-500/40 transition-all duration-300 group"
                  >
                    <User className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                    Login
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden mt-4 overflow-hidden"
          >
            <nav className="flex flex-col gap-2 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/15 rounded-lg transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="border-t border-white/10 pt-2">
                {isAuthenticated ? (
                  <>
                    {isAuthenticated && (
                      <Link
                        to="/admin"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/15 rounded-lg transition-all duration-300"
                      >
                        <Shield className="h-4 w-4" />
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/15 rounded-lg transition-all duration-300"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-gradient-to-r from-amber-400 to-orange-500 text-black rounded-lg hover:shadow-lg transition-all duration-300 w-full"
                  >
                    <User className="h-4 w-4" />
                    Login
                  </Link>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
