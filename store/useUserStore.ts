import { create } from "zustand";

interface UserStore {
  user: string | null;
  setUser: (user: string | null) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useUserStore;
