const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = {
  get:async (path:string)=>{
    const res=await fetch(`${BASE_URL}${path}`);

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
    headers:{
      "Content-Type":"application/json",
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

 put:async (path:string,body?:unknown)=>{
  const res=await fetch(`${BASE_URL}${path}`,{
  method:"PUT",
  headers:{
    "Content-Type":"application/json",
  },
 body: body !==undefined ? JSON.stringify(body) : undefined,
 });
 if(!res.ok){
  const text=await res.text();
  console.log("PUT ERROR:", res.status, text);
  throw new Error(`PUT ${path} failed`);
 }
 return res.json();
},
};
