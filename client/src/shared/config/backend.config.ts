const isDevMode = process.env.NODE_ENV !== 'production';
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
export const AUTH_BASE_URL = isDevMode ? process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000' : '/api';
