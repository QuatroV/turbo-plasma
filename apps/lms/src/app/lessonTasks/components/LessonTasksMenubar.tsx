import Button from "~/components/Button";
import useTaskStore from "../stores/tasksStore";

const LessonTasksMenubar = () => {
  const setIsTaskModalOpen = useTaskStore((state) => state.setIsTaskModalOpen);

  const handleClick = () => {
    setIsTaskModalOpen(true);
  };

  return (
    <div className="flex p-2">
      <Button className="py-1 text-sm" onClick={handleClick}>
        Add Task
      </Button>
    </div>
  );
};

export default LessonTasksMenubar;
