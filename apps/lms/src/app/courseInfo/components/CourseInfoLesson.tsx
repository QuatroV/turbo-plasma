import { type MouseEventHandler } from "react";
import { useRouter } from "next/router";
import { type Prisma } from "@prisma/client";
import { BsCheckCircleFill } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";

import { api } from "~/utils/api";
import clsxm from "~/utils/clsxm";
import useCourseStore from "~/stores/courseStore";

type Props = {
  index: number;
  first: boolean;
  last: boolean;
  lesson: Prisma.LessonGetPayload<{
    select: {
      id: true;
      name: true;
      content: true;
    };
  }>;
  onSelect: () => void;
  selected: boolean;
  onDeselect: () => void;
};

const CourseInfoLesson = ({
  lesson,
  first,
  last,
  index,
  onSelect,
  onDeselect,
  selected,
}: Props) => {
  const editMode = useCourseStore((state) => state.editMode);
  const courseId = useCourseStore((state) => state.currentCourse?.id);
  const setCurrentCourse = useCourseStore((state) => state.setCurrentCourse);

  const deleteLessonMutation = api.lesson.delete.useMutation();

  const handleEdit: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  const handleDelete: MouseEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    const updatedCourse = await deleteLessonMutation.mutateAsync({
      lessonIds: [lesson.id],
      courseId: courseId || "",
    });

    if (!updatedCourse) return;

    setCurrentCourse(updatedCourse);
  };

  const router = useRouter();

  return (
    <div
      onClick={
        !editMode ? () => router.push(`/lessons/${lesson.id}`) : undefined
      }
      className={clsxm(
        "flex cursor-pointer justify-between gap-2 bg-white p-2 ",
        !editMode && "active:bg-gray-100 active:shadow-inner",
        last && "rounded-b-lg",
        first && "rounded-t-lg",
        !last && "border-b border-gray-300",
      )}
    >
      <div className="flex items-center gap-1">
        {editMode && selected && (
          <BsCheckCircleFill
            className="text-blue-500"
            onClick={onDeselect}
            size={24}
          />
        )}
        {editMode && !selected && (
          <div onClick={onSelect} className="h-6 w-6 rounded-full  border" />
        )}
        <div>{index}</div>
        <div className="flex items-center text-sm">{lesson.name}</div>
      </div>
      {editMode && (
        <div className="flex gap-2">
          <div
            className="flex items-center gap-1 rounded-lg border border-blue-500 px-2 py-1 text-xs active:bg-blue-200 active:shadow-inner"
            onClick={handleEdit}
          >
            <FiEdit2 className="text-blue-500" size={20} />
            <span className="hidden lg:inline">Edit</span>
          </div>
          <div
            className="flex items-center gap-1 rounded-lg border border-red-500 px-2 py-1 text-xs active:bg-red-200 active:shadow-inner"
            onClick={handleDelete}
          >
            <HiOutlineTrash className="text-red-500" size={20} />
            <span className="hidden lg:inline">Delete </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseInfoLesson;
