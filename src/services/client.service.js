import { apiClient } from "./apiClient";

export function createClient(payload) {
  return apiClient.post("/creat/clients", payload);
}
