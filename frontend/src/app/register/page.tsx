// Visitor Registration Form — Sprint 2
//
// This page lets a visitor (or receptionist) pre-register before arrival.
// It should:
//   1. Show a form with two fields: Full Name and Purpose of Visit
//   2. Validate that both fields are filled in before submitting
//   3. On submit: POST to /visitors via apiClient with { fullName, purpose }
//   4. Show a success message after a successful registration
//   5. Show an error message if the request fails
//
// Hint: Use React Hook Form for form state and validation.
// Hint: Use the "use client" directive — forms require client-side interaction.

"use client";

import { useForm } from "react-hook-form";
import { CreateVisitorPayload } from "@/types/visitor";
import { apiClient } from "@/lib/apiClient";
import Link from "next/link";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateVisitorPayload>();

  async function onSubmit(data: CreateVisitorPayload) {
    // TODO: Call apiClient.post("/visitors", data)
    // On success: show a success message and reset the form
    // On failure: show an error message
  }

  return (
    <main>
      <h1>Visitor Registration</h1>
      <p>Please fill in your details below.</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* TODO: Full Name input */}
        {/* Use register("fullName", { required: "Full name is required" }) */}
        {/* Display errors.fullName?.message if there is an error */}

        {/* TODO: Purpose of Visit input */}
        {/* Use register("purpose", { required: "Purpose is required" }) */}
        {/* Display errors.purpose?.message if there is an error */}

        {/* TODO: Submit button — disable it while isSubmitting is true */}

        {/* TODO: Show a success message after successful registration */}
        {/* TODO: Show an error message if the API call fails */}
      </form>

      <Link href="/">← Back to Dashboard</Link>
    </main>
  );
}
