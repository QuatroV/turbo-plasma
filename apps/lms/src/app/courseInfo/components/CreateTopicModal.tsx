import {
  useState,
  type ChangeEventHandler,
  type FormEventHandler,
} from "react";
import dynamic from "next/dynamic";
import { MdTopic } from "react-icons/md";

import { api } from "~/utils/api";
import Button from "~/components/Button";
import Input from "~/components/Input";
import useCourseStore from "~/stores/courseStore";
import useTopicStore from "~/stores/topicStore";
import TopicColorPicker from "./TopicColorPicker";

const Modal = dynamic(() => import("../../../components/Modal"), {
  ssr: false,
});

const CreateTopicModal = () => {
  const currentCourse = useCourseStore((state) => state.currentCourse);
  const isOpen = useTopicStore((state) => state.createTopicModalOpen);
  const setIsOpen = useTopicStore((state) => state.setCreateTopicModalOpen);

  const addTopic = useTopicStore((state) => state.addTopic);

  const createTopicMutation = api.course.createNewTopic.useMutation();

  const [lessonName, setLessonName] = useState("");
  const [color, setColor] = useState("yellow");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setLessonName(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!currentCourse) return;
    const newTopic = {
      courseId: currentCourse?.id,
      name: lessonName,
      color,
    };
    const topic = await createTopicMutation.mutateAsync(newTopic);
    setIsOpen(false);
    addTopic(topic);
  };

  return (
    <Modal open={isOpen} setOpen={setIsOpen}>
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex items-center gap-2 text-base font-black">
          <div className=" h-[40px] w-fit rounded-full bg-white p-1 drop-shadow">
            <MdTopic className="p-1" size={32} />
          </div>
          <div>
            <div>Create new topic</div>
            <div className="text-xs font-normal text-gray-600">
              in {currentCourse?.name}
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <TopicColorPicker color={color} setColor={setColor} />
          <div className="flex gap-2">
            <Input
              value={lessonName}
              autofocus
              placeholder="Enter the name..."
              onChange={handleChange}
            />
            <Button className=" flex-1 whitespace-pre py-1">
              Create new topic
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateTopicModal;
