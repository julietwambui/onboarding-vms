"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RegistrationSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden">
        <div className="relative p-12 text-center overflow-hidden">

          <div className="absolute -top-28 right-0 w-72 h-72 bg-violet-300 rounded-bl-full opacity-40" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-300 rounded-tr-full opacity-40" />

          <div className="relative z-10">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Registration Successful
            </h1>

            <p className="text-gray-600 text-lg leading-8 mb-10">
              Your visit has been registered successfully.
              <br />
              Please proceed to the reception desk for check-in.
            </p>

            <Button
              onClick={() => router.push("/register")}
              className="w-full h-14 rounded-full bg-violet-600 hover:bg-violet-700 text-lg font-semibold"
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}