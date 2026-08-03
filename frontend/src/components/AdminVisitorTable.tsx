
"use client";
import { Visitor } from "@/types/visitor";
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
  User,
  Mail,
  Phone,
  Building2,
  ClipboardList,
} from "lucide-react";

interface AdminVisitorTableProps {
  visitors: Visitor[];
}

export default function AdminVisitorTable({
  visitors,
}: AdminVisitorTableProps) {
  return (
    <Table>

      <TableHeader>

        <TableRow className="bg-violet-50 hover:bg-violet-50">

          <TableHead className="font-bold text-violet-700">
            Visitor
          </TableHead>

          <TableHead className="font-bold text-violet-700">
            Email
          </TableHead>

          <TableHead className="font-bold text-violet-700">
            Phone Number
          </TableHead>

          <TableHead className="font-bold text-violet-700">
            Department
          </TableHead>

          <TableHead className="font-bold text-violet-700">
            Purpose
          </TableHead>

          <TableHead className="font-bold text-violet-700">
            Status
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>

        {visitors.map((visitor) => (

          <TableRow
            key={visitor.id}
            className="hover:bg-violet-50 transition-colors"
          >

            <TableCell>

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-violet-700" />
                </div>

                <div>
                  <p className="font-semibold text-slate-800">
                    {visitor.fullName}
                  </p>
                </div>

              </div>

            </TableCell>

            <TableCell>

              <div className="flex items-center gap-2 text-slate-600">

                <Mail className="w-4 h-4 text-violet-500" />

                {visitor.email}

              </div>

            </TableCell>

            <TableCell>

              <div className="flex items-center gap-2 text-slate-600">

                <Phone className="w-4 h-4 text-violet-500" />

                {visitor.phoneNumber}

              </div>

            </TableCell>


            <TableCell>

              <div className="flex items-center gap-2 text-slate-600">

                <Building2 className="w-4 h-4 text-violet-500" />

                {visitor.department?.name ?? "N/A"}

              </div>

            </TableCell>

            <TableCell>

              <div className="flex items-center gap-2 text-slate-600">

                <ClipboardList className="w-4 h-4 text-violet-500" />

                {visitor.purpose}

              </div>

            </TableCell>

            <TableCell>

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

          </TableRow>

        ))}

      </TableBody>

    </Table>
  );
}
