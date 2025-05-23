import { CheckCircle2, Minus, Plus, ShoppingCart, X } from "lucide-react"
import { Products } from "@/types/types"
import { sizes } from "@/constants/products";
import { useEffect, useState } from "react";

interface AddToCartModalProps {
  setCartModal: (isOpen: boolean) => void;
  product: Products[];
  handleAddToCartProduct: (productId: number, quantity: number, size: string, finalPrice: number) => void;
  isLoading?: boolean;
}

const AddToCartModal = ({
  setCartModal,
  product,
  handleAddToCartProduct,
  isLoading = false
}: AddToCartModalProps) => {
  const [selectedSize, setSelectedSize] = useState<string>('S');
  const [quantity, setQuantity] = useState<number>(1);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const [finalPrice, setFinalPrice] = useState<number>(0);

  // Get product data safely
  const currentProduct = product?.[0];
  const { name, id, description, price, isAvailable, imageUrl } = currentProduct || {};


  // Calculate price based on size
  useEffect(() => {
    const basePrice = parseFloat(price);
    let multiplier = 1;

    switch (selectedSize) {
      case 'M':
        multiplier = 1.5;
        break;
      case 'L':
        multiplier = 2;
        break;
      case 'XL':
        multiplier = 2.5;
        break;
      default: // 'S' or any other size
        multiplier = 1;
    }

    setFinalPrice(basePrice * multiplier);
  }, [price, selectedSize]);

  console.log("product: ", product)

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const getCleanImageUrl = (url: string) => {
    if (!url) return ''; // Return empty string if URL is undefined/null
    // Handle cases where URL might already be clean
    if (url.startsWith('product-')) return url; // this will cause an error Uncaught TypeError: Cannot read properties of undefined (reading 'startsWith'), I think because the first render the url is undefined and becasue the fetching is not done yet
    // Extract filename after last slash or 'products'
    const filename = url.split(/[\\/]/).pop() || url.split('products').pop() || url;
    // Remove any remaining 'products' prefix if present
    return filename.replace(/^products/, '');
  };

  const handleClickAddToCart = () => {
    if (!selectedSize) return;

    handleAddToCartProduct(id, quantity, selectedSize, finalPrice * quantity);
    setIsAddedToCart(true);

    setTimeout(() => {
      setIsAddedToCart(false);
      setCartModal(false);
    }, 2000);
  };

  const formattedImageUrl = `http://localhost:4000/uploads/products/${getCleanImageUrl(imageUrl)}`;

  if (isLoading) return <div className="...">Loading product details...</div>;
  if (!product || product.length === 0) return <div className="...">Product not found</div>;

  return (
    <div className="fixed h-screen w-full inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white lg:max-w-xl w-full lg:max-h-[500px] h-full max-w-lg max-h-80 p-4 rounded-lg overflow-y-auto">
        <div className="mb-3 flex justify-end">
          <X
            className="text-gray-500 cursor-pointer hover:text-gray-700"
            size={22}
            onClick={() => setCartModal(false)}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <img
                src={imageUrl ? formattedImageUrl : '/placeholder.jpg'}
                alt={name}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-gray-800 font-medium text-xl mb-2">{name}</h2>
              <h3 className="text-amber-600 font-bold text-2xl mb-2">₱{(finalPrice * quantity).toFixed(2)}</h3>
              <p className="text-gray-600 text-sm mb-2">{description}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm xl:text-base font-semibold text-gray-900 mb-3">Size</h3>
              <div className="grid grid-cols-4 gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 border rounded-lg text-sm font-medium transition-all cursor-pointer ${selectedSize === size
                      ? 'border-amber-600 bg-amber-600 text-white'
                      : 'border-gray-300 hover:border-gray-400 text-gray-700'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={decrementQuantity}
                    className="p-2 hover:bg-gray-100 transition-colors rounded-l-lg cursor-pointer"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 min-w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg cursor-pointer"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className={`text-sm ${isAvailable ? 'text-green-600' : 'text-red-600'
                  }`}>
                  {isAvailable ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClickAddToCart}
              disabled={!selectedSize || !isAvailable || isAddedToCart}
              className={`
                w-full py-3 px-4 rounded-lg font-medium transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer
                ${isAddedToCart
                  ? 'bg-emerald-600 text-white focus:ring-emerald-500'
                  : !selectedSize || !isAvailable
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-amber-600 text-white hover:bg-amber-700 focus:ring-amber-500'
                }
              `}
            >
              <span className="flex items-center justify-center">
                {isAddedToCart ? (
                  <>
                    <CheckCircle2 size={18} className="mr-2" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} className="mr-2" />
                    {!isAvailable ? 'Out of Stock' : 'Add to Cart'}
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddToCartModal