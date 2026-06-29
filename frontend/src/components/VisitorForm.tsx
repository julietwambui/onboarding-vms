"use client";
import {useState ,useEffect} from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CreateVisitorPayload } from "@/types/visitor";
import { apiClient } from "@/lib/apiClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface VisitorFormProps {
  onSuccess: () => void;
}

export default function VisitorForm({ onSuccess }: VisitorFormProps) {
  const [success,setSuccess]=useState("")
  const [errorMessage,setErrorMessage]=useState("")
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateVisitorPayload>();

  useEffect(() => {
    if (success) {
      router.push("/dashboard");
    }
  }, [success, router]);


  async function onSubmit(data: CreateVisitorPayload) {
    try{
      await apiClient.post("/visitors", {
        ...data,
        status:"PENDING",
      });

      reset();
      setSuccess("Visitor registered successfully!");
      setErrorMessage("");

      onSuccess();
    } catch (error){
      console.error("registration failed",error);

      setSuccess("");
      setErrorMessage("Failed to register visitor.Please try again");
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center 
    bg-gradient-to-br from-indigo-600 to-blue-500 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Visitor Registration</h1>
          <p className="text-indigo-200">Please fill in the details below.</p>
        
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
        id="fullName"
        type="text"
        placeholder="Enter full name"
        className="bg-white text-black"
        {...register("fullName", {
          required: "Full name is required"})}
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm">
            {errors.fullName.message}
            </p>
            )}
        </div>
    
      <div className="space-y-2">
        <Label htmlFor="purpose">Purpose of Visit</Label>
        <Input
        id="purpose"
        type="text"
        placeholder="Enter purpose"
        className="bg-white text-black"
        {...register("purpose", {required:"Purpose is required"})}
        />
        {errors.purpose && (
          <p className="text-red-500 text-sm">
            {errors.purpose.message}
            </p>
            )}
      </div>

      {success && (
        <p className="text-green-600 text-sm">
          {success}
        </p>
      )}

      {errorMessage &&(
        <p className="text-red-600 text-sm">
          {errorMessage}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting}
      className="w-full py-6 rounded-full bg-white text-indigo-600 hover:bg-indigo-50
      font-bold transition-all"
      >
      {isSubmitting ? "Registering..." : "Register Visitor"}
      </Button>
      </form>     
     </div>
  </div>
  </div>
  );
  }

