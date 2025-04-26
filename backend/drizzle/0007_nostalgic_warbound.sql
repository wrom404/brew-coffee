ALTER TABLE "cart_items" ALTER COLUMN "amount" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "cart_items" ALTER COLUMN "amount" DROP DEFAULT;