import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SizeSelectorProps {
  selectedSize: string;
  sizes: string[];
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ selectedSize, sizes }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <span className="uppercase text-sm block mb-2">Size</span>
      <button
        className="w-full flex items-center justify-between border border-gray-300 px-3 py-1.5 bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedSize}</span>
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 shadow-sm">
          {sizes.map((size) => (
            <button
              key={size}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              {size}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SizeSelector;