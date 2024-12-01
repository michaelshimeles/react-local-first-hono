// src/db.ts
import Dexie from "dexie";

interface MyDatabase extends Dexie {
  items: Dexie.Table<Item, string>;
  deletions: Dexie.Table<DeletedItem, string>;
}

interface Item {
  id: string;
  name: string;
  syncStatus: "pending" | "synced" | "error";
  version: number;
  lastModified: number;
  serverId?: number;
}

interface DeletedItem {
  id: string;
  deletedAt: number;
  syncStatus: "pending";
}

const db = new Dexie("MyLocalFirstDB") as MyDatabase;

db.version(3).stores({
  items: "id, name, syncStatus, lastModified, serverId",
  deletions: "id, deletedAt, syncStatus",
});

export default db;
