import { useRouter } from "next/router";
import { BsQuestionCircle } from "react-icons/bs";

import { type Prisma } from "@plasma/db";

import Button from "~/components/Button";
import useSolutionStore from "~/stores/solutionStore";

type Props = {
  task: Prisma.TaskGetPayload<{
    select: {
      id: true;
      content: true;
      name: true;
    };
  }>;
  isOwner: boolean;
  isModerator: boolean;
};
const LessonTask = ({ task, isOwner, isModerator }: Props) => {
  const router = useRouter();

  const solutionsForTaskCount = useSolutionStore(
    (state) =>
      state.solutions?.filter((solution) => solution.taskId === task.id).length,
  );

  return (
    <div className="flex flex-col gap-2 rounded border p-2">
      <div className="flex items-center gap-2 font-bold">
        <BsQuestionCircle />
        {task.name}
      </div>
      <div className="text-sm">{task.content}</div>
      {(isOwner || isModerator) && (
        <div className="flex gap-2">
          <Button className="border px-2 py-1 text-sm">Edit task</Button>
          <Button
            onClick={() => router.push(`/tasks/${task.id}`)}
            className="flex items-center gap-1 border px-2 py-1 text-sm"
          >
            Check solutions
            {solutionsForTaskCount ? (
              <div className="rounded-full bg-gray-300 px-1">
                {solutionsForTaskCount}
              </div>
            ) : null}
          </Button>
        </div>
      )}
    </div>
  );
};

export default LessonTask;
