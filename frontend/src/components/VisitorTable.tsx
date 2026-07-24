"use client";

import { Visitor } from "@/types/visitor";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  LogIn,
  LogOut,
} from "lucide-react";

interface VisitorTableProps {
  visitors: Visitor[];
  onCheckIn: (id: string) => void;
  onCheckOut: (id: string) => void;
  isAuthenticated: boolean;
}

export default function VisitorTable({
  visitors,
  onCheckIn,
  onCheckOut,
  isAuthenticated,
}: VisitorTableProps) {
  return (
    <Table>

      <TableHeader>

        <TableRow className="bg-violet-50 hover:bg-violet-50">

          <TableHead className="font-bold text-violet-700">
            Visitor
          </TableHead>

          <TableHead className="font-bold text-violet-700">
            Purpose
          </TableHead>

          <TableHead className="font-bold text-violet-700">
            Status
          </TableHead>

          <TableHead className="font-bold text-violet-700 text-right">
            Actions
          </TableHead>

        </TableRow>

      </TableHeader>

      <TableBody>

        {visitors.map((visitor) => (

          <TableRow
            key={visitor.id}
            className="hover:bg-violet-50 transition-colors"
            data-testid="visitor-row"
          >

            {/* Visitor */}

            <TableCell data-testid="visitor-name">

              <div className="flex items-center gap-3">


                <div>

                  <p className="font-semibold text-slate-800">
                    {visitor.fullName}
                  </p>

                </div>

              </div>

            </TableCell>

            {/* Purpose */}

            <TableCell className="text-slate-600">
              {visitor.purpose}
            </TableCell>

            {/* Status */}

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

            {/* Actions */}

            <TableCell className="text-right">

              {visitor.status === "PENDING" && (

                <Button
                  size="sm"
                  disabled={!isAuthenticated}
                  onClick={() => onCheckIn(visitor.id)}
                  className="rounded-full bg-green-600 hover:bg-green-700"
                  data-testid="checkin-btn"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Check In
                </Button>

              )}

              {visitor.status === "CHECKED_IN" && (

                <Button
                  size="sm"
                  variant="destructive"
                  disabled={!isAuthenticated}
                  onClick={() => onCheckOut(visitor.id)}
                  className="rounded-full"
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

            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}