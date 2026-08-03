"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Clock3,
  BadgeCheck,
  LogOut,
  Search,
} from "lucide-react";

import { Visitor } from "@/types/visitor";
import { apiClient } from "@/lib/apiClient";

import VisitorTable from "@/components/VisitorTable";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
 
  async function fetchVisitors() {
    try {
      const response = await apiClient.get("/visitors");
      setVisitors(response.data ?? response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchVisitors();
  }, []);

  async function handleCheckIn(id: string) {
    await apiClient.put(`/visitors/${id}/checkin`);
    fetchVisitors();
  }

  async function handleCheckOut(id: string) {
    await apiClient.put(`/visitors/${id}/checkout`);
    fetchVisitors();
  }
  
  async function handleEdit(id: string, data: { fullName: string; purpose: string; email:string;
    phoneNumber: string
   }) {
  await apiClient.put(`/visitors/${id}`, data);
  fetchVisitors();
}

async function handleDelete(id: string) {
  await apiClient.delete(`/visitors/${id}`);
  fetchVisitors();
}

  const filteredVisitors = visitors.filter(
    (visitor) =>
      visitor.fullName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      visitor.purpose
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const pending = visitors.filter(
    (v) => v.status === "PENDING"
  ).length;

  const checkedIn = visitors.filter(
    (v) => v.status === "CHECKED_IN"
  ).length;

  const checkedOut = visitors.filter(
    (v) => v.status === "CHECKED_OUT"
  ).length;

  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <div className="flex items-center justify-between mb-10">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Reception Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Welcome back. Manage today's visitors efficiently.
          </p>

        </div>

        <div className="flex gap-3">

          <Link href="/register">

            <Button className="rounded-full bg-violet-600 hover:bg-violet-700 px-6">
              Register Visitor
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

        <Card className="rounded-3xl border-0 shadow-md bg-violet-100">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-violet-700 text-sm font -medium">
                Total Visitors
              </p>

              <h2 className="text-4xl font-bold text-violet-900 mt-2">
                {visitors.length}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-violet-200 flex items-center justify-cente">
            <Users className="text-violet-700 w-7 h-7" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-md bg-yellow-50">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-yellow-700 text-sm font-medium">
                Pending
              </p>

              <h2 className="text-4xl font-bold text-yellow-900 mt-2">
                {pending}
              </h2>
            </div>
           <div className="w-14 h-14 rounded-2xl bg-yellow-200 flex items-center justify-center">
            <Clock3 className="text-yellow-500 w-10 h-10" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-md bg-green-50">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-green-700 text-sm font-medium">
                Checked In
              </p>

              <h2 className="text-4xl font-bold text-green-900 mt-2">
                {checkedIn}
              </h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-green-200 flex items-center justify-center">
              
            <BadgeCheck className="text-green-700 w-7 h-7" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-md bg-slate-100">
          <CardContent className="p-6 flex items-center justify-between">

            <div>
              <p className="text-slate-700 text-sm">
                Checked Out
              </p>

              <h2 className="text-4xl font-bold text-slate-900 mt-2">
                {checkedOut}
              </h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-slate-300 flex items-center justify-center">
            <LogOut className="text-gray-600 w-10 h-10" />
            </div>
          </CardContent>
        </Card>

      </div>

      <div className="relative max-w-md mb-8">

        <Search className="absolute left-4 top-4 text-gray-400 h-5 w-5" />

        <Input
          placeholder="Search by name or purpose..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 h-14 rounded-full bg-white shadow-sm"
        />

      </div>

      <Card className="rounded-3xl border-0 shadow-lg">

        <CardContent className="p-6">

          <h2 className="text-xl font-bold mb-6">
            Visitor List
          </h2>

          {visitors.length === 0 ? (
            <div className="text-center py-20">

              <h3 className="text-2xl font-semibold mb-3">
                No Visitors Yet
              </h3>

              <p className="text-gray-500 mb-6">
                Register your first visitor to begin.
              </p>

              <Link href="/register">
                <Button className="rounded-full px-8 bg-violet-600 hover:bg-violet-700">
                  Register Visitor
                </Button>
              </Link>

            </div>
          ) : filteredVisitors.length === 0 ? (

            <div className="text-center py-16">

              <h3 className="text-xl font-semibold">
                No Visitors Found
              </h3>
            </div>
          ) : (
            <VisitorTable
              visitors={filteredVisitors}
              onCheckIn={handleCheckIn}
              onCheckOut={handleCheckOut}
               onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )}
        </CardContent>
      </Card>
    </main>
  );
}