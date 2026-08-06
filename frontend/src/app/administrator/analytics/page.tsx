"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
 Cell,
 Legend,
} from "recharts";
import { BarChart3, TrendingUp, Building2, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { apiClient } from "@/lib/apiClient";

interface WeeklyData {
  day: string;
  visitors: number;
}

interface DepartmentData {
  department: string;
  visits: number;
}

interface FrequentVisitor {
  fullName: string;
  department: string;
  purpose: string;
  count: number;
}

export default function AnalyticsPage() {
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]);
  const [departmentData, setDepartmentData] = useState<DepartmentData[]>([]);
  const [frequentVisitors, setFrequentVisitors] = useState<FrequentVisitor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [weekly, departments, frequent] = await Promise.all([
          apiClient.get("/visitors/analytics/weekly"),
          apiClient.get("/visitors/analytics/departments"),
    
          apiClient.get("/visitors/analytics/frequent"),
        ]);

        setWeeklyData(weekly.data ?? weekly);
        setDepartmentData(departments.data ?? departments);
        setFrequentVisitors(frequent.data ?? frequent);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-500">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-violet-600" />
          Analytics
        </h1>
        <p className="text-slate-500 mt-1">
          Visitor trends and insights
        </p>
      </div>

      {/* Weekly Trend */}
      {/* Department and Purpose Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <Card className="rounded-3xl border-0 shadow-md">
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-violet-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">
              Weekly Visitor Trend
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 13, fill: "#64748b" }}
              />
              <YAxis tick={{ fontSize: 13, fill: "#64748b" }} />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="visitors"
                stroke="#7c3aed"
                strokeWidth={3}
                dot={{ fill: "#7c3aed", r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

        {/* Visits by Department */}
        <Card className="rounded-3xl border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">
                Visits by Department
              </h2>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="department"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                />
                <YAxis tick={{ fontSize: 12, fill: "#64748b" }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar
                  dataKey="visits"
                  fill="#10b981"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Frequent Visitors */}
      <Card className="rounded-3xl border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
              <span className="text-xl">⚠️</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Flagged Frequent Visitors
              </h2>
              <p className="text-sm text-slate-500">
                Visitors with 3+ visits to the same department for the same purpose
              </p>
            </div>
          </div>

          {frequentVisitors.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-slate-400">
                No frequent visitors flagged yet
              </p>
            </div>
          ) : (
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
                      Purpose
                    </th>
                    <th className="text-left py-3 font-semibold text-slate-600">
                      Visit Count
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {frequentVisitors.map((visitor, index) => (
                    <tr
                      key={index}
                      className="border-b last:border-0 hover:bg-orange-50 transition-colors"
                    >
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-orange-200 flex items-center justify-center font-bold text-orange-700">
                            {visitor.fullName.charAt(0)}
                          </div>
                          <span className="font-semibold text-slate-800">
                            {visitor.fullName}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-slate-600">
                        {visitor.department}
                      </td>
                      <td className="py-4 text-slate-600">
                        {visitor.purpose}
                      </td>
                      <td className="py-4">
                        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 px-3">
                          {visitor.count} visits
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
}