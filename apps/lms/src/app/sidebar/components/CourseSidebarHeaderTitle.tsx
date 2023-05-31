import { useRouter } from "next/router";

import Button from "~/components/Button";
import useCourseStore from "~/stores/courseStore";
import usePagesStore from "~/stores/pageStore";

const SidebarHeaderTitle = () => {
  const lessonSubPage = usePagesStore((state) => state.lessonSubPage);
  const currentCourse = useCourseStore((state) => state.currentCourse);

  const isOwner = useCourseStore((state) => state.isOwner);
  const isModerator = useCourseStore((state) => state.isModerator);

  const router = useRouter();

  return (
    <h1 className="flex w-full items-center justify-between bg-gray-300 px-2 py-1 text-sm font-semibold uppercase">
      <div>{currentCourse?.name}</div>
      {lessonSubPage === "people" && (isOwner || isModerator) && (
        <Button
          onClick={() => router.push(`/courses/${currentCourse?.id}/people`)}
          className="bg-transparent px-2 py-0 outline outline-1 outline-gray-400 active:bg-gray-400 active:shadow-inner active:outline-gray-400"
        >
          Edit people
        </Button>
      )}
    </h1>
  );
};

export default SidebarHeaderTitle;
