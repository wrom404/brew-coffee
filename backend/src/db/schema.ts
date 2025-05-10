import { integer, pgTable, timestamp, varchar, text, decimal, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).default("customer").$type<"admin" | "customer">(),
  created_at: timestamp({ withTimezone: true }).defaultNow(), // store date with timezone (timestampz)
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
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
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
})

export const cartItems = pgTable('cart_items', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: "cascade" }),  // cascade means when the parent record is deleted, the child records will be automatically deleted too.
  productId: integer('product_id').notNull().references(() => products.id, { onDelete: "cascade" }),
  quantity: integer('quantity').notNull().default(1),
  size: varchar('size', { length: 20 }),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});
// orders Table: This table represents a single, complete transaction or purchase made by a user. It contains information that is relevant to the entire order as a whole. Think of it as the "receipt" or the "header" of the purchase.
export const orders = pgTable("orders", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull(), // example: Pending, Preparing, delivering, Delivered, Completed, Cancelled
  paymentMethod: varchar('payment_method', { length: 50 }).notNull(),
  payment: decimal("payment", { precision: 10, scale: 2 }),
  message: text("message"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// order_items Table: This table represents the individual products that were included within a specific order. An order can contain multiple items, each with its own details. Think of these as the individual lines on the receipt.
export const orderItems = pgTable("order_items", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  orderId: integer("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  productId: integer("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull().default(1),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  size: varchar("size", { length: 20 }), // optional, if your products have size (small/medium/large)
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});