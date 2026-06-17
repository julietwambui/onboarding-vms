// VisitorForm Component — Sprint 2
"use client";
import {useState} from "react";
import { useForm } from "react-hook-form";
import { CreateVisitorPayload } from "@/types/visitor";
import { apiClient } from "@/lib/apiClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface VisitorFormProps {
  onSuccess: () => void;
}

export default function VisitorForm({ onSuccess }: VisitorFormProps) {
  const [success,setSuccess]=useState("")
  const [errorMessage,setErrorMessage]=useState("")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateVisitorPayload>();

  async function onSubmit(data: CreateVisitorPayload) {
    try{
      await apiClient.post("/visitors",data);

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      <div>
        <label>Full Name</label>
        <input
        {...register("fullName", {
          required: "Full name is required"})}
        type="text"
        placeholder="Enter full name"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm">
            {errors.fullName.message}
            </p>
            )}
        </div>
    
      <div>
        <label>Purpose of Visit</label>
        <input
        {...register("purpose", {required:"Purpose is required"})}
        type="text"
        placeholder="Enter purpose"
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

      <button type="submit" disabled={isSubmitting}>
      {isSubmitting ? "Registering..." : "Register Visitor"}
      </button>
      </form>     
  );
  }

