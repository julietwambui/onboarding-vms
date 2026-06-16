// VisitorTable Component — Sprint 3
//
// 👤 Frontend Intern Task
//
// A reusable table component that displays a list of visitors.
// This component is responsible ONLY for rendering the table.
// It should NOT fetch data or call the API directly.
//
// Props:
//   visitors   — the array of visitors to display (passed in from the page)
//   onCheckIn  — called with the visitor's id when "Check In" is clicked
//   onCheckOut — called with the visitor's id when "Check Out" is clicked
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
                    ? "bg-blue-500 text-white"
                    :visitor.status==="CHECKED_IN"
                    ?"bg-green-600 text-white"
                    :"bg-red-600 text-white"
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
    
            {/* TODO: Render visitor.fullName in a <td> */}

            {/* TODO: Render visitor.purpose in a <td> */}

            {/* TODO: Render a status badge in a <td> */}
            {/* Use distinct colours: PENDING = yellow, CHECKED_IN = green, CHECKED_OUT = grey */}

            
              {/* TODO: Show "Check In" button ONLY if visitor.status === "PENDING" */}
              {/* onClick={() => onCheckIn(visitor.id)} */}

              {/* TODO: Show "Check Out" button ONLY if visitor.status === "CHECKED_IN" */}
              {/* onClick={() => onCheckOut(visitor.id)} */}
            
          
      
      
    
  

