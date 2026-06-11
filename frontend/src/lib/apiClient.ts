// DRY Principle: All API calls in the app go through this single client.
// Never call fetch() directly inside a React component or page.
//
// Import and use like this:
//   import { apiClient } from "@/lib/apiClient";
//   const visitors = await apiClient.get("/visitors");

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = {
  /**
   * Make a GET request to the given path.
   * TODO: Implement using fetch(). Return the parsed JSON response.
   */
  get: async (path: string) => {
    // TODO
  },

  /**
   * Make a POST request with a JSON body to the given path.
   * TODO: Implement using fetch() with method "POST" and correct headers.
   */
  post: async (path: string, body: unknown) => {
    // TODO
  },

  /**
   * Make a PUT request to the given path (no body needed for check-in/out).
   * TODO: Implement using fetch() with method "PUT".
   */
  put: async (path: string) => {
    // TODO
  },
};
