import { create } from 'zustand';

interface User {
  currentUserId: number,
  setCurrentUserId: (userId: number) => void;
}

const useUser = create<User>((set) => ({
  currentUserId: 0,
  setCurrentUserId: (userId: number) => set(({ currentUserId: userId }))
}))

export default useUser