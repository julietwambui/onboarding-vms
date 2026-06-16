// DRY Principle: All API calls in the app go through this single client.
// Never call fetch() directly inside a React component or page.
//
// Import and use like this:
//   import { apiClient } from "@/lib/apiClient";
//   const visitors = await apiClient.get("/visitors");

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = {
  get:async (path:string)=>{
    const res=await fetch(`${BASE_URL}${path}`);

    if(!res.ok){
      throw new Error(`GET ${path}failed`);
    }
    return res.json();
  },
  /**
   * Make a GET request to the given path.
   * TODO: Implement using fetch(). Return the parsed JSON response.
   */
  /**
  
   * Make a POST request with a JSON body to the given path.
   * TODO: Implement using fetch() with method "POST" and correct headers.
   */
  post:async(path:string,body:unknown) =>{
    const res=await fetch(`${BASE_URL}${path}`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
    },
    body:JSON.stringify(body),
  });
  if(!res.ok){
    throw new Error(`POST${path} failed`);
  }
  return res.json();
},

 put:async (path:string)=>{
  const res=await fetch(`${BASE_URL}${path}`,{
  method:"PUT",
 });
 if(!res.ok){
  throw new Error(`PUT${path}failed`);
 }
 return res.json();
},
};
