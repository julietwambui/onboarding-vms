"use client";

import { useState, useEffect } from "react";
import { Building2, Plus, Pencil, Trash2, X, Check } from "lucide-react";
import { apiClient } from "@/lib/apiClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface Department {
  id: string;
  name: string;
  createdAt: string;
}

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [newDeptName, setNewDeptName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function fetchDepartments() {
    try {
      const data = await apiClient.get("/departments");
      setDepartments(data);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    }
  }

  useEffect(() => {
    fetchDepartments();
  }, []);

  async function handleAdd() {
    if (!newDeptName.trim()) {
      setError("Department name cannot be empty");
      return;
    }
    try {
      await apiClient.post("/departments", { name: newDeptName.trim() });
      setNewDeptName("");
      setError("");
      setSuccess("Department added successfully");
      fetchDepartments();
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError("Failed to add department. Name might already exist.");
    }
  }

  async function handleEdit(id: string) {
    if (!editingName.trim()) {
      setError("Department name cannot be empty");
      return;
    }
    try {
      await apiClient.put(`/departments/${id}`, { name: editingName.trim() });
      setEditingId(null);
      setEditingName("");
      setError("");
      setSuccess("Department updated successfully");
      fetchDepartments();
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError("Failed to update department");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this department?")) return;
    try {
      await apiClient.delete(`/departments/${id}`);
      setSuccess("Department deleted successfully");
      fetchDepartments();
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError("Failed to delete department. It may have visitors assigned.");
    }
  }

  function startEditing(dept: Department) {
    setEditingId(dept.id);
    setEditingName(dept.name);
    setError("");
  }

  function cancelEditing() {
    setEditingId(null);
    setEditingName("");
    setError("");
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <Building2 className="w-8 h-8 text-violet-600" />
          Departments
        </h1>
        <p className="text-slate-500 mt-1">
          Manage your organization's departments
        </p>
      </div>

      {/* Feedback Messages */}
      {success && (
        <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-xl border border-green-200">
          {success}
        </div>
      )}
      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {/* Add New Department */}
      <Card className="rounded-3xl border-0 shadow-md mb-6">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">
            Add New Department
          </h2>
          <div className="flex gap-3">
            <Input
              placeholder="Enter department name (e.g. ICT, HR, Finance)"
              value={newDeptName}
              onChange={(e) => setNewDeptName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              className="rounded-full"
            />
            <Button
              onClick={handleAdd}
              className="rounded-full bg-violet-600 hover:bg-violet-700 px-6 whitespace-nowrap"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Department
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Departments List */}
      <Card className="rounded-3xl border-0 shadow-md">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">
            All Departments ({departments.length})
          </h2>

          {departments.length === 0 ? (
            <div className="text-center py-16">
              <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-500">
                No Departments Yet
              </h3>
              <p className="text-gray-400 mt-1">
                Add your first department above
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {departments.map((dept) => (
                <div
                  key={dept.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-violet-50 transition-colors"
                >
                  {editingId === dept.id ? (
                    // Edit mode
                    <div className="flex items-center gap-3 flex-1">
                      <Input
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleEdit(dept.id);
                          if (e.key === "Escape") cancelEditing();
                        }}
                        className="rounded-full max-w-sm"
                        autoFocus
                      />
                      <button
                        onClick={() => handleEdit(dept.id)}
                        className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    // View mode
                    <>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-violet-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">
                            {dept.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            Added {new Date(dept.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => startEditing(dept)}
                          className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(dept.id)}
                          className="p-2 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}