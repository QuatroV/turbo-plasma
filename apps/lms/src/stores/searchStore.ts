import { Prisma } from "@prisma/client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type SearchCourseInfo = Prisma.CourseGetPayload<{
  select: {
    id: true;
    name: true;
    private: true;
    CourseUser: {
      select: {
        user: {
          select: {
            name: true;
          };
        };
      };
    };
  };
}>;

interface searchState {
  searchResult: SearchCourseInfo[];
  setSearchResult: (searchResult: SearchCourseInfo[]) => void;

  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;

  popularCourses: SearchCourseInfo[];
  setPopularCourses: (popularCourses: SearchCourseInfo[]) => void;
}

const useSearchStore = create<searchState>()(
  devtools((set) => ({
    searchResult: [],
    setSearchResult(searchResult) {
      set({ searchResult });
    },

    searchQuery: "",
    setSearchQuery(searchQuery) {
      set({ searchQuery });
    },

    popularCourses: [],
    setPopularCourses(popularCourses) {
      set({ popularCourses });
    },
  }))
);

export default useSearchStore;
