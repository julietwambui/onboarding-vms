"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {Eye, EyeOff }from "lucide-react";

interface ReceptionistFormProps {
  onSubmit: (data: { name: string; email: string; password: string }) => void;
}

export default function ReceptionistForm({ onSubmit }: ReceptionistFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword]= useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await onSubmit({ name: name.trim(), email: email.trim(), password });
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
      setError("Failed to create receptionist");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
      <div>
        <Label className="mb-2 block">Name</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          className="rounded-full h-11"
        />
      </div>

      <div>
        <Label className="mb-2 block">Email</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="rounded-full h-11"
        />
      </div>

      <div>
        <Label className="mb-2 block">Password</Label>
        <div className="relative">
        <Input
          type={showPassword ? "text" :"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Temporary password"
          className="rounded-full h-11"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
    >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
         </button>
       </div>
      </div>

      {error && (
        <p className="text-red-600 text-sm md:col-span-3">{error}</p>
      )}

      <Button
        type="submit"
        disabled={submitting}
        className="md:col-span-3 rounded-full bg-violet-600 hover:bg-violet-700"
      >
        {submitting ? "Creating..." : "Create Receptionist"}
      </Button>
    </form>
  );
}