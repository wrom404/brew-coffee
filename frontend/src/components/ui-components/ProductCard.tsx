import { CiHeart } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { ProductCardType } from "@/types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

const ProductCard = ({
  product,
  setIsModalOpen = () => {},
  isModalOpen,
  setImageName = () => {},
}: ProductCardType) => {
  const handleClick = (imageName: string) => {
    setImageName(imageName);
    setIsModalOpen(!isModalOpen);
  };

  console.log("image name:" + product.image);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Start slightly lower
      whileInView={{ opacity: 1, y: 0 }} // Move up smoothly
      transition={{
        duration: 0.4,
        ease: "easeInOut",
        delay: product.id * 0.05,
      }} // Faster animation
      viewport={{ amount: 0.1, once: true }} // Triggers when 30% of the card is visible
    >
      <Card className="bg-(--secondary-color) text-gray-200 border-none rounded-none rounded-br-4xl rounded-tl-4xl">
        <div
          onClick={() => handleClick(product.image)}
          className="w-60 overflow-hidden rounded-tl-4xl"
        >
          <img
            className="rounded-tl-xl hover:scale-105 transition-transform cursor-pointer"
            src={product.image}
            alt="img"
          />
        </div>
        <CardHeader>
          <CardTitle className="tracking-wide">{product.name}</CardTitle>
          <CardDescription className="text-xl text-(--quaternary-color)">
            {product.price}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-end gap-3">
          <CiHeart
            className="cursor-pointer hover:scale-125 hover:text-(--fifth-color) transition-transform"
            size={24}
          />
          <GoPlus
            className="cursor-pointer hover:scale-125 hover:text-(--fifth-color) transition-transform"
            size={24}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
