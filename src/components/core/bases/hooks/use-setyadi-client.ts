"use client";

import { setyadiClient, refreshAccessToken } from "@/lib";
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
          
          try {
            // Attempt to refresh the token
            const newToken = await refreshAccessToken(session?.user.refreshToken);
            
            // Update session with new token
            if (newToken) {
              await update({
                ...session,
                user: {
                  ...session?.user,
                  accessToken: newToken,
                }
              });
              
              // Update the current request headers with new token
              prevRequest.headers["Authorization"] = `Bearer ${newToken}`;
              
              // Retry the original request with new token
              return setyadiClient(prevRequest);
            }
          } catch (refreshError) {
            console.error("Failed to refresh token:", refreshError);
            // If refresh fails, we reject with the original error
          }
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
