import cubejs from "@cubejs-client/core";

const API_URL = import.meta.env!.VITE_CUBE_URL
const CUBEJS_TOKEN = import.meta.env!.VITE_CUBE_TOKEN
console.log(import.meta.env!.MODE)
console.log(CUBEJS_TOKEN)
console.log(API_URL)

export const cubejsApi = cubejs(CUBEJS_TOKEN, {
  apiUrl: `${API_URL}/cubejs-api/v1`,
});