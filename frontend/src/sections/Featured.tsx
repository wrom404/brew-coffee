import ProductCard from "@/components/ui-components/ProductCard"
import { mockFeaturedProducts } from "@/constants/products"
import { type mockFeaturedProductType } from "@/types/types"

const Featured = () => {
  return (
    <div id="feature" className="min-h-96 flex justify-center flex-col gap-8">
      <h3 className="text-4xl text-gray-200 font-bold text-center">Our best seller products</h3>
      <div className="flex justify-center items-center gap-6">
        {mockFeaturedProducts.map((product : mockFeaturedProductType) => (
          <ProductCard product={product}  />
        ))}
      </div>
    </div>
  )
}

export default Featured