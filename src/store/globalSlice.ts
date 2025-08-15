import type { StateCreator } from "zustand";
import type { StoreState } from "./type";

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

export interface GlobalSlice {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const createGlobalSlice: StateCreator<
  StoreState,
  [],
  [],
  GlobalSlice
> = (set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
  },
});
