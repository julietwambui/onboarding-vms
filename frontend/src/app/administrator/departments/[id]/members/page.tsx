"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Users, Plus, Pencil, Trash2, X, Check, ArrowLeft, User, Mail, Briefcase } from "lucide-react";
import { apiClient } from "@/lib/apiClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface Member {
  id: string;
  name: string;
  email: string | null;
  role: string;
  createdAt: string;
}

interface Department {
  id: string;
  name: string;
}

export default function DepartmentMembersPage() {
  const params = useParams();
  const router = useRouter();
  const departmentId = params.id as string;

  const [department, setDepartment] = useState<Department | null>(null);
  const [members, setMembers] = useState<Member[]>([]);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(storedUser);
    if (user.role !== "ADMIN") {
      router.push("/login");
    }
  }, [router]);

  async function fetchDepartment() {
    try {
      const departments = await apiClient.get("/departments");
      const found = departments.find((d: Department) => d.id === departmentId);
      setDepartment(found ?? null);
    } catch (error) {
      console.error("Failed to fetch department:", error);
    }
  }

  async function fetchMembers() {
    try {
      const data = await apiClient.get(`/members/department/${departmentId}`);
      setMembers(data);
    } catch (error) {
      console.error("Failed to fetch members:", error);
    }
  }

  useEffect(() => {
    fetchDepartment();
    fetchMembers();
  }, [departmentId]);

  async function handleAdd() {
    if (!newName.trim() || !newRole.trim()) {
      setError("Name and role are required");
      return;
    }
    try {
      await apiClient.authPost("/members", {
        name: newName.trim(),
        email: newEmail.trim() || undefined,
        role: newRole.trim(),
        departmentId,
      });
      setNewName("");
      setNewEmail("");
      setNewRole("");
      setError("");
      setSuccess("Member added successfully");
      fetchMembers();
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError("Failed to add member");
    }
  }

  function startEditing(member: Member) {
    setEditingId(member.id);
    setEditName(member.name);
    setEditEmail(member.email ?? "");
    setEditRole(member.role);
    setError("");
  }

  function cancelEditing() {
    setEditingId(null);
    setEditName("");
    setEditEmail("");
    setEditRole("");
  }

  async function handleEdit(id: string) {
    if (!editName.trim() || !editRole.trim()) {
      setError("Name and role are required");
      return;
    }
    try {
      await apiClient.put(`/members/${id}`, {
        name: editName.trim(),
        email: editEmail.trim() || undefined,
        role: editRole.trim(),
      });
      cancelEditing();
      setSuccess("Member updated successfully");
      fetchMembers();
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError("Failed to update member");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to remove this member?")) return;
    try {
      await apiClient.delete(`/members/${id}`);
      setSuccess("Member removed successfully");
      fetchMembers();
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError("Failed to remove member");
    }
  }

  return (
    <div>
      <Link
        href="/administrator/departments"
        className="inline-flex items-center gap-1 text-sm font-semibold text-violet-600 hover:text-violet-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Departments
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <Users className="w-8 h-8 text-violet-600" />
          {department ? `${department.name} — Members` : "Department Members"}
        </h1>
        <p className="text-slate-500 mt-1">
          Manage staff members visitors can be assigned to
        </p>
      </div>

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

      <Card className="rounded-3xl border-0 shadow-md mb-6">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Add New Member</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <Input
              placeholder="Full name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="rounded-full"
            />
            <Input
              placeholder="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="rounded-full"
            />
            <Input
              placeholder="Role (e.g. Software Developer)"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="rounded-full"
            />
          </div>
          <Button
            onClick={handleAdd}
            className="rounded-full bg-violet-600 hover:bg-violet-700 px-6"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-0 shadow-md">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">
            All Members ({members.length})
          </h2>

          {members.length === 0 ? (
            <div className="text-center py-16">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-500">No Members Yet</h3>
              <p className="text-gray-400 mt-1">Add your first member above</p>
            </div>
          ) : (
            <div className="space-y-3">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-violet-50 transition-colors"
                >
                  {editingId === member.id ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1 mr-3">
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="rounded-full"
                        autoFocus
                      />
                      <Input
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="rounded-full"
                      />
                      <Input
                        value={editRole}
                        onChange={(e) => setEditRole(e.target.value)}
                        className="rounded-full"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                        <User className="w-5 h-5 text-violet-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{member.name}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-3 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-3.5 h-3.5" />
                            {member.role}
                          </span>
                          {member.email && (
                            <span className="flex items-center gap-1">
                              <Mail className="w-3.5 h-3.5" />
                              {member.email}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    {editingId === member.id ? (
                      <>
                        <button
                          onClick={() => handleEdit(member.id)}
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
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(member)}
                          className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(member.id)}
                          className="p-2 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}