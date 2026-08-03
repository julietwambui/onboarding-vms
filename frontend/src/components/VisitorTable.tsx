"use client";

import { useState } from "react";
import { Visitor } from "@/types/visitor";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LogIn, LogOut, Pencil, Trash2, Check, X } from "lucide-react";

interface VisitorTableProps {
  visitors: Visitor[];
  onCheckIn: (id: string) => void;
  onCheckOut: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, data: { fullName: string; purpose: string }) => void;
}

export default function VisitorTable({
  visitors,
  onCheckIn,
  onCheckOut,
  onDelete,
  onEdit,
}: VisitorTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFullName, setEditFullName] = useState("");
  const [editPurpose, setEditPurpose] = useState("");

  function startEditing(visitor: Visitor) {
    setEditingId(visitor.id);
    setEditFullName(visitor.fullName);
    setEditPurpose(visitor.purpose);
  }

  function cancelEditing() {
    setEditingId(null);
    setEditFullName("");
    setEditPurpose("");
  }

  function handleSaveEdit(id: string) {
    if (!editFullName.trim() || !editPurpose.trim()) return;
    onEdit(id, { fullName: editFullName.trim(), purpose: editPurpose.trim() });
    cancelEditing();
  }

  function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this visitor?")) return;
    onDelete(id);
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-violet-50 hover:bg-violet-50">
          <TableHead className="font-bold text-violet-700">Visitor</TableHead>
          <TableHead className="font-bold text-violet-700">Email</TableHead>
          <TableHead className="font-bold text-violet-700">Phone Number</TableHead>
          <TableHead className="font-bold text-violet-700">Department</TableHead>
          <TableHead className="font-bold text-violet-700">Purpose</TableHead>
          <TableHead className="font-bold text-violet-700">Status</TableHead>
          <TableHead className="font-bold text-violet-700 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {visitors.map((visitor) => (
          <TableRow
            key={visitor.id}
            className="hover:bg-violet-50 transition-colors"
            data-testid="visitor-row"
          >
            {editingId === visitor.id ? (
              // Edit mode
              <>
                <TableCell data-testid="visitor-name">
                  <Input
                    value={editFullName}
                    onChange={(e) => setEditFullName(e.target.value)}
                    className="rounded-full h-8 w-36"
                    autoFocus
                  />
                </TableCell>
                <TableCell>{visitor.email}</TableCell>
                <TableCell>{visitor.phoneNumber}</TableCell>
                <TableCell>{visitor.department?.name ?? "N/A"}</TableCell>
                <TableCell>
                  <Input
                    value={editPurpose}
                    onChange={(e) => setEditPurpose(e.target.value)}
                    className="rounded-full h-8 w-36"
                  />
                </TableCell>
                <TableCell data-testid="visitor-status">
                  <Badge
                    className={
                      visitor.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                        : visitor.status === "CHECKED_IN"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-200"
                    }
                  >
                    {visitor.status.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => handleSaveEdit(visitor.id)}
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
              // View mode
              <>
                <TableCell data-testid="visitor-name">
                  <p className="font-semibold text-slate-800">
                    {visitor.fullName}
                  </p>
                </TableCell>
                <TableCell className="text-slate-600">{visitor.email}</TableCell>
                <TableCell className="text-slate-600">{visitor.phoneNumber}</TableCell>
                <TableCell className="text-slate-600">
                  {visitor.department?.name ?? "N/A"}
                </TableCell>
                <TableCell className="text-slate-600">{visitor.purpose}</TableCell>
                <TableCell data-testid="visitor-status">
                  <Badge
                    className={
                      visitor.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                        : visitor.status === "CHECKED_IN"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-200"
                    }
                  >
                    {visitor.status.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-3">
                    {visitor.status === "PENDING" && (
                      <Button
                        size="sm"
                        onClick={() => onCheckIn(visitor.id)}
                        className="rounded-full bg-violet-500 hover:bg-violet-600 text-white"
                        data-testid="checkin-btn"
                      >
                        <LogIn className="mr-2 h-4 w-4" />
                        Check In
                      </Button>
                    )}
                    {visitor.status === "CHECKED_IN" && (
                      <Button
                        size="sm"
                        onClick={() => onCheckOut(visitor.id)}
                        className="rounded-full bg-slate-500 hover:bg-slate 600 text white"
                        data-testid="checkout-btn"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Check Out
                      </Button>
                    )}
                    {visitor.status === "CHECKED_OUT" && (
                      <span
                        className="text-sm text-gray-500 italic"
                        data-testid="checkedout-text"
                      >
                        Checked Out
                      </span>
                    )}
                    <button
                      onClick={() => startEditing(visitor)}
                      className="p-2 rounded-full bg-violet-50 text-violet-600 hover:bg-violet-100 transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(visitor.id)}
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