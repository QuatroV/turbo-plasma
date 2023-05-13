import { Prisma } from "@prisma/client";
import Link from "next/link";
import { MouseEventHandler } from "react";
import { FiEdit2 } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import useCourseStore from "~/stores/courseStore";
import { api } from "~/utils/api";
import clsxm from "~/utils/clsxm";

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
};

const CourseInfoLesson = ({ lesson, first, last, index }: Props) => {
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
      lessonId: lesson.id,
      courseId: courseId || "",
    });

    if (!updatedCourse) return;

    setCurrentCourse(updatedCourse);
  };

  return (
    <Link
      href={`/lessons/${lesson.id}`}
      className={clsxm(
        "flex cursor-pointer justify-between gap-2 bg-white p-2 active:bg-gray-100 active:shadow-inner",
        last && "rounded-b-lg",
        first && "rounded-t-lg",
        !last && "border-b border-gray-300"
      )}
    >
      <div className="flex items-center gap-1">
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
    </Link>
  );
};

export default CourseInfoLesson;
