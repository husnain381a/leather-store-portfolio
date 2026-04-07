import { useEffect, useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Edit, Trash2, X, Save, LogOut, Search, Upload, Loader2, LayoutDashboard, RefreshCcw, ExternalLink
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useProducts } from '@/context/ProductContext';
import { supabase } from '@/lib/supabase';
import { toast } from "sonner";

export default function AdminDashboard() {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const navigate = useNavigate();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [customRequests, setCustomRequests] = useState([]);
  const [isRequestsLoading, setIsRequestsLoading] = useState(true);
  const [contactInquiries, setContactInquiries] = useState([]);
  const [isContactLoading, setIsContactLoading] = useState(true);

  // Added color and size to initial state
  const [formData, setFormData] = useState({
    name: '', category: 'Bullwhips', size: '', color: '', price: '', description: '', image_url: ''
  });

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchCustomRequests = async () => {
    try {
      setIsRequestsLoading(true);
      const { data, error } = await supabase
        .from('custom_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCustomRequests(data || []);
    } catch (error) {
      console.error('Unable to load custom requests:', error.message);
      toast.error('Unable to load custom requests.');
    } finally {
      setIsRequestsLoading(false);
    }
  };

  const fetchContactInquiries = async () => {
    try {
      setIsContactLoading(true);
      const { data, error } = await supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContactInquiries(data || []);
    } catch (error) {
      console.error('Unable to load contact inquiries:', error.message);
      toast.error('Unable to load contact inquiries.');
    } finally {
      setIsContactLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    fetchCustomRequests();
    fetchContactInquiries();

    const channel = supabase
      .channel('custom-requests-realtime-admin')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'custom_requests' }, () => {
        fetchCustomRequests();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_inquiries' }, () => {
        fetchContactInquiries();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAuthenticated]);

  const handleLogout = async () => {
    const { error } = await logout();
    if (!error) {
      navigate('/login');
    }
  };

  const handleOpenForm = (product = null) => {
    setImageFile(null);
    if (product) {
      setEditingProduct(product);
      setFormData({ 
        ...product, 
        price: product.price.toString(),
        color: product.color || '', 
        size: product.size || '' 
      });
    } else {
      setEditingProduct(null);
      setFormData({ name: '', category: 'Bullwhips', size: '', color: '', price: '', description: '', image_url: '' });
    }
    setIsFormOpen(true);
  };

  const uploadImage = async (file) => {
    try {
      setIsUploading(true);
      const filePath = `${Math.random()}.${file.name.split('.').pop()}`;
      const { error } = await supabase.storage.from('product-images').upload(filePath, file);
      if (error) throw error;
      const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error) {
      toast.error("Upload failed: " + error.message);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let finalImageUrl = formData.image_url;
      if (imageFile) {
        const uploadedUrl = await uploadImage(imageFile);
        if (uploadedUrl) finalImageUrl = uploadedUrl;
      }

      const productData = {
        ...formData,
        image_url: finalImageUrl,
        price: parseFloat(formData.price) || 0
      };

      const result = editingProduct 
        ? await updateProduct(editingProduct.id, productData)
        : await addProduct(productData);

      if (result?.error) {
        toast.error("Database Error: " + result.error.message);
      } else {
        setIsFormOpen(false);
        toast.success(editingProduct ? "Updated" : "Published");
      }
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <nav className="sticky top-0 z-40 border-b border-border bg-card/50 backdrop-blur-md">
        <div className="container mx-auto flex min-h-20 flex-col gap-3 px-4 py-3 sm:px-6 md:h-20 md:flex-row md:items-center md:justify-between md:py-0">
          <div className="flex items-center gap-4">
            <LayoutDashboard className="text-primary h-6 w-6" />
            <h1 className="font-serif text-2xl tracking-tight">Admin Console</h1>
          </div>
          <div className="flex w-full items-center justify-between gap-3 md:w-auto md:justify-end md:gap-6">
            <Link to="/" className="text-sm hover:text-primary transition-colors">View Store</Link>
            <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-destructive hover:bg-destructive/10 px-4 py-2 rounded-sm transition-all">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 sm:px-6 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-card p-6 border border-border rounded-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">Total Pieces</p>
            <p className="text-4xl font-serif text-primary">{products.length}</p>
          </div>
          <div className="md:col-span-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="relative w-full flex-1 md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" placeholder="Search Inventory..." 
                className="input-luxury pl-10 w-full"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button onClick={() => handleOpenForm()} className="btn-luxury flex w-full items-center justify-center gap-2 md:w-auto">
              <Plus size={20} /> Add Masterpiece
            </button>
          </div>
        </div>

        {/* Product Cards show color/size if available */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group bg-card border border-border rounded-sm overflow-hidden transition-all hover:border-primary/40 shadow-sm">
              <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                <img src={product.image_url || '/placeholder.svg'} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button onClick={() => handleOpenForm(product)} className="p-2 bg-background/90 rounded-full hover:text-primary"><Edit size={18} /></button>
                  <button onClick={() => deleteProduct(product.id)} className="p-2 bg-background/90 rounded-full hover:text-destructive"><Trash2 size={18} /></button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif text-xl">{product.name}</h3>
                  <span className="text-primary font-medium tracking-tight">${product.price}</span>
                </div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {product.category} {product.color ? `• ${product.color}` : ''} {product.size ? `• ${product.size}` : ''}
                </p>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-16 rounded-sm border border-border bg-card/40 p-6 md:p-8">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Custom Manufacture</p>
              <h2 className="mt-1 font-serif text-2xl">Customer Custom Requests</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                {customRequests.length} request(s)
              </span>
              <button
                type="button"
                onClick={fetchCustomRequests}
                className="inline-flex items-center gap-2 rounded-sm border border-border px-3 py-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
              >
                <RefreshCcw className="h-3.5 w-3.5" />
                Refresh
              </button>
            </div>
          </div>

          {isRequestsLoading ? (
            <div className="py-10 text-center text-muted-foreground">
              <Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin" />
              Loading custom requests...
            </div>
          ) : customRequests.length === 0 ? (
            <div className="py-10 text-center text-muted-foreground">
              No custom requests found yet.
            </div>
          ) : (
            <div className="space-y-4">
              {customRequests.map((request) => (
                <div key={request.id} className="rounded-sm border border-border bg-background/60 p-4 md:p-5">
                  <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <h3 className="font-serif text-lg">{request.full_name}</h3>
                    <span className="text-xs text-muted-foreground">
                      {request.created_at ? new Date(request.created_at).toLocaleString() : 'N/A'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
                    <p><span className="text-muted-foreground">Email:</span> {request.email || 'N/A'}</p>
                    <p><span className="text-muted-foreground">Phone:</span> {request.phone || 'N/A'}</p>
                    <p><span className="text-muted-foreground">Type:</span> {request.product_type || 'Custom Whip'}</p>
                    <p><span className="text-muted-foreground">Color:</span> {request.preferred_color || 'N/A'}</p>
                    <p><span className="text-muted-foreground">Foot Size:</span> {request.foot_size || 'N/A'}</p>
                    <p>
                      <span className="text-muted-foreground">Reference:</span>{' '}
                      {request.reference_image_url ? (
                        <a
                          href={request.reference_image_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-primary hover:underline"
                        >
                          View Image <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </div>

                  <div className="mt-3 rounded-sm border border-border/60 bg-card/40 p-3 text-sm leading-relaxed">
                    <span className="text-muted-foreground">Requirements:</span> {request.requirements}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mt-10 rounded-sm border border-border bg-card/40 p-6 md:p-8">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Contact Form</p>
              <h2 className="mt-1 font-serif text-2xl">Customer Contact Inquiries</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                {contactInquiries.length} inquiry(s)
              </span>
              <button
                type="button"
                onClick={fetchContactInquiries}
                className="inline-flex items-center gap-2 rounded-sm border border-border px-3 py-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
              >
                <RefreshCcw className="h-3.5 w-3.5" />
                Refresh
              </button>
            </div>
          </div>

          {isContactLoading ? (
            <div className="py-10 text-center text-muted-foreground">
              <Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin" />
              Loading contact inquiries...
            </div>
          ) : contactInquiries.length === 0 ? (
            <div className="py-10 text-center text-muted-foreground">
              No contact inquiries found yet.
            </div>
          ) : (
            <div className="space-y-4">
              {contactInquiries.map((inquiry) => (
                <div key={inquiry.id} className="rounded-sm border border-border bg-background/60 p-4 md:p-5">
                  <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <h3 className="font-serif text-lg">{inquiry.name}</h3>
                    <span className="text-xs text-muted-foreground">
                      {inquiry.created_at ? new Date(inquiry.created_at).toLocaleString() : 'N/A'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
                    <p><span className="text-muted-foreground">Email:</span> {inquiry.email || 'N/A'}</p>
                    <p><span className="text-muted-foreground">Subject:</span> {inquiry.subject || 'N/A'}</p>
                  </div>

                  <div className="mt-3 rounded-sm border border-border/60 bg-card/40 p-3 text-sm leading-relaxed">
                    <span className="text-muted-foreground">Message:</span> {inquiry.message}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background/95 p-3 backdrop-blur-md sm:items-center sm:p-6">
            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="my-2 w-full max-w-4xl rounded-sm border border-border bg-card p-5 shadow-2xl sm:my-auto sm:p-10">
              <div className="flex justify-between items-center mb-10">
                <h2 className="font-serif text-3xl">{editingProduct ? 'Update Product' : 'New Collection Item'}</h2>
                <button onClick={() => setIsFormOpen(false)}><X size={24} /></button>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">Identification</label>
                    <input required placeholder="Product Name" className="input-luxury w-full" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">Category</label>
                      <select className="input-luxury w-full bg-background" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                        <option>Bullwhips</option>
                        <option>Stockwhips</option>
                        <option>Snake Whips</option>
                        <option>Accessories</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">Price (USD)</label>
                      <input type="number" step="0.01" required className="input-luxury w-full" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                    </div>
                  </div>

                  {/* New Row for Color and Size */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">Primary Color</label>
                      <input placeholder="e.g. Brandy" className="input-luxury w-full" value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">Standard Size</label>
                      <input placeholder="e.g. 8ft" className="input-luxury w-full" value={formData.size} onChange={e => setFormData({...formData, size: e.target.value})} />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">Detailed Narrative</label>
                    <textarea rows={4} className="input-luxury w-full resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground block">Product Visuals</label>
                    <div className="h-64 w-full border border-dashed border-border rounded-sm flex flex-col items-center justify-center relative overflow-hidden bg-muted/30">
                      {imageFile || formData.image_url ? (
                        <img src={imageFile ? URL.createObjectURL(imageFile) : formData.image_url} className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      )}
                      <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setImageFile(e.target.files[0])} />
                    </div>
                  </div>
                  <div className="pt-6 flex flex-col gap-3 sm:flex-row sm:gap-4 sm:pt-10">
                    <button type="button" onClick={() => setIsFormOpen(false)} className="flex-1 py-4 border border-border uppercase text-[10px] tracking-widest">Cancel</button>
                    <button type="submit" disabled={isUploading} className="flex-1 py-4 bg-primary text-primary-foreground uppercase text-[10px] tracking-widest flex items-center justify-center gap-2">
                      {isUploading ? <Loader2 className="animate-spin h-3 w-3" /> : <Save size={14} />}
                      {editingProduct ? 'Save Changes' : 'Publish Item'}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}