import React from 'react';
import { cartProduct } from '@/types/types';

interface CartSummaryProps {
  cartItems: cartProduct[];
  showSelectionHint?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({ cartItems, showSelectionHint }) => {
  const subtotal = cartItems.reduce((total, item) => total += Number(item.amount), 0);
  const salesTax = subtotal * 0.025; // Example tax rate
  const total = subtotal + salesTax;

  return (
    <div className="bg-gray-50 p-6 md:p-8">
      <h2 className="text-xl uppercase tracking-wide font-bold">Total</h2>

      {showSelectionHint && (
        <p className="text-sm text-gray-600 mt-2">
          Showing total for selected items only
        </p>
      )}

      <div className="mt-6 space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span className="uppercase">{item.productName}</span>
            <span>₱{item.amount}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex justify-between">
          <span className="uppercase">Sales Tax</span>
          <span>{salesTax === 0 ? 'Included' : `₱${salesTax.toLocaleString()}`}</span>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex justify-between font-bold">
          <span className="uppercase">Total</span>
          <span>₱{total.toLocaleString()}</span>
        </div>
      </div>

      <button
        onClick={() => { console.log("products to check out: ", cartItems); console.log("total amount: ", total); }}
        className="w-full bg-amber-600 hover:bg-amber-700 cursor-pointer text-white py-3 px-4 mt-8 uppercase tracking-wide text-sm transition-colors duration-200"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartSummary;