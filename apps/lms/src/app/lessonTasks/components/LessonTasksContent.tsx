import { useRouter } from "next/router";
import { BsQuestionCircle } from "react-icons/bs";

import clsxm from "~/utils/clsxm";
import Button from "~/components/Button";
import useCourseStore from "~/stores/courseStore";
import useLessonStore from "~/stores/lessonStore";
import LessonTasksMenubar from "./LessonTasksMenubar";

type Props = {
  isOpen: boolean;
};

const LessonTasksContent = ({ isOpen }: Props) => {
  const tasks = useLessonStore((state) => state.lesson?.tasks);

  const isOwner = useCourseStore((state) => state.isOwner);
  const isModerator = useCourseStore((state) => state.isModerator);

  const router = useRouter();

  return (
    <div
      className={clsxm(
        "bg-glass rounded-lg transition-all",
        isOpen ? "visible" : "hidden ",
      )}
    >
      <LessonTasksMenubar />
      <div className="flex flex-col gap-2 rounded-b-lg bg-white p-4">
        {tasks?.map((task, idx) => (
          <div key={idx} className="flex flex-col gap-2 rounded border p-2">
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
                  <div className="rounded-full bg-gray-300 px-1">5</div>
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonTasksContent;
