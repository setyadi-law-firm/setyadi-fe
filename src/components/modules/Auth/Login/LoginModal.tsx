"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Assets } from "@/components/core";

export function LoginPageModule() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLogin = async (data: z.infer<typeof loginSchema>) => {
    try {
      setIsLoading(true);
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error);
        return;
      }
      if (result?.ok) {
        toast.success("Login successful");
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <Image
            src={Assets.logo}
            alt="Logo"
            width={120}
            height={120}
            className="mb-4"
          />
          <h2 className="text-2xl font-bold text-[#393938] text-center">
            Sign in as Admin
          </h2>
          <p className="mt-2 text-sm text-gray-600 text-center">
            Sign in to Manage as an Admin
          </p>
        </div>

        <Form {...loginForm}>
          <form className="flex flex-col w-full gap-6 mt-7">
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Email"
                      className="w-full"
                      autoComplete="email"
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="*******"
                      className="w-full"
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button
                type="button"
                variant="default"
                className="w-full"
                disabled={isLoading}
                onClick={() => {
                  loginForm.handleSubmit(
                    (data) => {
                      onLogin(data);
                    },
                    (errors) => {
                      toast.error(
                        "Please fix validation errors before proceeding"
                      );
                      console.error("Form validation errors:", errors);
                    }
                  )();
                }}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
