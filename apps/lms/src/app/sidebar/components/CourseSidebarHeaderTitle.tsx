import useCourseStore from "~/stores/courseStore";

const SidebarHeaderTitle = () => {
  const currentCourse = useCourseStore((state) => state.currentCourse);
  return (
    <h1 className="flex flex-row items-center justify-between bg-gray-300 py-1 px-2 text-sm font-semibold uppercase">
      {currentCourse?.name}
    </h1>
  );
};

export default SidebarHeaderTitle;
