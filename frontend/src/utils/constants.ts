export const API_BASE_URL = 'http://127.0.0.1:8000/api';
export const STORAGE_BASE_URL = 'http://127.0.0.1:8000/storage';

// Helper function to get full image URL
export const getImageUrl = (imagePath?: string, fallback?: string): string => {
  if (!imagePath) return fallback || '';
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // If it's a relative path from storage (like "profiles/filename.png")
  if (imagePath.startsWith('profiles/') || imagePath.startsWith('products/') || imagePath.startsWith('stores/')) {
    return `${STORAGE_BASE_URL}/${imagePath}`;
  }
  
  // Legacy paths or other formats
  return imagePath;
};

export const USER_ROLES = {
  ADMIN: 'admin',
  BUYER: 'buyer',
  SELLER: 'seller'
} as const;

export const ROUTES = {
  HOME: '/',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  ADMIN: '/admin'
} as const;
