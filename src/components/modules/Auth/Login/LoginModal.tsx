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
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function LoginModal() {
  const { data: session } = useSession();

  const client = useSetyadiClient();

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-2 text-center">
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
                <Input
                  {...field}
                  type="email"
                  placeholder="Email"
                  className="w-full"
                  autoComplete="email"
                  autoFocus
                />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <Input
                  {...field}
                  type="password"
                  placeholder="*******"
                  className="w-full"
                  autoComplete="current-password"
                />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button
              type="submit"
              variant="default"
              onClick={async (e) => {
                e.preventDefault();
                const { email, password } = loginForm.getValues();
                await signIn("credentials", {
                  email,
                  password,
                  redirect: false,
                });
              }}
            >
              Sign In
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}
