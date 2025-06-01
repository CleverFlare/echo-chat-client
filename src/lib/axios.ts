import { useAuthStore } from "@/store/auth";
import axios, { AxiosError, HttpStatusCode, type AxiosResponse } from "axios";
import { redirect } from "@tanstack/react-router";

export const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("OutSiteJWT");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (
    response: AxiosResponse<unknown, unknown>,
  ): AxiosResponse<unknown, unknown> => {
    return response;
  },
  (error: AxiosError) => {
    const isUnauthenticated =
      error.response?.status === HttpStatusCode.Unauthorized;

    if (isUnauthenticated) {
      localStorage.removeItem("OutSiteJWT");
      useAuthStore.getState().reset();
      throw redirect({ to: "/", reloadDocument: true });
    }

    throw error;
  },
);
