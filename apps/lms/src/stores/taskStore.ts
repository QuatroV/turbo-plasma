import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { type Prisma } from "@plasma/db";

export type Task = Prisma.TaskGetPayload<{
  select: {
    lessonId: true;
    content: true;
    id: true;
    name: true;
    expectedResult: true;
  };
}>;

interface taskState {
  task?: Task;
  setTask: (task: Task) => void;
}

const useTaskStore = create<taskState>()(
  devtools((set) => ({
    task: undefined,
    setTask: (task: Task) => set({ task }),
  })),
);

export default useTaskStore;
