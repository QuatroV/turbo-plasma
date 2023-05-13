import { GrAdd } from "react-icons/gr";
import { IoSchool } from "react-icons/io5";
import Button from "~/components/Button";
import useCourseStore from "~/stores/courseStore";
import CourseInfoLesson from "./CourseInfoLesson";

const CourseInfoLessons = () => {
  const lessons = useCourseStore((state) => state.currentCourse?.lessons);
  const editMode = useCourseStore((state) => state.editMode);
  const setAddLessonModalOpen = useCourseStore(
    (state) => state.setAddLessonModalOpen
  );

  return (
    <div className="flex-1">
      <div className="flex items-center gap-2 rounded-t-xl bg-white p-2 font-bold shadow">
        <IoSchool size={16} />
        Lessons
      </div>

      <div className="bg-glass flex flex-initial flex-col items-start gap-2 rounded-b-xl p-2 text-sm">
        {editMode ? (
          <Button
            onClick={() => setAddLessonModalOpen(true)}
            className="flex items-center gap-2 py-1"
          >
            <GrAdd />
            Add Lesson
          </Button>
        ) : null}
        <div className="w-full">
          {lessons?.length ? (
            lessons.map((lesson, idx) => (
              <CourseInfoLesson
                key={lesson.id}
                index={idx + 1}
                lesson={lesson}
                first={idx === 0}
                last={idx === lessons.length - 1}
              />
            ))
          ) : (
            <div className="italic text-gray-500">
              No lessons added to the course
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseInfoLessons;
