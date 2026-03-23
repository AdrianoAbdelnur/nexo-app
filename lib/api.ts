import axios, { type Method } from 'axios';

import ClientAxios from '@/lib/http/client';

export type ApiResult<T> = {
  ok: boolean;
  message?: string;
  item?: T;
  items?: T[];
};

type RequestOptions = {
  method?: Method;
  body?: unknown;
  token?: string | null;
};

type ApiResponseMeta = {
  ok: boolean;
  status: number;
};

export async function apiRequest<T>(path: string, options: RequestOptions = {}) {
  try {
    const response = await ClientAxios.request<ApiResult<T>>({
      url: path,
      method: options.method || 'GET',
      data: options.body,
      headers: options.token ? { Authorization: `Bearer ${options.token}` } : undefined,
    });

    return {
      response: {
        ok: response.status >= 200 && response.status < 300,
        status: response.status,
      } satisfies ApiResponseMeta,
      data: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const data = (error.response?.data as ApiResult<T> | undefined) ?? {
        ok: false,
        message: error.message,
      };

      return {
        response: {
          ok: false,
          status,
        } satisfies ApiResponseMeta,
        data,
      };
    }

    return {
      response: {
        ok: false,
        status: 500,
      } satisfies ApiResponseMeta,
      data: {
        ok: false,
        message: 'Unexpected request error',
      } satisfies ApiResult<T>,
    };
  }
}
