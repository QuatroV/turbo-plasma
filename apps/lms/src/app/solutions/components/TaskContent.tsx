import useTaskStore from "~/stores/taskStore";

const TaskContent = () => {
  const content = useTaskStore((state) => state.task?.content);
  return <div className="rounded-xl bg-white p-2">{content}</div>;
};

export default TaskContent;
