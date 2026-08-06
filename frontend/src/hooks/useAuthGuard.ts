"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function useAuthGuard(allowedRole: string) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      router.push("/login");
      return;
    }

    const parsedUser: User = JSON.parse(storedUser);

    if (parsedUser.role !== allowedRole) {
      router.push("/login");
      return;
    }

    setUser(parsedUser);
    setChecked(true);
  }, [allowedRole, router]);

  return { user, checked };
}