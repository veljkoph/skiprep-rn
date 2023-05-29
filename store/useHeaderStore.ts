import { create } from "zustand";

interface HeaderStore {
  header: boolean | null;
  setHeader: (drawer: boolean | null) => void;
}

const useHeaderStore = create<HeaderStore>((set) => ({
  header: true,
  setHeader: (header) => set({ header }),
}));

export default useHeaderStore;
