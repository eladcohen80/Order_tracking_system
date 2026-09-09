const deployedApiUrl = 'https://labordersserver.vercel.app';

export const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, '') ||
  (import.meta.env.DEV ? 'http://localhost:3000' : deployedApiUrl);