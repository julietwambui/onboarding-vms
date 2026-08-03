"use client";

import { useEffect, useState } from "react";

import {
  Users,
  CalendarDays,
  Building2,
  Repeat,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { apiClient } from "@/lib/apiClient";

interface RecentActivity {
  fullName: string;
  status: "PENDING" | "CHECKED_IN" | "CHECKED_OUT";
  createdAt: string;
  department: {
    name: string;
  } | null;
}

interface OverviewData {
  todayVisitors: number;
  weeklyVisitors: number;
  mostVisitedDepartment: string;
  repeatVisitors: number;
  recentActivity: RecentActivity[];
}

export default function AdminDashboard() {
  const [overview, setOverview] = useState<OverviewData>({
    todayVisitors: 0,
    weeklyVisitors: 0,
    mostVisitedDepartment: "—",
    repeatVisitors: 0,
    recentActivity: [],
  });

  useEffect(() => {
    async function fetchOverview() {
      try {
        const response = await apiClient.get(
          "/visitors/stats/overview"
        );
        console.log(response.data ?? response);

        setOverview(response.data ?? response);
      } catch (error) {
        console.error("Failed to fetch overview:", error);
      }
    }

    fetchOverview();
  }, []);

  return (
    <main className="space-y-8">


      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Overview
        </h1>

        <p className="text-slate-500 mt-2">
          Welcome back, Administrator. Monitor visitor activity across the organisation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <Card className="rounded-3xl border-0 shadow-md bg-violet-100">
          <CardContent className="p-6 flex items-center justify-between">

            <div>
              <p className="text-violet-700 text-sm font-medium">
                Today's Visitors
              </p>

              <h2 className="text-4xl font-bold text-violet-900 mt-2">
                {overview.todayVisitors}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-violet-200 flex items-center justify-center">
              <Users className="w-7 h-7 text-violet-700" />
            </div>

          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-md bg-yellow-50">
          <CardContent className="p-6 flex items-center justify-between">

            <div>
              <p className="text-yellow-700 text-sm font-medium">
                Weekly Visitors
              </p>

              <h2 className="text-4xl font-bold text-yellow-900 mt-2">
                {overview.weeklyVisitors}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-yellow-200 flex items-center justify-center">
              <CalendarDays className="w-7 h-7 text-yellow-700" />
            </div>

          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-md bg-green-50">
          <CardContent className="p-6 flex items-center justify-between">

            <div>
              <p className="text-green-700 text-sm font-medium">
                Most Visited Department
              </p>

              <h2 className="text-2xl font-bold text-green-900 mt-2">
                {overview.mostVisitedDepartment}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-green-200 flex items-center justify-center">
              <Building2 className="w-7 h-7 text-green-700" />
            </div>

          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-md bg-sky-50">
          <CardContent className="p-6 flex items-center justify-between">

            <div>
              <p className="text-sky-700 text-sm font-medium">
                Repeat Visitors
              </p>

              <h2 className="text-4xl font-bold text-sky-900 mt-2">
                {overview.repeatVisitors}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-sky-200 flex items-center justify-center">
              <Repeat className="w-7 h-7 text-sky-700" />
            </div>

          </CardContent>
        </Card>

      </div>


      <Card className="rounded-3xl border-0 shadow-lg">
        <CardContent className="p-6">

          <h2 className="text-2xl font-bold mb-6">
            Recent Activity
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left py-3 font-semibold text-slate-600">
                    Visitor
                  </th>

                  <th className="text-left py-3 font-semibold text-slate-600">
                    Department
                  </th>

                  <th className="text-left py-3 font-semibold text-slate-600">
                    Status
                  </th>

                  <th className="text-left py-3 font-semibold text-slate-600">
                    Time
                  </th>

                </tr>

              </thead>

              <tbody>

                {overview.recentActivity.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center py-10 text-slate-400"
                    >
                      No activity available.
                    </td>
                  </tr>
                ) : (
                  overview.recentActivity.map((activity, index) => (
                    <tr
                      key={index}
                      className="border-b last:border-0"
                    >
                      <td className="py-4">
                        {activity.fullName}
                      </td>

                      <td className="py-4">
                        {activity.department?.name ?? "N/A"}
                      </td>

                      <td className="py-4">

                        <Badge
                          className={
                            activity.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                              : activity.status === "CHECKED_IN"
                              ? "bg-green-100 text-green-700 hover:bg-green-100"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-200"
                          }
                        >
                          {activity.status.replace("_", " ")}
                        </Badge>

                      </td>

                      <td className="py-4">
                        {new Date(
                          activity.createdAt
                        ).toLocaleString()}
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}