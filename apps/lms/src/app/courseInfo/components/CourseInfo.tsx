import useCourseStore from "~/stores/courseStore";
import CourseInfoHeader from "./CourseInfoHeader";
import CourseInfoShortInfo from "./CourseInfoShortInfo";
import CourseInfoLessons from "./CourseInfoLessons";
import CourseInfoPeople from "./CourseInfoPeople";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const CourseInfo = (): JSX.Element | null => {
  const currentCourse = useCourseStore((state) => state.currentCourse);
  const setCurrentCourse = useCourseStore((state) => state.setCurrentCourse);
  const setJoined = useCourseStore((state) => state.setJoined);
  const setIsOwner = useCourseStore((state) => state.setIsOwner);
  const editedCurrentCourse = useCourseStore(
    (state) => state.editedCurrentCourse
  );
  const setEditedCurrentCourse = useCourseStore(
    (state) => state.setEditedCurrentCourse
  );
  const setUsers = useCourseStore((state) => state.setUsers);
  const setOwner = useCourseStore((state) => state.setCurrentCourseOwner);

  const { data: session } = useSession();

  const courseQuery = api.course.shortInfo.useQuery(
    { userId: session?.user?.id || "", courseId: currentCourse?.id || "" },
    { enabled: !!currentCourse }
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
      setUsers(
        CourseUsers.map((courseUser) => ({
          user: courseUser.user,
          courseRole: courseUser.courseRole,
        }))
      );
      setOwner(
        CourseUsers.find((courseUser) => courseUser.courseRole === "OWNER")
      );
    }
  }, [courseQuery.data]);

  if (!currentCourse) {
    return null;
  }

  return (
    <main className="flex h-full flex-1 flex-col gap-2 p-2 font-rubik">
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
