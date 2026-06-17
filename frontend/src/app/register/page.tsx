// Visitor Registration Form — Sprint 2
"use client";
import Link from "next/link";
import VisitorForm from "@/components/VisitorForm";

export default function RegisterForm() {
  function handleSuccess() {
    console.log("Visitor registered successfully");
  }

  return (
    <main className="max-w-xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">
        Visitor Registration 
      </h1>
      <p>Please fill in your details below</p>
      <VisitorForm onSuccess={handleSuccess}/>
      <Link href="/" className="text-blue-600">
      ← Back to Dashboard
      </Link>
    </main>
  );
}

  
    
  
   