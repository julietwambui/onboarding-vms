//Visitor Registration Form — Sprint 2
"use client";

import Link from "next/link";
import {useRouter} from"next/navigation";
import VisitorForm from "@/components/VisitorForm";

export default function RegisterPage() {
  const router=useRouter();

  function handleSuccess() {
    console.log("Visitor registered successfully");
    router.push("/");
  }

  return (
    <main className="min-h-screen flex items-center
    justify-center p-4">
      <div className="w-full max-w-2xl">
      <VisitorForm onSuccess={handleSuccess} />
      </div>

      <Link
       href="/"
       className="mt-4 text-sm text-black-600 hover:underline"
       >← Back to Dashboard
        </Link>
    </main>
  );
}

  
    
  
   