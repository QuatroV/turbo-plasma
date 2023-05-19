import { useEffect } from "react";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
import useCourseStore from "~/stores/courseStore";
import useTopicStore from "~/stores/topicStore";
import CourseInfoHeader from "./CourseInfoHeader";
import CourseInfoLessons from "./CourseInfoLessons";
import CourseInfoPeople from "./CourseInfoPeople";
import CourseInfoShortInfo from "./CourseInfoShortInfo";

const CourseInfo = (): JSX.Element | null => {
  const currentCourse = useCourseStore((state) => state.currentCourse);
  const setCurrentCourse = useCourseStore((state) => state.setCurrentCourse);
  const setJoined = useCourseStore((state) => state.setJoined);
  const setIsOwner = useCourseStore((state) => state.setIsOwner);
  const editedCurrentCourse = useCourseStore(
    (state) => state.editedCurrentCourse,
  );
  const setEditedCurrentCourse = useCourseStore(
    (state) => state.setEditedCurrentCourse,
  );
  const setTopics = useTopicStore((state) => state.setTopics);
  const setUsers = useCourseStore((state) => state.setUsers);
  const setOwner = useCourseStore((state) => state.setCurrentCourseOwner);
  const setIsModerator = useCourseStore((state) => state.setIsModerator);

  const { data: session } = useSession();

  useEffect(() => {
    if (localStorage.getItem("lastOpenCourse")) {
      setCurrentCourse(
        JSON.parse(localStorage.getItem("lastOpenCourse") || ""),
      );
    }
  }, []);

  const courseQuery = api.course.shortInfo.useQuery(
    { userId: session?.user?.id || "", courseId: currentCourse?.id || "" },
    { enabled: !!currentCourse },
  );

  useEffect(() => {
    if (courseQuery.data) {
      const { courseUser, courseInfo } = courseQuery.data;

      if (!courseInfo) return;

      const { CourseUser: CourseUsers, ...rest } = courseInfo;

      setCurrentCourse(rest);

      if (!editedCurrentCourse) {
        setEditedCurrentCourse(rest);
      }
      setJoined(!!courseUser);

      setIsOwner(courseUser?.courseRole === "OWNER");
      setIsModerator(courseUser?.courseRole === "MODERATOR");
      setUsers(
        CourseUsers.map((courseUser) => ({
          user: courseUser.user,
          courseRole: courseUser.courseRole,
        })),
      );
      setTopics(rest.topics);
      setOwner(
        CourseUsers.find((courseUser) => courseUser.courseRole === "OWNER"),
      );
    }
  }, [courseQuery.data]);

  if (!currentCourse) {
    return null;
  }

  return (
    <main className="font-rubik scrollbar flex h-full min-w-0 flex-1 flex-col gap-2 overflow-y-auto p-2">
      <CourseInfoHeader item={currentCourse} />
      <CourseInfoShortInfo shortInfo={currentCourse.shortInfo} />
      <div className="flex flex-initial gap-2">
        <CourseInfoLessons />
        <CourseInfoPeople />
      </div>
    </main>
  );
};

export default CourseInfo;
