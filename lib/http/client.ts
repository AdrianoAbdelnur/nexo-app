import axios from 'axios';

import { readAuthToken } from '@/lib/auth-storage';

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

const ClientAxios = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

ClientAxios.interceptors.request.use(async (config) => {
  const hasAuthorization = Boolean(config.headers?.Authorization || config.headers?.authorization);
  if (hasAuthorization) {
    return config;
  }

  const token = await readAuthToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default ClientAxios;
