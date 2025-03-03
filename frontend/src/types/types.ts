export type ProductCardType = {
  product: {
    id: number,
  name: string,
  price: string,
  image: string
  },
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>,
  isModalOpen?: boolean,
  setImageName?: React.Dispatch<React.SetStateAction<string>>,
}

export type mockFeaturedProductType = {
  id: number,
  name: string,
  price: string,
  image: string
}

export type ModalType = {
  isModalOpen: boolean,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>; // use for updating state variable
}

// Define TypeScript type for coordinates
export type CoordinatesType = {
  lat: number;
  lng: number;
};
