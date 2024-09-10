import axios, { AxiosRequestConfig, Method } from "axios";

export interface HttpRequestParams {
  url: string;
  method: Method;
  body?: Record<string, unknown>;
  queryParams?: Record<string, unknown>;
  headers?: { [key: string]: string };
}

export interface HttpResponse<T> {
  status: number;
  data: T;
}

export async function serverConnection<T>({
  url,
  method,
  body,
  queryParams,
  headers = { "Content-Type": "application/json" },
}: HttpRequestParams): Promise<HttpResponse<T>> {
  const config: AxiosRequestConfig = {
    url,
    method,
    headers,
    params: queryParams,
    data: body ? body : undefined,
  };

  try {
    const response = await axios.request<T>(config);

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
