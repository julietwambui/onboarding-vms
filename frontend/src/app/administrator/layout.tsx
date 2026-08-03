
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  BarChart3,
  Users,
  LogOut,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  const router = useRouter();

  const [activePage, setActivePage] =
    useState("overview");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  }

  const navItems = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
      href: "/administrator",
    },
    {
      id: "visitors",
      label: "Visitors",
      icon: Users,
      href: "/administrator/visitors",
    },
    {
      id: "departments",
      label: "Departments",
      icon: Building2,
      href: "/administrator/departments",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      href: "/administrator/analytics",
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}

      <aside className="relative w-72 bg-white shadow-xl flex flex-col overflow-hidden">

        {/* Decorative Shapes */}

        <div className="absolute -top-24 -right-24 w-64 h-64 bg-violet-400 rounded-full opacity-30" />

        <div className="absolute bottom-0 -left-28 w-72 h-72 bg-pink-400 rounded-full opacity-30" />

        <div className="absolute top-1/2 right-6 w-14 h-14 bg-violet-400 rounded-full opacity-40" />

        {/* Logo */}

        <div className="relative z-10 p-8 border-b">

          <h1 className="text-3xl font-extrabold text-violet-700 tracking-wide">
            COSEKE VMS
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Visitor Management System
          </p>

        </div>

        {/* Navigation */}

        <nav className="relative z-10 flex-1 px-5 py-8 space-y-3">

          {navItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              activePage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  router.push(item.href);
                }}
                className={`w-full flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-violet-50 hover:text-violet-700 hover:translate-x-1"
                }`}
              >
                <Icon className="w-5 h-5" />

                {item.label}
              </button>
            );
          })}

        </nav>

        {/* Logout */}

        <div className="relative z-10 p-5 mt-4 border-t">

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-5 py-3 
            rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600
            text-white font-semibold shadow-md transition-all duration-300
            hover:shadow-lg hover:scale-[1.02] hover:from-violet-700 hover:to-fuchsia-700
            active:scale-95"
          >
            <LogOut className="w-5 h-5" />

            Logout
          </button>
        </div>

      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}

