import { create } from "zustand";

interface UserStore {
  drawer: boolean | null;
  setDrawer: (drawer: boolean | null) => void;
}

const useDrawerStore = create<UserStore>((set) => ({
  drawer: false,
  setDrawer: (drawer) => set({ drawer }),
}));

export default useDrawerStore;
