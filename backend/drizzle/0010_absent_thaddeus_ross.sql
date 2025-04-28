ALTER TABLE "orders" ADD COLUMN "payment_method" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "payment" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "message" text;