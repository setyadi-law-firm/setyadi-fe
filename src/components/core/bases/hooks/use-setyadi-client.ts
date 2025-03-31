"use client";

import { setyadiClient } from "@/lib";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const useSetyadiClient = () => {
  const { data: session, update } = useSession();

  useEffect(() => {
    const requestInterceptors = setyadiClient.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"] && session?.user.accessToken) {
          config.headers[
            "Authorization"
          ] = `Bearer ${session.user.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptors = setyadiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;

          console.error("Failed to refresh token:");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      setyadiClient.interceptors.request.eject(requestInterceptors);
      setyadiClient.interceptors.response.eject(responseInterceptors);
    };
  }, [session, update]);

  return setyadiClient;
};
