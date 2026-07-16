"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { apiClient } from "@/lib/apiClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export default function LoginForm() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  async function onSubmit(data: LoginFormData) {
    try {
      const response = await apiClient.post(
        "/auth/login",
        data
      ) as LoginResponse;

      localStorage.setItem("token", response.token);

      localStorage.setItem(
        "user",
        JSON.stringify(response.user)
      );

      setErrorMessage("");

      router.push("/dashboard");
    } catch (error) {
      console.error(error);

      setErrorMessage("Invalid email or password");
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-500 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Admin Login
          </h1>

          <p className="text-indigo-200">
            Sign in to access the dashboard.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="email">
              Email
            </Label>

            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              className="bg-white text-black"
              {...register("email", {
                required: "Email is required",
              })}
            />

            {errors.email && (
              <p className="text-red-500 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              Password
            </Label>

            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              className="bg-white text-black"
              {...register("password", {
                required: "Password is required",
              })}
            />

            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          {errorMessage && (
            <p className="text-red-600 text-sm">
              {errorMessage}
            </p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-6 rounded-full bg-white text-indigo-600 hover:bg-indigo-50 font-bold transition-all"
          >
            {isSubmitting
              ? "Logging in..."
              : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}