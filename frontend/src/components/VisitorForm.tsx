"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { CreateVisitorPayload } from "@/types/visitor";
import { apiClient } from "@/lib/apiClient";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { User, Mail, Phone, Building2, ClipboardList } from "lucide-react";

interface VisitorFormProps {
  onSuccess: () => void;
}
interface Department {
  id: string;
  name: string;
}

export default function VisitorForm({
  onSuccess,
}: VisitorFormProps) {
  const router = useRouter();

  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
   const [departments, setDepartments] = useState<Department[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateVisitorPayload>();

  useEffect(() => {
  async function fetchDepartments() {
    try {
      const response = await apiClient.get("/departments");
      setDepartments(response);
    } catch (error) {
      console.error("Failed to load departments:", error);
    }
  }
  fetchDepartments();
}, []);

  useEffect(() => {
    if (success) {
      router.push("/register/success");
    }
  }, [success, router]);

  async function onSubmit(data: CreateVisitorPayload) {
    try {
      await apiClient.post("/visitors", {
        ...data,
        status: "PENDING",
      });

      reset();

      setSuccess("Visitor registered successfully!");

      setErrorMessage("");

      onSuccess();
    } catch (error) {
      console.error(error);

      setSuccess("");

      setErrorMessage(
        "Failed to register visitor. Please try again."
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="w-full max-w-7xl bg-white rounded-[32px] shadow-2xl overflow-hidden">

        <div className="grid md:grid-cols-2">

          <div className="relative overflow-hidden bg-white text-gray-900 p-14 flex flex-col justify-center">

            <div className="absolute -top-28 right-0 w-72 h-72 bg-violet-300 rounded-bl-full"></div>

            <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-300 rounded-tr-full"></div>

            <div className="absolute top-20 left-16 w-24 h-24 bg-pink-200 rounded-full"></div>

            <div className="relative z-10">

              <h1 className="text-2xl font-bold mb-10">
                COSEKE VMS
              </h1>

              <h2 className="text-5xl font-bold leading-tight mb-6">
                Welcome
                <br />
                Visitor!
              </h2>

              <p className="text-gray-600 leading-8 text-lg max-w-md">
                Register your visit quickly and securely.

                Fill in your details and proceed to the reception
                desk for approval.
              </p>

              <div className="mt-12 space-y-4">

                <p>✔ Secure Registration</p>

                <p>✔ Quick Check-In</p>

                <p>✔ Real-Time Visitor Tracking</p>
              </div>
            </div>
          </div>

          <div className="p-16 flex flex-col justify-center">

            <h2 className="text-3xl font-bold text-center">
              Visitor Registration
            </h2>

            <p className="text-center text-gray-500 mt-2 mb-8">
              Kindly fill in your details.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div>

                <Label htmlFor="fullName" className="mb-2 block">
                  Full Name
                </Label>

                <div className="relative">

                  <User className="absolute left-4 top-4 h-5 w-5 text-gray-400" />

                  <Input
                    id="fullName"
                    placeholder="Enter full name"
                    className="h-14 rounded-full pl-12"
                    {...register("fullName", {
                      required: "Full name is required",

                      validate: (value)=> {
                        const names = value
                        .trim()
                        .split(/\s+/);
                        return(
                          names.length >= 2 ||
                          "Please enter at least two names"
                        );
                      },
                    })}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">

  <div>
    <Label htmlFor="email" className="mb-2 block">
      Email Address
    </Label>

    <div className="relative">
      <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400"/>
   
    <Input
      id="email"
      type="email"
      placeholder="john@gmail.com"
      className="h-14 rounded-full pl-12"
      {...register("email", {
        required: "Email is required",
      })}
    />
  </div>
  </div>

  <div>
    <Label htmlFor="phoneNumber" className="mb-2 block">
      Phone Number
    </Label>

<div className="relative">
  <Phone className="absolute left-4 top-4 h-5 w-5 text-gray-400" />

    <Input
      id="phoneNumber"
      placeholder="0712345678"
      className="h-14 rounded-full pl-12"
      {...register("phoneNumber", {
        required: "Phone number is required",
      })}
    />
    </div>
  </div>
</div>

<div>
  <Label htmlFor="departmentId" className="mb-2 block">
    Department
  </Label>

<div className="relative">
  <Building2 className="absolute left-4 top-4 h-5 w-5 text-gray-400 z-10" />

  <select
    id="departmentId"
    className="w-full h-14 rounded-full border border-gray-300 bg-white pl-12 pr-5"
    {...register("departmentId", {
      required: "Department is required",
    })}
  >
    <option value="">Select Department</option>

    {departments.map((department) => (
      <option
        key={department.id}
        value={department.id}
      >
        {department.name}
      </option>
    ))}
  </select>
   {errors.departmentId && (
    <p className="text-red-500 text-sm mt-2">
      {errors.departmentId.message}
    </p>
  )}
</div>
</div>

              <div>
                <Label htmlFor="purpose" className="mb-2 block">
                  Purpose of Visit
                </Label>

                <div className="relative">

                  <ClipboardList className="absolute left-4 top-4 h-5 w-5 text-gray-400" />

                  <Input
                    id="purpose"
                    placeholder="Interview, Meeting..."
                    className="h-14 rounded-full pl-12"
                    {...register("purpose", {
                      required: "Purpose is required",
                    })}
                  />

                </div>

                {errors.purpose && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.purpose.message}
                  </p>
                )}

              </div>

              {success && (
                <p className="text-green-600 text-center">
                  {success}
                </p>
              )}

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
                {isSubmitting
                  ? "Registering..."
                  : "Register Visitor"}
                  </Button>

                  <div className="mt-2 text-center">
  <Link href="/login">
    <Button
      variant="outline"
      className="w-full rounded-full border-violet-300 text-violet-700 hover:bg-violet-50 hover:border-violet-500"
    >
      ← Staff Login
    </Button>
  </Link>
</div>

      
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}