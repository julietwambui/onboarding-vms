// VisitorTable Component — Sprint 3
"use client"
import { Visitor } from "@/types/visitor";
import{Button} from"@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface VisitorTableProps {
  visitors: Visitor[];
  onCheckIn: (id: string) => void;
  onCheckOut: (id: string) => void;
}

export default function VisitorTable({
  visitors,
  onCheckIn,
  onCheckOut,
}: VisitorTableProps) {
  return (
    <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
           <TableBody>
            {visitors.map((visitor)=>(
              <TableRow key={visitor.id}>
                <TableCell>{visitor.fullName}</TableCell>
                <TableCell>{visitor.purpose}</TableCell>
                <TableCell>
                  <Badge
                  className={
                    visitor.status==="PENDING"
                    ? "bg-yellow-500 text-white"
                    :visitor.status==="CHECKED_IN"
                    ?"bg-green-600 text-white"
                    :"bg-grey-600 text-white"
                  }
                  >
                  {visitor.status}
                  </Badge>
                </TableCell>

                <TableCell>
                  {visitor.status==="PENDING" && (
                    <Button onClick={() =>onCheckIn(visitor.id)}>
                      Check In
                    </Button>
                  )}

                  {visitor.status === "CHECKED_IN" && (
                    <Button
                    variant="destructive"
                    onClick={()=>onCheckOut(visitor.id)}
                    >
                      Check Out
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
           </TableBody>
        </Table>     
  );
}
    
      
          
      
      
    
  

