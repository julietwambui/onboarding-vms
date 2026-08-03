"use client";

import Link from "next/link";
import {useRouter} from"next/navigation";
import VisitorForm from "@/components/VisitorForm";

export default function RegisterPage() {
  const router=useRouter();

  function handleSuccess() {
    console.log("Visitor registered successfully");
    router.push("/reception");
  }

  return (
    <main className="min-h-screen flex items-center
    justify-center p-4">
      <div className="w-full max-w-7xl">
      <VisitorForm onSuccess={handleSuccess} />
      </div>
    </main>
  );
}

  
    
  
   