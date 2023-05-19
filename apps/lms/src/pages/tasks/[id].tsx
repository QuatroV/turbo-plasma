import { useEffect } from "react";
import { type GetServerSidePropsContext, type NextPage } from "next";

import { api } from "~/utils/api";
import Solutions from "~/app/solutions/components/Solutions";
import TaskContent from "~/app/solutions/components/TaskContent";
import TaskHeader from "~/app/solutions/components/TaskHeader";
import useLessonStore from "~/stores/lessonStore";
import useSolutionStore from "~/stores/solutionStore";
import useTaskStore from "~/stores/taskStore";

type Props = {
  taskId: string;
};

const Task: NextPage<Props> = ({ taskId }) => {
  const setLesson = useLessonStore((state) => state.setLesson);
  const setTask = useTaskStore((state) => state.setTask);
  const setSolutions = useSolutionStore((state) => state.setSolutions);

  const taskPageInfo = api.task.shortInfo.useQuery({
    id: taskId,
  });

  useEffect(() => {
    if (taskPageInfo.data) {
      const { task, lesson, solutions } = taskPageInfo.data;
      setLesson({ ...lesson, tasks: [] });
      setTask(task);
      setSolutions(solutions);
    }
  }, [taskPageInfo.data]);

  return (
    <main className=" scrollbar font-rubik flex flex-auto flex-col gap-2 overflow-y-auto overflow-x-hidden p-2 ">
      <TaskHeader />
      <TaskContent />
      <Solutions />
    </main>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;

  const taskId = Array.isArray(params) && params ? params.join("") : params?.id;

  return { props: { taskId } };
}

export default Task;
