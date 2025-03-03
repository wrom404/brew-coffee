import CardModal from "@/components/ui-components/CardModal";
import ProductCard from "@/components/ui-components/ProductCard";
import { mockMenuProducts } from "@/constants/products";
import { useState } from "react";

const Menu = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imageName, setImageName] = useState<string>('');
  return (
    <div
      className="min-h-screen flex justify-center items-center flex-col pt-6"
      id="menu"
    >
      <div className="text-gray-200 text-6xl font-black my-6"> Our Menu</div>
      <p className="text-gray-200 text-lg leading-7 tracking-wide w-[42rem] text-center mb-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, minus
        ab. Odio corrupti placeat magnam.
      </p>
      <div className="grid grid-cols-4 gap-12">
        {mockMenuProducts.map((product) => (
          <ProductCard setImageName={setImageName} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}  product={product} />
        ))}
      </div>
      <CardModal imageName={imageName} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <button className=" px-4 py-2 rounded-lg bg-(--fifth-color) text-gray-200 tracking-wide mt-8">Load more</button>
    </div>
  );
};

export default Menu;
