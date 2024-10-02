import { create } from "zustand";

interface MouseState {
  mouseState: boolean;
  setMouseState: (x: boolean) => void;
}

const useMouseStore = create<MouseState>((set) => ({
  mouseState: false,
  setMouseState: (x: boolean) => set({ mouseState: x }),
}));

export default useMouseStore;
