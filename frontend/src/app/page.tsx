import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-500 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Visitor Management System
        </h1>

        <p className="text-slate-600 mb-8">
          Welcome! Please choose how you would like to continue.
        </p>

        <div className="space-y-4">
          <Link href="/register">
            <Button className="w-full">
              Register as Visitor
            </Button>
          </Link>

          <Link href="/login">
            <Button variant="outline" className="w-full">
              Admin Login
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}