import { MdOutlinePlayLesson } from "react-icons/md";

import clsxm from "~/utils/clsxm";
import useCourseStore from "~/stores/courseStore";
import { type SearchCourseInfo } from "~/stores/searchStore";

type Props = {
  isFirst?: boolean;
  isLast?: boolean;
  item: SearchCourseInfo;
};

type UserInfo = {
  name: string | null;
};

const SearchSidebarItem = ({ isFirst, isLast, item }: Props) => {
  const { name, private: isPrivate, CourseUser: CourseUsers } = item;

  let user: UserInfo | undefined = undefined;

  if (CourseUsers?.length > 0) {
    user = CourseUsers[0]?.user;
  }

  const currentCourseId = useCourseStore((state) => state.currentCourse?.id);
  const setCurrentCourse = useCourseStore((state) => state.setCurrentCourse);
  const setEditedCurrentCourse = useCourseStore(
    (state) => state.setEditedCurrentCourse,
  );
  const setEditMode = useCourseStore((state) => state.setEditMode);

  const isCurrentltySelected = currentCourseId === item.id;

  const handleClick = () => {
    if (isCurrentltySelected) {
      return;
    }
    localStorage.setItem("lastOpenCourse", JSON.stringify(item));
    setEditMode(false);
    setCurrentCourse({ ...item, shortInfo: "", lessons: [] });
    setEditedCurrentCourse({ ...item, shortInfo: "", lessons: [] });
  };

  return (
    <div
      className={clsxm(
        " flex h-14 cursor-pointer items-center gap-2 border-2 border-b bg-gray-100 p-1 transition-all active:bg-gray-300 active:shadow-inner",
        isFirst && "rounded-t-xl",
        isLast && "rounded-b-xl",
        isCurrentltySelected && "bg-gray-300",
      )}
      onClick={handleClick}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
        <MdOutlinePlayLesson size={22} className="text-gray-500" />
      </div>
      <div>
        <p className="flex items-center text-sm">
          <span>{name}</span>
          {isPrivate ? (
            <span className="ml-2 rounded border px-1 text-xs text-gray-500">
              Private
            </span>
          ) : null}
        </p>
        <p className="text-xs text-gray-500">
          Creator: {user?.name || "Unknown"}
        </p>
      </div>
    </div>
  );
};

export default SearchSidebarItem;
