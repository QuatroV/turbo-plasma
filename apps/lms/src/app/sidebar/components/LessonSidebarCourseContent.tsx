import Link from "next/link";
import { FiBookmark } from "react-icons/fi";
import useCourseStore from "~/stores/courseStore";

const LessonSidebarCourseContent = () => {
  const lessons = useCourseStore((state) => state.currentCourse?.lessons);
  return (
    <div className="mt-1">
      {lessons?.map((lesson) => (
        <Link href={`/lessons/${lesson.id}`} key={lesson.id}>
          <div className="relative flex cursor-pointer items-center gap-2 py-1 px-2 text-sm hover:bg-gray-300 active:shadow-inner">
            <FiBookmark /> {lesson.name}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default LessonSidebarCourseContent;
