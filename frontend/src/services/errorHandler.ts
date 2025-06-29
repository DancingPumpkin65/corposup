import axios from 'axios';

export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message;
  }
  return 'An unexpected error occurred';
};

export const logError = (error: unknown, context?: string) => {
  console.error(`Error ${context ? `in ${context}` : ''}:`, error);
};
