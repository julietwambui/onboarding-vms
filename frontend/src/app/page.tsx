// Reception Dashboard — Sprint 3
//
// This is the main page staff use to manage visitors.
// It should:
//   1. Fetch all visitors from GET /visitors on page load
//   2. Display them in a table with columns: Full Name, Purpose, Status, Actions
//   3. Show a "Check In" button for PENDING visitors
//   4. Show a "Check Out" button for CHECKED_IN visitors
//   5. Refresh the list automatically after each action
//
// Hint: Use the "use client" directive since this component manages state.
// Hint: Use React's useEffect to fetch visitors when the component mounts.
// Hint: Use useState to store the visitors array.

"use client";

import { useState, useEffect } from "react";
import { Visitor } from "@/types/visitor";
import { apiClient } from "@/lib/apiClient";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


export default function DashboardPage() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  

  async function fetchVisitors(){
    try{
    const response=await apiClient.get("/visitors");
    setVisitors(response.data ?? response);
  }catch(error){
    console.error("Failed to fetch visitors:",error);
  }
}
 useEffect(()=>{
  fetchVisitors();
 }, []);
  // Store the result in the visitors state

  async function handleCheckIn(id: string) {
    try{
    await apiClient.put(`/visitors/${id}/checkin`);
    await fetchVisitors()
    }catch(error){
      console.error("Check in failed:",error);
    
  }
    // TODO: Call PUT /visitors/:id/checkin via apiClient
    // After success, refresh the visitors list
  }
  async function handleCheckOut(id: string) {
    try{
    await apiClient.put(`/visitors/${id}/checkout`);
    await fetchVisitors();
    }catch(error){
      console.error("Check out failed:",error);
    }
  }
    // TODO: Call PUT /visitors/:id/checkout via apiClient
    // After success, refresh the visitors list
  
  return (
    <main className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Reception Dashboard</h1>

        <Link href="/register">
       <Button> Register Visitor</Button>
       </Link>
       </div>
        {/* TODO: Add a link/button to navigate to the registration page */}
      
      {visitors.length ===0 ?(
        <p className="text-muted-foreground">
          No visitors yet.{""}
          <Link href="/register" className="text-blue-600 underline">
          Register the first visitor
          </Link>
        </p>
      ):(

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
                    <Button onClick={() =>handleCheckIn(visitor.id)}>
                      Check In
                    </Button>
                  )}

                  {visitor.status === "CHECKED_IN" && (
                    <Button
                    variant="destructive"
                    onClick={()=>handleCheckOut(visitor.id)}
                    >
                      Check Out
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
           </TableBody>
        </Table>
      )}
      </main>
  );
}
      /*TODO:Render the visitors table*/
      /* Each row should show: fullName, purpose, status badge, and action buttons */
      /* Conditionally render "Check In" only for PENDING visitors */
      /* Conditionally render "Check Out" only for CHECKED_IN visitors */

     
    
  




