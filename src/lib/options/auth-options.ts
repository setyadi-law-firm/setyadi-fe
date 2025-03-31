import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

interface User {
  id: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  email_verified: boolean;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      accessToken: string;
      refreshToken: string;
      email_verified: boolean;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        uid: { label: "ID Token", type: "text" },
        email: { label: "Email", type: "text" },
        accessToken: { label: "Access Token", type: "text" },
        refreshToken: { label: "Refresh Token", type: "text" },
        tokenExpires: { label: "Token Expires", type: "text" },
        email_verified: { label: "Email Verified", type: "text" },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.uid) return null;

        try {
          return {
            id: credentials.uid,
            email: credentials.email,
            accessToken: credentials.accessToken,
            refreshToken: credentials.refreshToken,
            tokenExpires: new Date(credentials.tokenExpires).getTime(),
            email_verified: credentials.email_verified,
          };
        } catch (error) {
          console.error("Credential token verification failed:", error);
          return null;
        }
      },
    }),

    CredentialsProvider({
      id: "firebase",
      name: "Firebase",
      credentials: {
        uid: { label: "ID Token", type: "text" },
        email: { label: "Email", type: "text" },
        accessToken: { label: "Access Token", type: "text" },
        refreshToken: { label: "Refresh Token", type: "text" },
        tokenExpires: { label: "Token Expires", type: "text" },
        email_verified: { label: "Email Verified", type: "text" },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.uid) return null;

        try {
          return {
            id: credentials.uid,
            email: credentials.email,
            accessToken: credentials.accessToken,
            refreshToken: credentials.refreshToken,
            tokenExpires: new Date(credentials.tokenExpires).getTime(),
            email_verified: credentials.email_verified,
          };
        } catch (error) {
          console.error("Firebase token verification failed:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email ?? "";
        if ("accessToken" in user && user.accessToken) {
          token.accessToken = user.accessToken;
        }
        if ("refreshToken" in user && user.refreshToken) {
          token.refreshToken = user.refreshToken;
        }
        if ("tokenExpires" in user && user.tokenExpires) {
          token.tokenExpires = user.tokenExpires;
        }
        if ("email_verified" in user && user.email_verified) {
          token.email_verified = user.email_verified;
        }
      }

      if (token.refreshToken) {
        try {
          const refreshedToken = await refreshAccessToken(token);
          refreshedToken.email_verified = token.email_verified;
          return refreshedToken;
        } catch (error) {
          console.error("Error refreshing token on request:", error);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        if (token.error === "RefreshAccessTokenError") {
          return { ...session, error: "RefreshAccessTokenError" };
        }

        session.user = {
          id: token.id as string,
          email: token.email as string,
          accessToken: token.accessToken as string,
          refreshToken: token.refreshToken as string,
          email_verified: token.email_verified as boolean,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export async function refreshAccessToken(token: any) {
  try {
    if (!token.refreshToken) {
      throw new Error("No refresh token available");
    }

    const apiKey = process.env.FIREBASE_API_KEY;
    if (!apiKey) {
      throw new Error("Firebase API key is missing");
    }

    const url = `https://securetoken.googleapis.com/v1/token?key=${apiKey}`;
    const response = await axios.post(
      url,
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const refreshedTokens = response.data;

    if (!refreshedTokens || !refreshedTokens.id_token) {
      throw new Error("Failed to refresh access token");
    }

    return {
      ...token,
      accessToken: refreshedTokens.id_token,
      refreshToken: refreshedTokens.refresh_token || token.refreshToken,
      tokenExpires: Date.now() + Number(refreshedTokens.expires_in) * 1000,
      email_verified: refreshedTokens.email_verified,
    };
  } catch (error) {
    console.error("Error refreshing token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NextAuth(authOptions);
