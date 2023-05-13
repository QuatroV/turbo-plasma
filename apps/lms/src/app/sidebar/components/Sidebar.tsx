import usePagesStore from "~/stores/pageStore";
import SearchSidebarContent from "./SearchSidebarContent";
import CourseSidebarContent from "./CourseSidebarContent";
import LessonSidebarContent from "./LessonSidebarContent";

const sidebarContent = {
  search: <SearchSidebarContent />,
  course: <CourseSidebarContent />,
  lesson: <LessonSidebarContent />,
};

const Sidebar = () => {
  const currentPage = usePagesStore((state) => state.currentPage);
  return (
    <div className=" h-full w-72 flex-none bg-gray-200 font-rubik">
      {sidebarContent[currentPage]}
    </div>
  );
};

export default Sidebar;
