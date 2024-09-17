import axios, { AxiosRequestConfig, Method } from 'axios';

export interface HttpRequestParams {
  suffixUrl: string;
  method: Method;
  body?: Record<string, unknown>;
  queryParams?: Record<string, unknown>;
}

export interface HttpResponse<T> {
  status: number;
  data: T;
}

const api = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
});

export async function serverConnection<T>({
  suffixUrl,
  method,
  body,
  queryParams,
}: HttpRequestParams): Promise<HttpResponse<T>> {
  const config: AxiosRequestConfig = {
    url: suffixUrl,
    method,
    params: queryParams,
    data: body ? body : undefined,
  };

  try {
    const response = await api(config);

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        status: error.response.status,
        data: error.response.data,
      };
    }
    throw error;
  }
}
