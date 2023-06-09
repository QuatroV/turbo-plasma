import { type FormEventHandler } from "react";
import { BiTask } from "react-icons/bi";
import { GrAddCircle } from "react-icons/gr";
import { IoIosArrowForward } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";

import { api } from "~/utils/api";
import Button from "~/components/Button";
import Input from "~/components/Input";
import useLessonStore from "~/stores/lessonStore";

const TaskForm = () => {
  const currentLesson = useLessonStore((state) => state.lesson);
  const setCurrentLesson = useLessonStore((state) => state.setLesson);

  const createTaskMutation = api.task.create.useMutation();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!currentLesson?.id) {
      return;
    }

    const lesson = await createTaskMutation.mutateAsync({
      lessonId: currentLesson?.id,
      name: e.currentTarget.task_name.value,
      content: e.currentTarget.task_content.value,
      expectedResult: e.currentTarget.task_expected_results?.value || "",
    });

    setCurrentLesson(lesson);
  };

  return (
    <div>
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex items-center gap-2 text-base font-black">
          <div className=" h-[40px] w-fit rounded-full bg-white p-1 drop-shadow">
            <BiTask className="p-1" size={32} />
          </div>
          <div>
            <div>Create new task</div>
            <div className="text-xs font-normal text-gray-600">
              in {currentLesson?.name}
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-2 flex gap-3">
            <div className="min-w-[300px] flex-1">
              <div className="mb-1 font-bold">Data:</div>
              <div className="flex items-center gap-2">
                <label className="">Name:</label>
                <Input
                  name="task_name"
                  autofocus
                  placeholder="Enter the name..."
                  onChange={() => null}
                />
              </div>
              <div className="flex flex-col items-start gap-1">
                <label className="w-20">Content:</label>
                <Input
                  name="task_content"
                  multiline
                  autofocus
                  placeholder="Describe the task..."
                  onChange={() => null}
                />
              </div>
            </div>

            <div className="mb-2 flex min-w-[300px] flex-1 flex-col items-start gap-1">
              <label className="font-bold">Tests:</label>
              <div className="mb-2 flex w-full flex-col items-center gap-2">
                <Button className="flex w-full flex-1 items-center gap-2 whitespace-pre py-1">
                  <GrAddCircle />
                  Add new test
                </Button>
              </div>
              <div className="flex max-h-64 w-full flex-col items-center overflow-auto">
                <div className="flex w-full flex-1 items-center justify-between gap-2 whitespace-pre border bg-gray-100 p-2 first:rounded-t last:rounded-b">
                  <div className="flex items-center gap-2">
                    <IoIosArrowForward
                      size={18}
                      className="cursor-pointer transition-all active:text-emerald-500"
                    />
                    Test 1
                  </div>
                  <RxCross1
                    size={18}
                    className="cursor-pointer transition-all active:text-emerald-500"
                  />
                </div>
                <div className="flex w-full flex-1 items-center justify-between gap-2 whitespace-pre border bg-gray-100 p-2 first:rounded-t last:rounded-b">
                  <div className="flex items-center gap-2">
                    <IoIosArrowForward
                      size={18}
                      className="cursor-pointer transition-all active:text-emerald-500"
                    />
                    Test 2
                  </div>
                  <RxCross1
                    size={18}
                    className="cursor-pointer transition-all active:text-emerald-500"
                  />
                </div>
                <div className="flex w-full flex-1 items-center justify-between gap-2 whitespace-pre border bg-gray-100 p-2 first:rounded-t last:rounded-b">
                  <div className="flex items-center gap-2">
                    <IoIosArrowForward
                      size={18}
                      className="cursor-pointer transition-all active:text-emerald-500"
                    />
                    Test 3
                  </div>
                  <RxCross1
                    size={18}
                    className="cursor-pointer transition-all active:text-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>
          <Button className=" w-full flex-1 whitespace-pre">Create task</Button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
