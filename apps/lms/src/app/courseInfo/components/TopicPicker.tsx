import { BsCheckCircleFill } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import { MdCancel } from "react-icons/md";

import { api } from "~/utils/api";
import clsxm from "~/utils/clsxm";
import useCourseStore from "~/stores/courseStore";
import useTopicStore from "~/stores/topicStore";
import { COLORS } from "../constants/topics";

const TopicPicker = () => {
  const editMode = useCourseStore((state) => state.editMode);
  const topics = useTopicStore((state) => state.topics);

  const currentTopic = useTopicStore((state) => state.currentTopic);
  const setCurrentTopic = useTopicStore((state) => state.setCurrentTopic);
  const setCreateTopicModalOpen = useTopicStore(
    (state) => state.setCreateTopicModalOpen,
  );
  const removeTopicById = useTopicStore((state) => state.removeTopicById);

  const deleteTopicMutation = api.course.deleteTopic.useMutation();

  const handleChooseTopic = (id?: string) => () => {
    setCurrentTopic(id);
  };

  const handleDeleteTopic = (id: string) => async () => {
    await deleteTopicMutation.mutateAsync({ topicId: id });
    removeTopicById(id);
  };

  const handleAddTopic = () => {
    setCreateTopicModalOpen(true);
  };

  return (
    <div className="scrollbar-invisible flex min-w-0 max-w-full flex-shrink gap-1 overflow-x-auto">
      {editMode ? (
        <div
          onClick={handleAddTopic}
          className="flex cursor-pointer items-center gap-1 whitespace-pre rounded-full border bg-white px-2 py-0.5 active:shadow-inner active:brightness-90"
        >
          <GrAdd size={16} />
          Add topic
        </div>
      ) : (
        <div
          onClick={handleChooseTopic(undefined)}
          className={clsxm(
            "relative flex cursor-pointer items-center gap-1 whitespace-pre rounded-full border bg-white px-2 py-0.5 active:shadow-inner active:brightness-90",
          )}
        >
          All
          {!currentTopic && !editMode && (
            <BsCheckCircleFill
              size={18}
              className=" right-0 top-0 rounded-full border border-white bg-white text-blue-500"
            />
          )}
        </div>
      )}
      {topics &&
        topics?.map((el) => (
          <div
            key={el.id}
            onClick={handleChooseTopic(el.id)}
            className={clsxm(
              COLORS[el.color],
              "flex cursor-pointer items-center gap-1 whitespace-pre rounded-full border  px-2 py-0.5 active:shadow-inner active:brightness-90",
            )}
          >
            {el.name}
            {editMode && (
              <MdCancel onClick={handleDeleteTopic(el.id)} size={20} />
            )}
            {currentTopic === el.id && !editMode && (
              <BsCheckCircleFill
                size={18}
                className=" right-0 top-0 rounded-full border border-white bg-white text-blue-500"
              />
            )}
          </div>
        ))}
    </div>
  );
};

export default TopicPicker;
