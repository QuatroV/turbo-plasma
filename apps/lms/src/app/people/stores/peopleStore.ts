import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { type Prisma } from "@plasma/db";

export type PeopleType = Prisma.UserGetPayload<{}> & {
  courseRole: Prisma.CourseUserGetPayload<{}>["courseRole"];
  score: number;
};

interface peopleState {
  people: PeopleType[];
  setPeople: (people: PeopleType[]) => void;
}

const usePeopleStore = create<peopleState>()(
  devtools((set) => ({
    people: [],
    setPeople: (people) => set({ people }),
  })),
);

export default usePeopleStore;
