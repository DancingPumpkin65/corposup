import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Category {
  id: number;
  category_name: string;
  category_parent_id: null;
  children: {
    id: number;
    category_name: string;
    category_parent_id: number;
  };
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    axios.get('http://127.0.0.1:8000/api/categories')
      .then(res => {
        if (!cancelled) {
          setCategories(Array.isArray(res.data) ? res.data : []);
          setLoading(false);
        }
      });
      
    return () => { cancelled = true; };
  }, []);
  return { categories, loading };
};