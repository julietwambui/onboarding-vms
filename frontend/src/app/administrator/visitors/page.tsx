
"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Visitor } from "@/types/visitor";
import { apiClient } from "@/lib/apiClient";
import AdminVisitorTable from "@/components/AdminVisitorTable";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {Users} from "lucide-react";

export default function AdminVisitorsPage() {
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

  const filteredVisitors = visitors.filter(
    (visitor) =>
      visitor.fullName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      visitor.purpose
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (visitor.department?.name ?? "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      visitor.status
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <main>

      <div className=" flex items-center gap-4 mb-10">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600
         flex items-center justify-center shadow-md">
          <Users className="text-white w-7 h-7" />
          </div>

          <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Visitors
        </h1>
        <p className="text-slate-500 mt-2">
          View and monitor all visitor records across the organisation.
        </p>
        </div>
      </div>

      <div className="relative max-w-md mb-8">

        <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />

        <Input
          placeholder="Search by name, department, purpose or status..."
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

              <p className="text-gray-500">
                No visitors have been registered yet.
              </p>

            </div>

          ) : filteredVisitors.length === 0 ? (

            <div className="text-center py-20">

              <h3 className="text-2xl font-semibold mb-3">
                No Visitors Found
              </h3>

              <p className="text-gray-500">
                Try adjusting your search.
              </p>
            </div>
          ) : (
            <AdminVisitorTable
              visitors={filteredVisitors}
            />
          )}
        </CardContent>
      </Card>
    </main>
  );
}

