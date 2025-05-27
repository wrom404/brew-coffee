import React from 'react';
import { cartProduct } from '@/types/types';

interface CartSummaryProps {
  cartItems: cartProduct[];
  showSelectionHint?: boolean;
  paymentMethod: string;
  setPaymentMethod: (params: string) => void;
  message: string;
  setMessage: (params: string) => void;
  handleSubmit: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ cartItems, showSelectionHint, paymentMethod, setPaymentMethod, message, setMessage, handleSubmit }) => {
  const total = cartItems.reduce((total, item) => total += Number(item.amount), 0);

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
        <div className="flex justify-between items-center">
          <span className="uppercase">payment method</span>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className='border border-gray-300 px-3 py-1 text-sm' name="payment_method" id="payment_method">
            <option value="CoD">CoD</option>
            <option value="Credit/Debit_Cards">Credit/Debit Cards</option>
            <option value="PayPal">PayPal</option>
          </select>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Message here...' className='border border-gray-300 rounded-lg w-full p-3' name="" id=""></textarea>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex justify-between font-bold">
          <span className="uppercase">Total</span>
          <span>₱{total.toLocaleString()}</span>
        </div>
      </div>

      <button
        onClick={() => handleSubmit()}
        className="w-full bg-amber-600 hover:bg-amber-700 cursor-pointer text-white py-3 px-4 mt-8 uppercase tracking-wide text-sm transition-colors duration-200"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartSummary;