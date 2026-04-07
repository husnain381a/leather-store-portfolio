import { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { products as fallbackProducts } from '@/data/products';
import { toast } from 'sonner';

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFallbackProducts = () =>
    fallbackProducts.map((product) => ({
      ...product,
      image_url: product.image,
    }));

  useEffect(() => {
    let isMounted = true;

    if (!isSupabaseConfigured) {
      setProducts(getFallbackProducts());
      setLoading(false);
      return () => {
        isMounted = false;
      };
    }

    async function fetchProducts() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (isMounted) {
          const hasData = Array.isArray(data) && data.length > 0;
          if (hasData) {
            setProducts(data);
          } else {
            setProducts(getFallbackProducts());
            toast.error('No products from Supabase. Showing local collection.');
          }
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Connection failed:', error.message);
          if (isMounted) {
            setProducts(getFallbackProducts());
            toast.error('Supabase unavailable. Showing local collection.');
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    const channel = supabase
      .channel('products-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        (payload) => {
          setProducts((currentProducts) => {
            if (payload.eventType === 'INSERT') {
              return [payload.new, ...currentProducts.filter((product) => product.id !== payload.new.id)];
            }

            if (payload.eventType === 'UPDATE') {
              return currentProducts.map((product) =>
                product.id === payload.new.id ? payload.new : product
              );
            }

            if (payload.eventType === 'DELETE') {
              return currentProducts.filter((product) => product.id !== payload.old.id);
            }

            return currentProducts;
          });
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const addProduct = async (newProduct) => {
    if (!isSupabaseConfigured) {
      toast.error('Supabase is not configured. Product publishing is disabled.');
      return { success: false, error: { message: 'Supabase not configured' } };
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .insert([newProduct])
        .select();

      if (error) throw error;
      setProducts(prev => [data[0], ...prev]);
      toast.success('Masterpiece Published');
      return { success: true };
    } catch (error) {
      // Helps identify if columns like 'color' are missing
      alert("Database Error: " + error.message);
      return { success: false, error };
    }
  };

  const updateProduct = async (id, updatedFields) => {
    if (!isSupabaseConfigured) {
      toast.error('Supabase is not configured. Product updates are disabled.');
      return { success: false, error: { message: 'Supabase not configured' } };
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .update(updatedFields)
        .eq('id', id)
        .select();

      if (error) throw error;
      setProducts(prev => prev.map(p => p.id === id ? data[0] : p));
      toast.success('Inventory Updated');
      return { success: true };
    } catch (error) {
      toast.error('Update failed');
      return { success: false };
    }
  };

  const deleteProduct = async (id) => {
    if (!isSupabaseConfigured) {
      toast.error('Supabase is not configured. Delete is disabled.');
      return;
    }

    if (!window.confirm("Delete this masterpiece?")) return;
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success('Product removed');
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  return (
    <ProductContext.Provider value={{ products, loading, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);