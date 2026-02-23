import { apiClient } from "./apiClient";

export function fetchAnalyticsData() {
  return apiClient.get("/api/an/data");
}
