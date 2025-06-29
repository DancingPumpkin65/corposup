import { useState, useEffect } from 'react';

interface Category {
  id: number;
  name: string;
  subcategories?: string[];
}

interface ApiCategory {
  id: number;
  category_name: string;
  category_parent_id: number | null;
  created_at: string;
  updated_at: string;
  children?: ApiCategory[];
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/categories');
        if (response.ok) {
          const data = await response.json();
          const apiCategories: ApiCategory[] = Array.isArray(data) ? data : data.data || [];
          
          const parentCategories = apiCategories
            .filter(cat => cat.category_parent_id === null || cat.category_parent_id === 0)
            .map(parent => ({
              id: parent.id,
              name: parent.category_name,
              subcategories: parent.children 
                ? parent.children.map(child => child.category_name)
                : undefined
            }));
          
          setCategories(parentCategories);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading };
};
