// src/sync.js
import db from "./db";

export const saveToDB = async (item: any) => {
  await db.items.add(item);
};


export const deleteFromDB = async (id: string) => {
  await db.items.delete(id); // Deletes item by ID
};
