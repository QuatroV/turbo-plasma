import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { type SolutionForClient } from "@plasma/api/src/routers/task";

interface solutionState {
  solutions?: SolutionForClient[];
  setSolutions: (solutions: SolutionForClient[]) => void;

  changeMark: (id: string, mark: number) => void;

  forceRerender: boolean;
  toggleForceRerender: () => void;
}

const useSolutionStore = create<solutionState>()(
  devtools((set) => ({
    solutions: [],
    setSolutions: (solutions) => set({ solutions }),

    changeMark: (id: string, mark: number) =>
      set((state) => {
        if (!state.solutions) return state;

        const index = state.solutions.findIndex((s) => s.id === id);
        if (index === -1) return state;

        const solution = state.solutions[index];

        if (!solution) return state;

        solution.mark = mark;

        return state;
      }),

    forceRerender: false,
    toggleForceRerender: () =>
      set((state) => ({ forceRerender: !state.forceRerender })),
  })),
);
export default useSolutionStore;
