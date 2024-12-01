// db/schema.ts
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  user_id: text("user_id").unique().notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  email: text("email").unique(),
  first_name: text("first_name"),
  last_name: text("last_name"),
  profile_image_url: text("profile_image_url"),
  role: text("role").default("admin"), // Could be 'admin', 'manager', etc.
});

export const items = pgTable("items", {
  id: text("id").primaryKey(),
  name: text("name"),
});
