"use client";

import { useState } from "react";
import { Receptionist } from "@/types/visitor";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Check, X, User, Mail} from "lucide-react";

interface ReceptionistTableProps {
  receptionists: Receptionist[];
  onEdit: (id: string, data: { name: string; email: string }) => void;
  onDelete: (id: string) => void;
}

export default function ReceptionistTable({
  receptionists,
  onEdit,
  onDelete,
}: ReceptionistTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  function startEditing(receptionist: Receptionist) {
    setEditingId(receptionist.id);
    setEditName(receptionist.name);
    setEditEmail(receptionist.email);
  }

  function cancelEditing() {
    setEditingId(null);
    setEditName("");
    setEditEmail("");
  }

  function handleSaveEdit(id: string) {
    if (!editName.trim() || !editEmail.trim()) return;
    onEdit(id, { name: editName.trim(), email: editEmail.trim() });
    cancelEditing();
  }

  function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this receptionist?")) return;
    onDelete(id);
  }

  if (receptionists.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold">No Receptionists Yet</h3>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-violet-50 hover:bg-violet-50">
          <TableHead className="font-bold text-violet-700">Name</TableHead>
          <TableHead className="font-bold text-violet-700">Email</TableHead>
          <TableHead className="font-bold text-violet-700">Created</TableHead>
          <TableHead className="font-bold text-violet-700 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {receptionists.map((r) => (
          <TableRow key={r.id} className="hover:bg-violet-50 transition-colors">
            {editingId === r.id ? (
              <>
                <TableCell>
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="rounded-full h-8 w-40"
                    autoFocus
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="rounded-full h-8 w-48"
                  />
                </TableCell>
                <TableCell className="text-slate-500 text-sm">
                  {new Date(r.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => handleSaveEdit(r.id)}
                      className="p-2 rounded-full bg-violet-100 text-violet-700 hover:bg-violet-200 transition-colors"
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
                </TableCell>
              </>
            ) : (
              <>
                <TableCell className="font-semibold text-slate-800">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-violet-500"/>
                      {r.name}
                      </div>
                      </TableCell>
                      
                <TableCell className="text-slate-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-violet-400" />
                    {r.email}
                    </div>
                    </TableCell>
                    
                <TableCell className="text-slate-500 text-sm">
                  {new Date(r.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => startEditing(r)}
                      className="p-2 rounded-full bg-violet-50 text-violet-600 hover:bg-violet-100 transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="p-2 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}