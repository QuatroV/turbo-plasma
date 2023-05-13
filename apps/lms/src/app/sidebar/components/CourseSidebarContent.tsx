import usePagesStore from "~/stores/pageStore";
import SidebarHeader from "./CourseSidebarHeader";
import LessonSidebarCourseContent from "./LessonSidebarCourseContent";
import LessonSidebarLessonContent from "./LessonSidebarLessonContent";
import LessonSidebarPeopleContent from "./LessonSidebarPeopleContent";

const LESSON_SIDEBAR_CONTENTS = {
  lesson: <LessonSidebarLessonContent />,
  course: <LessonSidebarCourseContent />,
  people: <LessonSidebarPeopleContent />,
};

const CourseSidebarContent = () => {
  const lessonSubPage = usePagesStore((state) => state.lessonSubPage);
  return (
    <div className="h-full overflow-hidden">
      <SidebarHeader />
      {LESSON_SIDEBAR_CONTENTS[lessonSubPage]}
    </div>
  );
};

export default CourseSidebarContent;
