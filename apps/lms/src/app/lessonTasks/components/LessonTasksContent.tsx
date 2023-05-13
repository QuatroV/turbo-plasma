import { BsQuestionCircle } from "react-icons/bs";
import Button from "~/components/Button";
import useLessonStore from "~/stores/lessonStore";
import clsxm from "~/utils/clsxm";
import LessonTasksMenubar from "./LessonTasksMenubar";

type Props = {
  isOpen: boolean;
};

const LessonTasksContent = ({ isOpen }: Props) => {
  const tasks = useLessonStore((state) => state.lesson?.tasks);
  return (
    <div
      className={clsxm(
        "bg-glass rounded-lg transition-all",
        isOpen ? "visible" : "hidden "
      )}
    >
      <LessonTasksMenubar />
      <div className="flex flex-col gap-2 rounded-b-lg bg-white p-4">
        {tasks?.map((task) => (
          <div className="flex flex-col gap-2 rounded border p-2">
            <div className="flex items-center gap-2 font-bold">
              <BsQuestionCircle />
              {task.name}
            </div>
            <div className="text-sm">{task.content}</div>
            <div className="flex gap-2">
              <Button className="border px-2 py-1 text-sm">
                Check solution
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonTasksContent;
