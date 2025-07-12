import { useState, useEffect } from 'react';
import axios from 'axios';
import { type Product } from '@/components/ProductsPage/types';

export const useProductss = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/categories/44/products');
        console.log('Fetched products:', res.data);
        setProducts(res.data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading };
};
