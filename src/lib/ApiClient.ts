import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, ApiError.prototype); // Ensure the prototype chain is correct
  }
}

export class Request {
  private api: AxiosInstance;

  constructor(apiBase: string, apiKey: string = "") {
    this.api = this.createAxiosInstance(apiBase, apiKey);
  }

  private createAxiosInstance(apiBase: string, apiKey: string): AxiosInstance {
    return axios.create({
      baseURL: apiBase,
      timeout: 5000,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-api-key": apiKey,
      },
    });
  }

  setApiKey(newApiKey: string) {
    this.api.defaults.headers["x-api-key"] = newApiKey;
  }

  setCustomerToken(newCustomerToken: string) {
    this.api.defaults.headers["Authorization"] = `Bearer ${newCustomerToken}`;
  }

  async get<T>(url: string, params: object = {}): Promise<T> {
    return this.handleRequest(() => this.api.get(url, { params }));
  }

  async post<T>(url: string, data: object): Promise<T> {
    return this.handleRequest(() => this.api.post(url, data));
  }

  async patch<T>(url: string, data: object): Promise<T> {
    return this.handleRequest(() => this.api.patch(url, data));
  }

  async delete<T>(url: string): Promise<T> {
    return this.handleRequest(() => this.api.delete(url));
  }

  private async handleRequest<T>(
    request: () => Promise<AxiosResponse<T>>
  ): Promise<T> {
    try {
      const response = await request();
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "An unknown error occurred";
      const status = error.response?.status || 500;

      throw new ApiError(message, status);
    }
  }
}

const base_url = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;

if (!base_url) {
   console.log("base_url", base_url)
  throw new Error("[ApiClient]: BASE_URL or NEXT_PUBLIC_BASE_URL is missing from environment ");
}

const apiClient = new Request(base_url + "/api");
export const authClient = new Request(base_url + "/api/authentication");
export default apiClient;
