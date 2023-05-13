import { FaUserAlt } from "react-icons/fa";
import useCourseStore from "~/stores/courseStore";
import LessonSidebarPeopleItems from "./LessonSidebarPeopleItems";

const LessonSidebarPeopleContent = () => {
  const courseUsers = useCourseStore((state) => state.users);

  const owners = courseUsers
    .filter((el) => el.courseRole === "OWNER")
    .map((el) => el.user);
  const moderators = courseUsers
    .filter((el) => el.courseRole === "MODERATOR")
    .map((el) => el.user);
  const students = courseUsers
    .filter((el) => el.courseRole === "LISTENER")
    .map((el) => el.user);

  return (
    <div className="scrollbar h-full flex-1 overflow-auto">
      <LessonSidebarPeopleItems items={owners} title="Owners" />
      <LessonSidebarPeopleItems items={moderators} title="Moderators" />
      <LessonSidebarPeopleItems items={students} title="Students" />
    </div>
  );
};

export default LessonSidebarPeopleContent;
