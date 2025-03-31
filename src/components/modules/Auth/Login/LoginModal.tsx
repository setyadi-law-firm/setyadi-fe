"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useForm, SubmitHandler, Control } from "react-hook-form";

import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { signIn, useSession } from "next-auth/react";
import { useSetyadiClient } from "@/components/core/bases/hooks/use-setyadi-client";
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

export function LoginModal() {
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
        router.refresh();
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-2">
      <DialogTitle className="text-2xl font-semibold text-[#393938]">
        Sign in as Admin
      </DialogTitle>
      <DialogHeader className="text-[#393938]">
        Sign in to Manage as an Admin
      </DialogHeader>
      <Form {...loginForm}>
        <form className="flex flex-col items-center justify-center w-full gap-6 mt-7">
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
          <DialogFooter>
            <Button
              type="button"
              variant="default"
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
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}
