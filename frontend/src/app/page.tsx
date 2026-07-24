import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserRound, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="w-full max-w-7xl bg-white rounded-[32px] shadow-2xl overflow-hidden">

        <div className="grid md:grid-cols-2">

          {/* LEFT PANEL */}

          <div className="relative bg-white p-12 overflow-hidden">

            {/* Decorative Shapes */}

            <div className="absolute -top-28 right-0 w-72 h-72 bg-violet-400 rounded-bl-full"></div>

            <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-300 rounded-tr-full"></div>

            <div className="absolute top-24 left-20 w-24 h-24 rounded-full bg-pink-200"></div>

            <div className="relative z-10">

              <h1 className="text-2xl font-bold text-gray-800 mb-12">
                COSEKE VMS
              </h1>

              <h2 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
                Welcome to
                <br />
                Visitor Management
              </h2>

              <p className="text-gray-600 text-lg leading-8 max-w-md">
                Secure visitor registration, efficient reception
                management and real-time visitor tracking in one
                simple platform.
              </p>

              <div className="mt-12 space-y-4 text-gray-700">

                <p>✔ Easy Visitor Registration</p>

                <p>✔ Secure Access Control</p>

                <p>✔ Real-Time Visitor Monitoring</p>

              </div>

            </div>

          </div>

          {/* RIGHT PANEL */}

          <div className="flex flex-col justify-center items-center p-12 bg-gray-50">

            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Get Started
            </h2>

            <p className="text-gray-500 mb-10 text-center">
              Choose how you would like to continue.
            </p>

            <div className="w-full max-w-sm space-y-6">

              {/* Visitor Button */}

              <Button
                asChild
                className="w-full h-16 rounded-full bg-violet-600 hover:bg-violet-700 text-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                <Link
                  href="/register"
                  className="flex items-center justify-center gap-3"
                >
                  <UserRound size={22} />
                  I'm a Visitor
                </Link>
              </Button>

              {/* Admin Button */}

              <Button
                asChild
                variant="outline"
                className="w-full h-16 rounded-full border-2 border-violet-600 text-violet-600 hover:bg-violet-50 text-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-3"
                >
                  <ShieldCheck size={22} />
                  Administrator
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}