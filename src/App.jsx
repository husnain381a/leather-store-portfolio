import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CustomManufacture from "./pages/CustomManufacture";
import AdminDashboard from "./pages/AdminDashboard";
import ReactWhatsapp from "react-whatsapp";
import { FaWhatsapp } from "react-icons/fa";
import { useLenis } from "./hooks/useLenis";
import { Loader2 } from 'lucide-react';

const AdminRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // Return a spinner instead of null
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" replace />;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

const AppContent = () => {
  useLenis();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} /> {/* The new About route */}
        <Route path="/contact" element={<Contact />} /> {/* The new Contact route */}
        <Route path="/custom-manufacture" element={<CustomManufacture />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminRoute />} />
      </Routes>
    </BrowserRouter>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <AppContent />

        {/* WhatsApp Floating Circle Button */}
        <div className="fixed bottom-3 right-3 z-50 sm:bottom-5 sm:right-5">
          <ReactWhatsapp
            number="+923338600603"
            message="Hello, I want to inquire about your products"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 shadow-lg transition-all duration-300 hover:bg-green-600 sm:h-14 sm:w-14"
          >
            <FaWhatsapp size={28} color="white" />
          </ReactWhatsapp>
        </div>

      </ProductProvider>
    </AuthProvider>
  );
}