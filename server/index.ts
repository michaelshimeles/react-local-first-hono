import { getAuth } from "@hono/clerk-auth";
import { Pool } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { Webhook } from "svix";
import { items, users } from "./db/schema";

const app = new Hono();

const apiRoutes = app
  .basePath("/api")
  .get("/items", async (c) => {
    try {
      const client = new Pool({ connectionString: process.env.DATABASE_URL });
      const db = drizzle(client);

      const result = await db.select().from(items);

      return c.json({
        result,
      });
    } catch (error) {
      console.log(error);
      return c.json(
        {
          error,
        },
        400
      );
    }
  })
  .post("/items", async (c) => {
    try {
      const client = new Pool({ connectionString: process.env.DATABASE_URL });
      const db = drizzle(client);

      const body = await c.req.json();

      if (!Array.isArray(body)) {
        return c.json({ error: "Invalid input: expected array of items" }, 400);
      }

      const itemsToSync = body;

      // Process items in batch
      const results = await Promise.all(
        itemsToSync.map(async (item) => {
          try {
            if (!item.name) {
              return { id: item.id, status: "error", error: "Missing name" };
            }

            await db.insert(items).values({
              id: item.id,
              name: item.name,
            });

            return { id: item.id, status: "success" };
          } catch (error) {
            console.error("Error inserting item:", error);
            return { id: item.id, status: "error" };
          }
        })
      );

      return c.json({
        success: true,
        results,
      });
    } catch (error) {
      console.error("Server error:", error);
      return c.json(
        {
          success: false,
          error: "Failed to sync items",
        },
        500
      );
    }
  })
  .post("/items/delete", async (c) => {
    const client = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = drizzle(client);

    const { id } = await c.req.json();

    const deletedItem = await db
      .delete(items)
      .where(eq(items.id, id))
      .returning();

    return c.json({
      success: true,
      result: deletedItem,
    });
  })
  .post("/webhook", async (c) => {
    const WEBHOOK_SECRET = "whsec_pZ4+jdQMV1/Le+s5fic/aEnTiBvJf26F";

    console.log("WEBHOOK_SECRET", WEBHOOK_SECRET);

    if (!WEBHOOK_SECRET) {
      return c.json("Please add webhook scret from authentication provider", {
        status: 400,
      });
    }

    const svix_id = c.req.header("svix-id");
    const svix_timestamp = c.req.header("svix-timestamp");
    const svix_signature = c.req.header("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return c.json("Error occured -- no svix headers", {
        status: 400,
      });
    }

    // Get the body
    const payload = await c.req.json();

    const body = JSON.stringify(payload);

    // Create a new SVIX instance with your secret
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: any;

    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      });
    } catch (error: any) {
      return c.json("Error occured", {
        status: 400,
      });
    }

    // Get the ID and type
    const { id } = evt?.data;
    const eventType = evt?.type;

    switch (eventType) {
      case "user.created":
        try {
          const { data } = payload || {};
          if (!data) throw new Error("No payload data");

          const result = await userCreate({
            c,
            email: data.email_addresses?.[0]?.email_address,
            first_name: data.first_name,
            last_name: data.last_name,
            profile_image_url: data.profile_image_url,
            user_id: data.id,
          });

          return c.json(result);
        } catch (error: any) {
          console.error("Error creating user:", error);
          return c.json({ success: false, error: error.message }, 400);
        }

      // Uncomment and implement when needed
      case "user.updated":
        // Implementation for user update
        try {
          const { data } = payload || {};
          if (!data) throw new Error("No payload data");

          const result = await userUpdate({
            c,
            email: data.email_addresses?.[0]?.email_address,
            first_name: data.first_name,
            last_name: data.last_name,
            profile_image_url: data.profile_image_url,
            user_id: data.id,
          });

          return c.json(result);
        } catch (error: any) {
          console.error("Error creating user:", error);
          return c.json({ success: false, error: error.message }, 400);
        }
      default:
        return c.json(
          {
            success: true,
            message: "Unhandled event type",
            eventType,
          },
          200
        );
    }
  });

const userCreate = async ({
  c,
  email,
  first_name,
  last_name,
  profile_image_url,
  user_id,
}: {
  c: any;
  email: string;
  first_name: string;
  last_name: string;
  profile_image_url: string;
  user_id: string;
}) => {
  try {
    const client = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = drizzle(client);

    await db.insert(users).values({
      email,
      first_name,
      last_name,
      profile_image_url,
      user_id,
    });

    return {
      success: true,
      message: "Church created successfully",
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

const userUpdate = async ({
  c,
  email,
  first_name,
  last_name,
  profile_image_url,
  user_id,
}: {
  c: any;
  email: string;
  first_name: string;
  last_name: string;
  profile_image_url: string;
  user_id: string;
}) => {
  try {
    const client = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = drizzle(client);

    await db
      .update(users)
      .set({
        email,
        first_name,
        last_name,
        profile_image_url,
        user_id,
      })
      .where(eq(users.user_id, user_id));

    return {
      success: true,
      message: "User updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

// Serve static assets first
app.use("*", serveStatic({ root: "./frontend/dist" }));
app.use("*", serveStatic({ root: "./frontend/dist/index.html" }));

export type AppType = typeof apiRoutes;

export default app;
