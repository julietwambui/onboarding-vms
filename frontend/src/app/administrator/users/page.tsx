"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/apiClient";
import { Receptionist } from "@/types/visitor";
import ReceptionistTable from "@/components/ReceptionistTable";
import ReceptionistForm from "@/components/ReceptionistForm";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Users, X } from "lucide-react";

export default function UserManagementPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [receptionists, setReceptionists] = useState<Receptionist[]>([]);
  const [showForm, setShowForm] = useState(false);

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
      return;
    }

    setChecked(true);
  }, [router]);

  async function fetchReceptionists() {
    try {
      const data = await apiClient.get("/users/receptionists");
      setReceptionists(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (checked) fetchReceptionists();
  }, [checked]);

  async function handleCreate(data: { name: string; email: string; password: string }) {
    await apiClient.authPost("/users/receptionists", data);
    setShowForm(false);
    fetchReceptionists();
  }

  async function handleEdit(id: string, data: { name: string; email: string }) {
    await apiClient.put(`/users/receptionists/${id}`, data);
    fetchReceptionists();
  }

  async function handleDelete(id: string) {
    await apiClient.delete(`/users/receptionists/${id}`);
    fetchReceptionists();
  }

  if (!checked) return null;

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
         <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600
          flex items-center justify-center shadow-md">
            <Users className="text-white w-7 h-7"/>
            </div>
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Receptionist Management
          </h1>
          <p className="text-slate-500 mt-2">
            Create and manage receptionist accounts.
          </p>
          </div>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 rounded-full px-6 py-3 font-semibold shadow-md transition-all duration-300 ${
            showForm
              ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
              : "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:shadow-lg hover:scale-[1.02]"
          }`}
        >
          {showForm ? (
            <>
              <X className="w-5 h-5" />
              Cancel
            </>
          ) : (
            <>
              <UserPlus className="w-5 h-5" />
              Add Receptionist
            </>
          )}
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <Card className="mb-8 rounded-3xl border-0 shadow-lg overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-violet-600 to-fuchsia-600" />
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-6 text-slate-800">
              New Receptionist
            </h2>
            <ReceptionistForm onSubmit={handleCreate} />
          </CardContent>
        </Card>
      )}

      {/* Table */}
      <Card className="rounded-3xl border-0 shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-6 text-slate-800">
            All Receptionists
          </h2>

          {receptionists.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center mx-auto mb-4">
                <Users className="text-violet-500 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-3">
                No Receptionists Yet
              </h3>
              <p className="text-gray-500 mb-6">
                Add your first receptionist account to get started.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="rounded-full px-8 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Add Receptionist
              </button>
            </div>
          ) : (
            <ReceptionistTable
              receptionists={receptionists}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </CardContent>
      </Card>
    </main>
  );
}