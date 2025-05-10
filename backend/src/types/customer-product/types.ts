export type OrderedProductType = {
  userId: number; // cascade means when the parent record is deleted, the child records will be automatically deleted too.
  productId: number;
  quantity: number;
  size: string | null;
  amount: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}