import clsxm from "~/utils/clsxm";
import useCourseStore from "~/stores/courseStore";
import useLessonStore from "~/stores/lessonStore";
import LessonTask from "./LessonTask";
import LessonTasksMenubar from "./LessonTasksMenubar";

type Props = {
  isOpen: boolean;
};

const LessonTasksContent = ({ isOpen }: Props) => {
  const tasks = useLessonStore((state) => state.lesson?.tasks);

  const isOwner = useCourseStore((state) => state.isOwner);
  const isModerator = useCourseStore((state) => state.isModerator);
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
          <LessonTask
            key={idx}
            task={task}
            isOwner={isOwner}
            isModerator={isModerator}
          />
        ))}
      </div>
    </div>
  );
};

export default LessonTasksContent;
