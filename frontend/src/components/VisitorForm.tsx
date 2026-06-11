// VisitorForm Component — Sprint 2
//
// 👤 Frontend Intern Task
//
// A reusable form component for registering a new visitor.
// This component is responsible ONLY for the form UI and submission.
// It should NOT know about routing or page layout.
//
// Props:
//   onSuccess — called by the parent page after a visitor is successfully registered

"use client";

import { useForm } from "react-hook-form";
import { CreateVisitorPayload } from "@/types/visitor";
import { apiClient } from "@/lib/apiClient";

interface VisitorFormProps {
  onSuccess: () => void;
}

export default function VisitorForm({ onSuccess }: VisitorFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateVisitorPayload>();

  async function onSubmit(data: CreateVisitorPayload) {
    // TODO: Call apiClient.post("/visitors", data)
    // On success: call reset() to clear the form, then call onSuccess()
    // On failure: show an error message to the user
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* TODO: Full Name input field */}
      {/* Hint: {...register("fullName", { required: "Full name is required" })} */}
      {/* Show errors.fullName?.message beneath the input */}

      {/* TODO: Purpose of Visit input field */}
      {/* Hint: {...register("purpose", { required: "Purpose is required" })} */}
      {/* Show errors.purpose?.message beneath the input */}

      {/* TODO: Submit button — disable while isSubmitting is true */}

      {/* TODO: Show a success message after successful submission */}
      {/* TODO: Show an error message if the API call fails */}
    </form>
  );
}
