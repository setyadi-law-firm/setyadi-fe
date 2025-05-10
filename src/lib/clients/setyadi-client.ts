import axios from "axios";

export const setyadiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/setyadi-api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const refreshAccessToken = async (refreshToken: string | undefined) => {
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }
  
  try {
    const response = await setyadiClient.post("/auth/refresh", {
      refreshToken,
    });
    
    // Return the access token from the response
    return response.data.accessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw error;
  }
};
