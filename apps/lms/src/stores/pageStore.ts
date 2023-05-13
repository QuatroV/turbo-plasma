import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type Page = "search" | "course" | "lesson";

export type LessonSubPage = "lesson" | "course" | "people";

interface pagesState {
  currentPage: Page;
  setCurrentPage: (currentPage: Page) => void;

  lessonSubPage: LessonSubPage;
  setLessonSubPage: (lessonSubPage: LessonSubPage) => void;
}

const usePagesStore = create<pagesState>()(
  devtools((set) => ({
    currentPage: "search",
    setCurrentPage(currentPage) {
      set({ currentPage });
    },

    lessonSubPage: "lesson",
    setLessonSubPage: (lessonSubPage) => set({ lessonSubPage }),
  }))
);

export default usePagesStore;
