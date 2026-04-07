import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, Facebook } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1, delayChildren: 0.3 } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Contact() {
  const [searchParams] = useSearchParams();
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Custom Whip Commission',
    message: '',
  });

  useEffect(() => {
    const subjectParam = searchParams.get('subject');
    const productParam = searchParams.get('product');

    if (!subjectParam && !productParam) {
      return;
    }

    setFormData((current) => ({
      ...current,
      subject: subjectParam || current.subject,
      message: productParam ? `I would like to discuss: ${productParam}` : current.message,
    }));
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSupabaseConfigured) {
      toast.error('Supabase is not configured yet.');
      return;
    }

    setIsSending(true);

    try {
      const { error } = await supabase.from('contact_inquiries').insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
      ]);

      if (error) throw error;

      toast.success('Thanks! Your form has been submitted successfully.');
      setFormData({
        name: '',
        email: '',
        subject: 'Custom Whip Commission',
        message: '',
      });
    } catch (error) {
      toast.error(error.message || 'Unable to send your message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container mx-auto px-6 py-24 lg:py-32">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-20"
        >
          {/* Left Side: Contact Information */}
          <div className="space-y-12">
            <motion.div variants={itemVariants} className="space-y-4">
              <span className="text-xs uppercase tracking-[0.4em] text-primary font-medium">Get in Touch</span>
              <h1 className="font-serif text-5xl md:text-6xl tracking-tight italic">
                Connect with the <span className="text-primary">Atelier</span>
              </h1>
              <p className="text-muted-foreground max-w-md leading-relaxed">
                Whether you are seeking a custom-balanced bullwhip or have questions about our artisan techniques, our team is here to assist.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="p-3 border border-border group-hover:border-primary transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Call Our Workshop</p>
                  <a href="tel:+923338600603" className="text-xl font-serif hover:text-primary transition-colors">+92 333 86 00 603</a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="p-3 border border-border group-hover:border-primary transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Electronic Correspondence</p>
                  <a href="mailto:stahltech.biz@gmail.com" className="text-xl font-serif hover:text-primary transition-colors">stahltech.biz@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="p-3 border border-border group-hover:border-primary transition-colors">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Global Headquarters</p>
                  <p className="text-xl font-serif italic">Sialkot, Punjab, Pakistan</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-8">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Follow the Craft</p>
              <div className="flex gap-6">
                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <Instagram className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
                </a>
                <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">
                  <Facebook className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Inquiry Form */}
          <motion.div 
            variants={itemVariants}
            className="bg-card/30 border border-border p-8 md:p-12 rounded-sm shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />
            
            <h2 className="font-serif text-2xl mb-8">Direct Inquiry</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-luxury w-full"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-luxury w-full"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input-luxury w-full bg-background"
                >
                  <option>Custom Whip Commission</option>
                  <option>Product Maintenance Inquiry</option>
                  <option>Wholesale/Export Partnership</option>
                  <option>General Support</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Message</label>
                <textarea
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="input-luxury w-full resize-none"
                  placeholder="How may we assist you today?"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="btn-luxury w-full py-4 flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                {isSending ? 'Sending...' : 'Send Inquiry'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}