import { NextAuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ENDPOINTS } from "@/components/core/environments/endpoints.environment";
import { setyadiClient } from "../clients/setyadi-client";

// Extend the built-in User type with our additional properties
declare module "next-auth" {
  interface User {
    accessToken?: string;
    refreshToken?: string;
    message?: string;
  }

  interface Session {
    user: {
      accessToken?: string;
      refreshToken?: string;
      email?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    email?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const response = await setyadiClient.post(ENDPOINTS.LOGIN, {
            email: credentials.email,
            password: credentials.password,
          });

          const data = response.data;

          if (!data?.accessToken) {
            throw new Error("Invalid credentials");
          }

          // Return user object based on backend response
          return {
            // Use email as ID if no specific user ID is provided
            id: credentials.email,
            email: credentials.email,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            // Add other properties you might need
            message: data.message,
          };
        } catch (error: any) {
          console.error("Error during authentication:", error);
          if (error.response) {
            throw new Error(
              error.response.data.message ?? "Authentication failed"
            );
          }
          throw new Error("Authentication failed. Please try again.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.email = user.email ?? undefined;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.accessToken = token.accessToken as string;
        session.user.refreshToken = token.refreshToken as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    signIn: `${ENDPOINTS.LOGIN}`
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
};
