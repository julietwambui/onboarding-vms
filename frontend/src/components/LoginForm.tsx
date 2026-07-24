"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { apiClient } from "@/lib/apiClient";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Mail, Lock } from "lucide-react";

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
      const response = (await apiClient.post(
        "/auth/login",
        data
      )) as LoginResponse;

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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="w-full max-w-6xl bg-white rounded-[32px] shadow-2xl overflow-hidden">

        <div className="grid md:grid-cols-2">

          {/* LEFT PANEL */}

          <div className="relative bg-white p-12 overflow-hidden">

            {/* Decorative Shapes */}

            <div className="absolute -top-28 right-0 w-72 h-72 bg-violet-300 rounded-bl-full"></div>

            <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-300 rounded-tr-full"></div>

            <div className="absolute top-20 left-20 w-24 h-24 rounded-full bg-pink-200"></div>

            <div className="relative z-10">

              <h1 className="text-2xl font-bold text-gray-800 mb-12">
                COSEKE VMS
              </h1>

              <h2 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
                Welcome
                <br />
                Back
              </h2>

              <p className="text-gray-600 text-lg leading-8">
                Sign in to access the reception dashboard and manage visitor registrations securely.
              </p>

              <div className="mt-12 space-y-4 text-gray-700">

                <p>✔ Secure Authentication</p>

                <p>✔ Visitor Monitoring</p>

                <p>✔ Reception Dashboard</p>

              </div>

            </div>

          </div>

          {/* RIGHT PANEL */}

          <div className="flex items-center justify-center bg-gray-50 p-12">

            <div className="w-full max-w-md">

              <h2 className="text-3xl font-bold text-center text-gray-800">
                Administrator Login
              </h2>

              <p className="text-center text-gray-500 mt-2 mb-8">
                Sign in to continue.
              </p>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >

                <div>

                  <Label className="mb-2 block">
                    Email Address
                  </Label>

                  <div className="relative">

                    <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400" />

                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="h-14 rounded-full pl-12"
                      {...register("email", {
                        required: "Email is required",
                      })}
                    />

                  </div>

                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.email.message}
                    </p>
                  )}

                </div>

                <div>

                  <Label className="mb-2 block">
                    Password
                  </Label>

                  <div className="relative">

                    <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />

                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      className="h-14 rounded-full pl-12"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />

                  </div>

                  {errors.password && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.password.message}
                    </p>
                  )}

                </div>

                {errorMessage && (
                  <p className="text-red-600 text-center">
                    {errorMessage}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 rounded-full bg-violet-600 hover:bg-violet-700 text-lg font-semibold"
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}