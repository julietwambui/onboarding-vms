const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export const apiClient = {
  get:async (path:string)=>{
    const res=await fetch(`${BASE_URL}${path}`, {
      headers: getAuthHeaders(),
    });

    if(!res.ok){
      const text=await res.text();
      console.log("GET ERROR:", res.status, text);
      throw new Error(`GET ${path} failed`);
    }
    return res.json();
  },
 
  post:async(path:string,body:unknown) =>{
    const res=await fetch(`${BASE_URL}${path}`,{
    method:"POST",
    headers: {
      "Content-Type": "application/json",
    },
    body:JSON.stringify(body),
  });
  if(!res.ok){
    const text=await res.text();
    console.log("POST ERROR:", res.status,text);
    throw new Error(`POST ${path} failed`);
  }
  return res.json();
},

authPost: async (path: string, body: unknown) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    console.log("AUTH POST ERROR:", res.status, text);
    throw new Error(`POST ${path} failed`);
  }

  return res.json();
},

 put:async (path:string,body?:unknown)=>{
  const res=await fetch(`${BASE_URL}${path}`,{
  method:"PUT",
  headers: getAuthHeaders(),
 body: body !==undefined ? JSON.stringify(body) : undefined,
 });
 
 if(!res.ok){
  const text=await res.text();
  console.log("PUT ERROR:", res.status, text);
  throw new Error(`PUT ${path} failed`);
 }
 return res.json();
},

delete: async (path: string) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const text = await res.text();
    console.log("DELETE ERROR:", res.status, text);
    throw new Error(`DELETE ${path} failed`);
  }

  return res.json();
},
}