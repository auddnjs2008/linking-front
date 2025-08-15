//slices
import { create } from "zustand";

import type { StoreState } from "./type";
import { createGlobalSlice } from "./globalSlice";
import { createSelectors } from "./createSelector";

const baseStore = create<StoreState>()((...a) => ({
  ...createGlobalSlice(...a),
}));

// Auto Selector 적용된  최종 store
export const useBoundStore = createSelectors(baseStore);
