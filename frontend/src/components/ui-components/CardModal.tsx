// import { ModalType } from "@/types/types";

const CardModal = ({
  isModalOpen,
  setIsModalOpen,
  imageName,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  imageName: string;
}) => {
  if (!isModalOpen) return null; // Hide modal when closed
console.log(imageName)
  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center"
      onClick={() => setIsModalOpen(false)} // Close when clicking outside
    >
      <div
        className="w-[28rem] shadow-lg rounded-lg"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <img src={imageName} alt="image" />
      </div>
    </div>
  );
};

export default CardModal;
