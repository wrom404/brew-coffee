import React from 'react';

interface QuantitySelectorProps {
  quantity: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity }) => {
  return (
    <div className="flex items-center">
      <span className="uppercase text-sm mr-4">Quantity</span>
      <div className="flex items-center border border-gray-300">
        <button
          className="px-3 py-1 hover:bg-gray-100 transition-colors"
          aria-label="Decrease quantity"
        >
          -
        </button>

        <span className="px-3 py-1 min-w-[2rem] text-center">{quantity}</span>

        <button
          className="px-3 py-1 hover:bg-gray-100 transition-colors"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;