"use client";
import { useState, useEffect } from "react";
import { Visitor } from "@/types/visitor";
import { apiClient } from "@/lib/apiClient";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import VisitorTable from"@/components/VisitorTable";

export default function DashboardPage() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
   const [isAuthenticated, setIsAuthenticated] = useState(false);

  

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
  const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
 }, []);
  
  async function handleCheckIn(id: string) {
    try{
    await apiClient.put(`/visitors/${id}/checkin`);
    await fetchVisitors()
    }catch(error){
      console.error("Check in failed:",error);
  }
  
  }
  async function handleCheckOut(id: string) {
    try{
    await apiClient.put(`/visitors/${id}/checkout`);
    await fetchVisitors();
    }catch(error){
      console.error("Check out failed:",error);
    }
  }

  function handleLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  setIsAuthenticated(false);
}
   
  
  return (
    <main className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Reception Dashboard</h1>

        <div className="flex gap-2">
        <Link href="/register">
       <Button> 
        Register Visitor
       </Button>
       </Link>

       {isAuthenticated && (
        <Button
        variant="outline"
        onClick={handleLogout}
        >
          Logout
        </Button>
       )}
       </div>
       </div>
       
      
      {visitors.length ===0 ?(
        <p className="text-muted-foreground">
          No visitors yet.{" "}
          <Link href="/register" className="text-blue-600 underline">
          Register the first visitor
          </Link>
        </p>
      ):(

        <VisitorTable
        visitors={visitors}
        onCheckIn={handleCheckIn}
        onCheckOut={handleCheckOut}
        isAuthenticated={isAuthenticated}
        />
      )}
      </main>
  );
}
     
    
  




