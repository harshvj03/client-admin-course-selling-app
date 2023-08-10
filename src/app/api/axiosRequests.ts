import axios, { AxiosResponse } from "axios";

function getApiUrl(): string {
  let apiUrl = window.location.href;
  if (apiUrl.toLowerCase().includes("//dev")) return "dev";
  else if (apiUrl.toLowerCase().includes("//stage")) return "stage";
  else if (apiUrl.toLowerCase().includes("//prod")) return "prod";
  else return "localhost";
}

const baseURL =
  getApiUrl().toLowerCase() === "localhost"
    ? "https://localhost:7232/api"
    : `https://${getApiUrl().toLowerCase()}2-api.frontdoorcorp.co/api`;

axios.defaults.baseURL = baseURL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

export const axiosRequests = {
  get: <T>(url: string) => axiosPrivate.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axiosPrivate.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) =>
    axiosPrivate.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axiosPrivate.delete<T>(url).then(responseBody),
};

export const axiosPrivate = axios.create({
//   withCredentials: true,
});

