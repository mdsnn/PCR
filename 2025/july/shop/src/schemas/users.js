// schema/users.js
import { pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  email: varchar("email").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
