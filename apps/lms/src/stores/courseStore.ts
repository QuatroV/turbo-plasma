import { type Prisma } from "@prisma/client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type CourseInfo = Prisma.CourseGetPayload<{
  select: {
    id: true;
    name: true;
    shortInfo: true;
    private: true;
    lessons: {
      select: {
        id: true;
        name: true;
        content: true;
        meta: true;
        topicId: true;
      };
    };
  };
}>;

export type UserWithRole = Prisma.CourseUserGetPayload<{
  select: {
    courseRole: true;
    user: {
      select: {
        image: true;
        email: true;
        name: true;
        surname: true;
        role: true;
      };
    };
  };
}>;

interface courseState {
  currentCourse?: CourseInfo;
  setCurrentCourse(course: CourseInfo): void;

  currentCourseOwner?: UserWithRole;
  setCurrentCourseOwner(currentCourseOwner?: UserWithRole): void;

  joined?: boolean;
  setJoined(joined: boolean): void;

  isOwner: boolean;
  setIsOwner(isOwner: boolean): void;
  isModerator: boolean;
  setIsModerator(isModerator: boolean): void;

  editMode: boolean;
  setEditMode(editMode: boolean): void;

  editedCurrentCourse?: CourseInfo;
  setEditedCurrentCourse(editedCurrentCourse: CourseInfo): void;
  editField(changedFields: Partial<CourseInfo>): void;

  users: UserWithRole[];
  setUsers: (users: UserWithRole[]) => void;

  addLessonModalOpen: boolean;
  setAddLessonModalOpen: (addLessonModalOpen: boolean) => void;

  chosenLessonsIds: string[];
  setChosenLessonsIds: (chosenLessonsIds: string[]) => void;
}

const useCourseStore = create<courseState>()(
  devtools((set) => ({
    currentCourse: undefined,
    setCurrentCourse: (course) => {
      set({ currentCourse: course });
    },

    currentCourseOwner: undefined,
    setCurrentCourseOwner: (currentCourseOwner) =>
      set({
        currentCourseOwner,
      }),

    joined: false,
    setJoined: (joined) => set({ joined }),

    isOwner: false,
    setIsOwner: (isOwner) => set({ isOwner }),

    isModerator: false,
    setIsModerator: (isModerator) => set({ isModerator }),

    editMode: false,
    setEditMode: (editMode) => set({ editMode }),

    editedCurrentCourse: undefined,
    setEditedCurrentCourse: (editedCurrentCourse) =>
      set({ editedCurrentCourse }),
    editField: (changedFields) =>
      set((prevState) => {
        const prevStateEditedCourse = prevState.editedCurrentCourse;

        const newEditedCourseState = prevStateEditedCourse
          ? { ...prevStateEditedCourse, ...changedFields }
          : undefined;

        return {
          ...prevState,
          editedCurrentCourse: newEditedCourseState,
        };
      }),

    users: [],
    setUsers: (users) => set({ users }),

    addLessonModalOpen: false,
    setAddLessonModalOpen: (addLessonModalOpen) => set({ addLessonModalOpen }),

    chosenLessonsIds: [],
    setChosenLessonsIds: (chosenLessonsIds) => set({ chosenLessonsIds }),
  })),
);

export default useCourseStore;
