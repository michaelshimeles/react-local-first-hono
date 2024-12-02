import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDeleteItem } from "@/hooks/useDeleteItem";
import { useSyncItems } from "@/hooks/useSyncItems";
import db from "@/local/db";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  ssr: true,
  beforeLoad: async ({ context }: any) => {
    // Wait for auth to be initialized
    console.log("context", context);
    if (!context?.auth.isLoaded) {
      // Return early without redirecting while auth is loading
      console.log("context?.auth.isLoading", context?.auth.isLoading);

      return;
    }

    if (!context?.auth.isSignedIn) {
      console.log("context?.auth.isSignedIn", context?.auth.isSignedIn);

      throw redirect({
        to: "/auth",
      });
    }
  },
});

function Dashboard() {
  const [name, setName] = useState("");
  const { mutate: syncItems } = useSyncItems();
  const { mutate: deleteItem } = useDeleteItem();
  const queryClient = useQueryClient();

  // Use React Query to manage local items state
  const { data: localItems = [] } = useQuery({
    queryKey: ["localItems"],
    queryFn: async () => {
      const items = await db.items.toArray();
      return items;
    },
    refetchOnWindowFocus: false,
  });

  // Auto-sync effect - runs every 5 seconds to batch sync pending items
  useEffect(() => {
    const autoSync = async () => {
      const unsyncedItems = await db.items
        .where("syncStatus")
        .equals("pending")
        .toArray();
      if (unsyncedItems.length > 0) {
        console.log("Auto-syncing batch of pending items:", unsyncedItems);
        syncItems(unsyncedItems);
      }
    };

    const interval = setInterval(autoSync, 5000); // Batch sync every 5 seconds
    return () => clearInterval(interval);
  }, [syncItems]);

  const handleAdd = async (e: any) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newItem = {
      id: crypto.randomUUID(),
      name: name.trim(),
      syncStatus: "pending" as const,
      version: 0,
      lastModified: Date.now(),
    };

    await db.items.add(newItem);
    // Refresh local items
    const items = await db.items.toArray();
    queryClient.setQueryData(["localItems"], items);
    setName("");
    // No immediate sync - will be picked up by next batch sync
  };

  const handleDelete = async (id: string) => {
    try {
      console.log("Deleting item:", id);
      await deleteItem(id);

      const items = await db.items.toArray();
      queryClient.setQueryData(["localItems"], items);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleSync = async () => {
    const unsyncedItems = await db.items
      .where("syncStatus")
      .equals("pending")
      .toArray();

    if (unsyncedItems.length > 0) {
      console.log("Manual sync of pending items:", unsyncedItems);
      syncItems(unsyncedItems);
    }
  };

  // Count pending items for UI feedback
  const pendingCount = localItems.filter(
    (item) => item.syncStatus === "pending"
  ).length;

  return (
    <div className="flex flex-col w-full justify-center items-center p-12">
      <div className="flex flex-col justify-center items-start max-w-3xl">
        <div className="flex justify-between">
          <h1 className="text-2xl font-medium">
            Local-First React App with TanStack Query + Hono RPC Backend
          </h1>
        </div>
        <form className="flex gap-2 py-4" onSubmit={handleAdd}>
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mr-2"
          />
          <Button type="submit">Add Item</Button>
        </form>
        <div className="flex gap-4 py-4">
          <Button onClick={handleSync}>
            Sync to Server {pendingCount > 0 && `(${pendingCount} pending)`}
          </Button>
        </div>
        {localItems.length > 0 && <h2 className="text-lg mb-2">Items</h2>}
        <ul className="space-y-2 w-full">
          {localItems.map((item, index) => (
            <li
              key={item.id || index}
              className="flex items-center justify-between rounded-md border p-2"
            >
              <p>{item.name}</p>
              <div className="flex gap-2 items-center">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex h-2 w-2 rounded-full ${
                      item.syncStatus === "synced"
                        ? "bg-green-500"
                        : item.syncStatus === "pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                    title={`Sync Status: ${item.syncStatus}`}
                  />
                </div>
                <Button
                  onClick={() => handleDelete(item.id)}
                  variant="destructive"
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
