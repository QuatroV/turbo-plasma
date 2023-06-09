import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";

import useLessonStore from "~/stores/lessonStore";

const TaskHeader = () => {
  const router = useRouter();
  const lesson = useLessonStore((state) => state.lesson);

  return (
    <div className="flex items-center justify-between gap-2 ">
      <div className=" bg-glass flex flex-1 items-center gap-2 rounded-xl p-2">
        <div
          className=" w-fit cursor-pointer rounded-full bg-white p-1 transition-all hover:scale-105 hover:bg-white hover:drop-shadow active:outline active:outline-2 active:outline-emerald-400"
          onClick={() => router.back()}
        >
          <BiArrowBack size={34} />
        </div>
        <div className="flex flex-col gap-0">
          <div className="text-sm text-gray-500 ">Lesson "{lesson?.name}"</div>
          <h1 className="text-2xl font-bold">Task name</h1>
        </div>
      </div>
    </div>
  );
};

export default TaskHeader;
