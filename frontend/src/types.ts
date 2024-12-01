export interface Item {
  id: string;
  name: string;
  syncStatus: "pending" | "synced" | "error";
  version: number;
  lastModified: number;
}