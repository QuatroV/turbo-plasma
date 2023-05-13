import { GetServerSidePropsContext, type NextPage } from "next";
import { useEffect } from "react";
import LessonComments from "~/app/lessonComments/components/LessonComments";
import LessonInfo from "~/app/lessonInfo/components/LessonInfo";
import LessonTasks from "~/app/lessonTasks/components/LessonTasks";
import useCourseStore from "~/stores/courseStore";
import useLessonStore from "~/stores/lessonStore";
import usePagesStore from "~/stores/pageStore";
import { api } from "~/utils/api";

type Props = {
  lessonId: string;
};

const Lesson: NextPage<Props> = ({ lessonId }) => {
  const setLesson = useLessonStore((state) => state.setLesson);

  const setCurrentPage = usePagesStore((state) => state.setCurrentPage);
  const setCurrentCourse = useCourseStore((state) => state.setCurrentCourse);
  const setUsers = useCourseStore((state) => state.setUsers);

  useEffect(() => setCurrentPage("course"));

  const lessonQuery = api.lesson.show.useQuery({ lessonId });

  useEffect(() => {
    if (lessonQuery.data) {
      const { lesson, course } = lessonQuery.data;
      if (course) {
        setUsers(
          course.CourseUser.map((courseUser) => ({
            user: courseUser.user,
            courseRole: courseUser.courseRole,
          }))
        );
        setCurrentCourse(course);
      }

      setLesson(lesson);
    }
  }, [lessonQuery.data]);

  return (
    <main className=" scrollbar flex flex-auto flex-col gap-2 overflow-auto p-2 font-rubik">
      <LessonInfo />
      <LessonTasks />
      <LessonComments />
    </main>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;

  const lessonId =
    Array.isArray(params) && params ? params.join("") : params?.id;

  return { props: { lessonId } };
}

export default Lesson;
