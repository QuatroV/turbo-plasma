import { BsFillPeopleFill } from "react-icons/bs";
import { ImBook } from "react-icons/im";
import { HiBookmark } from "react-icons/hi";
import SidebarHeaderTab from "./CourseSidebarHeaderTab";
import usePagesStore, { LessonSubPage } from "~/stores/pageStore";

const tabs = [
  { name: "Lesson", icon: <HiBookmark /> },
  { name: "Course", icon: <ImBook /> },
  { name: "People", icon: <BsFillPeopleFill /> },
];

const SidebarHeaderTabs = () => {
  const lessonSubPage = usePagesStore((state) => state.lessonSubPage);
  const setLessonSubPage = usePagesStore((state) => state.setLessonSubPage);

  const handleClick = (e: React.MouseEvent, name: string) => {
    setLessonSubPage(name.toLowerCase() as LessonSubPage);
  };

  return (
    <div className="flex items-center gap-1">
      {tabs.map((tab, idx) => (
        <SidebarHeaderTab
          {...tab}
          key={idx}
          active={lessonSubPage === tab.name.toLowerCase()}
          onClick={(e) => handleClick(e, tab.name)}
        />
      ))}
    </div>
  );
};

export default SidebarHeaderTabs;
