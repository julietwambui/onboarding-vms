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

export default function DashboardPage() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  async function fetchVisitors(){
    const data=await apiClient.get("/visitors");
    setVisitors(data);
  }
 useEffect(()=>{
  fetchVisitors();
 }[]);
  // Store the result in the visitors state

  async function handleCheckIn(id: string) {
    await apiClient.put('/visitors/${id}/checkin');
    fetchVisitors();
    // TODO: Call PUT /visitors/:id/checkin via apiClient
    // After success, refresh the visitors list
  }

  async function handleCheckOut(id: string) {
    await apiClient.put('/visitors/${id}/checkout');
    fetchVisitors();
    // TODO: Call PUT /visitors/:id/checkout via apiClient
    // After success, refresh the visitors list
  }

  return (
    <main>
      <div>
        <h1>Reception Dashboard</h1>
        <Link href="/register">
        Register Visitor</Link>
        {/* TODO: Add a link/button to navigate to the registration page */}
      </div>
       <table>
        <thead>
          <tr>
            <th>Full name </th>
            <th>Purpose</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
       </table>

       
      {/* TODO: Render the visitors table */}
      {/* Each row should show: fullName, purpose, status badge, and action buttons */}
      {/* Conditionally render "Check In" only for PENDING visitors */}
      {/* Conditionally render "Check Out" only for CHECKED_IN visitors */}

      {visitors.length === 0 && (
        <p>No visitors yet. <Link href="/register">Register the first one.</Link></p>
      )}
    </main>
  );
}
