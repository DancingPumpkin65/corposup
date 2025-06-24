export const API_BASE_URL = 'http://127.0.0.1:8000/api';

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
