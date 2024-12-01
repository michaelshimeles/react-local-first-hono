// src/store.js
import { create } from "zustand";

const useStore = create((set) => ({
  items: [],
  addItem: (item: any) =>
    set((state: any) => ({ items: [...state.items, item] })),
  syncToDB: async (db: any) => {
    const items = await db.items.toArray();
    set({ items });
  },
  deleteItem: (id: string) =>
    set((state: any) => ({
      items: state.items.filter((item: any) => item.id !== id),
    })),
}));

export default useStore;
