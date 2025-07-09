import { useState, useEffect } from 'react';

interface Category {
  id: number;
  name: string;
  subcategories?: { id: number; name: string }[];
}

interface ApiCategory {
  id: number;
  category_name: string;
  category_parent_id: number | null;
  created_at: string;
  updated_at: string;
  children?: ApiCategory[];
}

// Global cache to prevent multiple requests
let categoriesCache: Category[] | null = null;
let categoriesPromise: Promise<Category[]> | null = null;

const fetchCategoriesFromAPI = async (): Promise<Category[]> => {
  if (categoriesCache) {
    return categoriesCache;
  }

  if (categoriesPromise) {
    return categoriesPromise;
  }

  categoriesPromise = (async () => {
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
              ? parent.children.map(child => ({
                  id: child.id,
                  name: child.category_name,
                }))
              : undefined,
          }));
        
        categoriesCache = parentCategories;
        return parentCategories;
      }
      return [];
    } finally {
      categoriesPromise = null;
    }
  })();

  return categoriesPromise;
};

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>(categoriesCache || []);
  const [loading, setLoading] = useState(!categoriesCache);

  useEffect(() => {
    if (categoriesCache) {
      setCategories(categoriesCache);
      setLoading(false);
      return;
    }

    fetchCategoriesFromAPI().then(fetchedCategories => {
      setCategories(fetchedCategories);
      setLoading(false);
    });
  }, []);

  return { categories, loading };
};
