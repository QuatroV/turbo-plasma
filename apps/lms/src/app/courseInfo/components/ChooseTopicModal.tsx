import { type FormEventHandler } from "react";
import dynamic from "next/dynamic";
import { MdTopic } from "react-icons/md";

import { api } from "~/utils/api";
import clsxm from "~/utils/clsxm";
import useCourseStore from "~/stores/courseStore";
import useTopicStore from "~/stores/topicStore";
import { COLORS } from "../constants/topics";

const Modal = dynamic(() => import("../../../components/Modal"), {
  ssr: false,
});

const ChooseTopicModal = () => {
  const currentCourse = useCourseStore((state) => state.currentCourse);
  const setCurrentCourse = useCourseStore((state) => state.setCurrentCourse);
  const isOpen = useTopicStore((state) => state.chooseTopicModalOpen);
  const setIsOpen = useTopicStore((state) => state.setChooseTopicModalOpen);
  const topics = useTopicStore((state) => state.topics);
  const chosenLessonsIds = useCourseStore((state) => state.chosenLessonsIds);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  const chooseTopicMutation = api.course.changeTopic.useMutation();

  const handleChooseTopic = (topicId: string) => async () => {
    if (!currentCourse?.id) return;
    const updatedCourse = await chooseTopicMutation.mutateAsync({
      courseId: currentCourse?.id,
      lessonIds: chosenLessonsIds,
      topicId,
    });

    if (updatedCourse) {
      setCurrentCourse(updatedCourse);
    }
  };

  return (
    <Modal open={isOpen} setOpen={setIsOpen}>
      <div className="flex w-72 flex-col gap-3 text-sm">
        <div className="flex items-center gap-2 text-base font-black">
          <div className=" h-[40px] w-fit rounded-full bg-white p-1 drop-shadow">
            <MdTopic className="p-1" size={32} />
          </div>
          <div>
            <div>Choose topic</div>
            <div className="text-xs font-normal text-gray-600">
              in {currentCourse?.name}
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex max-h-60 flex-col gap-1">
          {topics.map((topic) => (
            <div
              key={topic.id}
              onClick={handleChooseTopic(topic.id)}
              className={clsxm(
                COLORS[topic.color],
                "w-full cursor-pointer rounded border px-2 py-1 transition-all active:scale-95 active:brightness-90",
              )}
            >
              {topic.name}
            </div>
          ))}
        </form>
      </div>
    </Modal>
  );
};

export default ChooseTopicModal;
