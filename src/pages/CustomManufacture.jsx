import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Send } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const COLOR_PALETTE_IMAGE_URL = 'https://res.cloudinary.com/dxekyuabh/image/upload/v1775588982/WhatsApp_Image_2026-04-08_at_12.07.42_AM_qamhag.jpg';

export default function CustomManufacture() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    preferred_color: '',
    foot_size: '',
    product_type: 'Custom Whip',
    requirements: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const uploadReferenceImage = async () => {
    if (!imageFile) return null;

    const extension = imageFile.name.split('.').pop();
    const filePath = `custom-requests/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;

    const { error } = await supabase.storage
      .from('custom-request-images')
      .upload(filePath, imageFile, { upsert: false });

    if (error) throw error;

    const { data } = supabase.storage.from('custom-request-images').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSupabaseConfigured) {
      toast.error('Supabase is not configured yet.');
      return;
    }

    setIsSubmitting(true);

    try {
      const imageUrl = await uploadReferenceImage();

      const payload = {
        ...formData,
        reference_image_url: imageUrl,
      };

      const { error } = await supabase.from('custom_requests').insert([payload]);
      if (error) throw error;

      toast.success('Thanks! Your form has been submitted successfully.');
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        preferred_color: '',
        foot_size: '',
        product_type: 'Custom Whip',
        requirements: '',
      });
      setImageFile(null);
    } catch (error) {
      toast.error(error.message || 'Unable to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container mx-auto px-6 py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl"
        >
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-primary">Custom Product Manufacture</p>
            <h1 className="mt-4 font-serif text-4xl md:text-5xl">Build Your Own Masterpiece</h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Share your exact requirements including color, foot size, and reference image.
              Our workshop team will review and contact you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="rounded-sm border border-border bg-card/40 p-6 md:p-10 shadow-2xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="input-luxury w-full"
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-luxury w-full"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Phone / WhatsApp</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-luxury w-full"
                  placeholder="+92..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Preferred Color</label>
                <input
                  type="text"
                  name="preferred_color"
                  value={formData.preferred_color}
                  onChange={handleChange}
                  className="input-luxury w-full"
                  placeholder="Brandy / Black / Custom"
                />
                <p className="text-[11px] text-muted-foreground">
                  Use the palette below while entering your color choice.
                </p>
                <a
                  href={COLOR_PALETTE_IMAGE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="block overflow-hidden rounded-sm border border-border/70"
                >
                  <img
                    src={COLOR_PALETTE_IMAGE_URL}
                    alt="Leather color palette reference"
                    className="h-36 w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                  />
                </a>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Foot Size</label>
                <input
                  type="text"
                  name="foot_size"
                  value={formData.foot_size}
                  onChange={handleChange}
                  className="input-luxury w-full"
                  placeholder="e.g. 8 ft"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Product Type</label>
                <select
                  name="product_type"
                  value={formData.product_type}
                  onChange={handleChange}
                  className="input-luxury w-full bg-background"
                >
                  <option>Custom Whip</option>
                  <option>Bullwhip</option>
                  <option>Snake Whip</option>
                  <option>Stock Whip</option>
                  <option>Signal Whip</option>
                  <option>Accessory</option>
                </select>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Detailed Requirements</label>
              <textarea
                rows={6}
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                className="input-luxury w-full resize-none"
                placeholder="Describe braid style, handle preference, performance use, finish, and any custom details."
                required
              />
            </div>

            <div className="mt-6 space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Reference Image (Optional)</label>
              <div className="relative flex h-44 w-full items-center justify-center overflow-hidden rounded-sm border border-dashed border-border bg-muted/20">
                {imageFile ? (
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Reference"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <Upload className="mx-auto mb-2 h-6 w-6" />
                    Upload reference image
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 cursor-pointer opacity-0"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-luxury mt-8 flex w-full items-center justify-center gap-2 py-4 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? 'Submitting...' : 'Submit Custom Request'}
            </button>
          </form>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
