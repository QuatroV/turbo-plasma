import dynamic from "next/dynamic";
import useAuthStore from "~/stores/authStore";
import { useSession } from "next-auth/react";
import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import useCourseStore from "~/stores/courseStore";
import { BiBookAlt } from "react-icons/bi";
import Input from "~/components/Input";
import Button from "~/components/Button";
import { api } from "~/utils/api";

const Modal = dynamic(() => import("../../../components/Modal"), {
  ssr: false,
});

const AddLessonModal = () => {
  const currentCourse = useCourseStore((state) => state.currentCourse);
  const setCurrentCourse = useCourseStore((state) => state.setCurrentCourse);
  const isOpen = useCourseStore((state) => state.addLessonModalOpen);
  const setIsOpen = useCourseStore((state) => state.setAddLessonModalOpen);

  const createLessonMutation = api.lesson.create.useMutation();

  const [lessonName, setLessonName] = useState("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setLessonName(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!currentCourse) return;
    const updatedCourse = await createLessonMutation.mutateAsync({
      courseId: currentCourse?.id,
      name: lessonName,
    });
    setCurrentCourse(updatedCourse);
    setIsOpen(false);
  };

  return (
    <Modal open={isOpen} setOpen={setIsOpen}>
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex items-center gap-2 text-base font-black">
          <div className=" h-[40px] w-fit rounded-full bg-white p-1 drop-shadow">
            <BiBookAlt className="p-1" size={32} />
          </div>
          <div>
            <div>Create new lesson</div>
            <div className="text-xs font-normal text-gray-600">
              in {currentCourse?.name}
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={lessonName}
            autofocus
            placeholder="Enter the name..."
            onChange={handleChange}
          />
          <Button className=" flex-1 whitespace-pre py-1">Create lesson</Button>
        </form>
      </div>
    </Modal>
  );
};

export default AddLessonModal;
