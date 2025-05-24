import React from 'react';
import { X } from 'lucide-react';
import { cartProduct } from '@/types/types';
import QuantitySelector from './QuantitySelector';
import SizeSelector from './SizeSelector';

interface CartItemProps {
  item: cartProduct;
  toggleSelect: (params: cartProduct) => void;
  isSelected: boolean; // <-- new prop
}

const SIZES = ['S', 'M', 'L', 'XL']

const CartItem: React.FC<CartItemProps> = ({
  item,
  toggleSelect,
  isSelected
}) => {

  const getCleanImageUrl = (url: string) => {
    // Handle cases where URL might already be clean
    console.log("url: ", url)
    if (url.startsWith('product-')) return url;
    // Extract filename after last slash or 'products'
    const filename = url.split(/[\\/]/).pop() || url.split('products').pop() || url;
    // Remove any remaining 'products' prefix if present
    return filename.replace(/^products/, '');
  };

  const imageUrl = `http://localhost:4000/uploads/products/${getCleanImageUrl(item.productImage)}`;
  return (
    <div className="py-8 border-t border-gray-200 group">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4">
          <div className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden relative">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => toggleSelect(item)}
              className="absolute top-4 left-4 w-4 h-4 border-gray-300 rounded focus:ring-black z-10"
            />
            <img
              src={imageUrl}
              alt={item.productName}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="md:w-3/4 md:pl-8 mt-4 md:mt-0">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl md:text-2xl font-bold tracking-wide uppercase">{item.productName}</h2>
              <p className="text-gray-700 mt-1">₱{item.productPrice.toLocaleString()}</p>
            </div>
            <button
              // onClick={() => removeItem(item.id.toString())}
              className="text-gray-400 hover:text-black transition-colors p-1"
              aria-label="Remove item"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-6">
            <div>
              <SizeSelector
                selectedSize={item.size}
                sizes={SIZES}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-6 mt-6">
            <div className="">
              <QuantitySelector
                quantity={item.quantity}
              />
            </div>
            <div className="">
              <label htmlFor="" className='text-base font-normal mr-4'>Amount:</label>
              <label htmlFor="" className='text-lg font-semibold'>₱{item.amount}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;