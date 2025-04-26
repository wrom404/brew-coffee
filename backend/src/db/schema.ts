import { integer, pgTable, timestamp, varchar, text, decimal, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).default("customer").$type<"admin" | "customer">(),
  created_at: timestamp({ withTimezone: true }).defaultNow() // store date with timezone (timestampz)
});

export const products = pgTable('products', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  imageUrl: text('image_url'),
  category: varchar('category', { length: 50 }).notNull().default("espresso"),
  stockQuantity: integer('stock_quantity').default(0),
  isAvailable: boolean('is_available').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export const cartItems = pgTable('cart_items', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  userId: integer('user_id').notNull().references(() => users.id),  // Associate with user directly
  productId: integer('product_id').notNull().references(() => products.id),
  quantity: integer('quantity').notNull().default(1),
  size: varchar('size', { length: 20 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});
