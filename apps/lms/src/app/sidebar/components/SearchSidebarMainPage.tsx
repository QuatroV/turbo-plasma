import { useState } from "react";
import { BsArrow90DegUp } from "react-icons/bs";
import { RiArrowRightSLine } from "react-icons/ri";

import clsxm from "~/utils/clsxm";
import useSearchStore from "~/stores/searchStore";
import SearchSidebarItem from "./SearchSidebarItem";

const SearchSidebarMainPage = () => {
  const popularCourses = useSearchStore((state) => state.popularCourses);
  const myCourses = useSearchStore((state) => state.myCourses);

  const [showMyCourses, setShowMyCourses] = useState(true);
  const [showPopularCourses, setShowPopularCourses] = useState(false);

  return (
    <div className="scrollbar flex flex-1 flex-col gap-2 overflow-auto p-2 text-sm">
      <div className="flex gap-2 pl-2 text-gray-500">
        <BsArrow90DegUp />
        <p className=" text-xs italic text-gray-400">
          Use input field above to search
        </p>
      </div>
      <div>
        <h3
          className="mb-2 flex cursor-pointer items-center justify-between text-xs font-semibold text-gray-600"
          onClick={() => setShowMyCourses(!showMyCourses)}
        >
          My courses{" "}
          <RiArrowRightSLine
            className={clsxm(showMyCourses && "rotate-90", "text-gray-600")}
            size={20}
          />
        </h3>
        <div
          className={clsxm(
            showMyCourses ? " max-h-full" : " max-h-0 overflow-hidden",
            "transition-all",
          )}
        >
          {myCourses.map((item, idx) => (
            <SearchSidebarItem
              key={item.id}
              item={item}
              isFirst={idx === 0}
              isLast={idx === myCourses.length - 1}
            />
          ))}
        </div>
      </div>
      <div>
        <h3
          className="mb-2 flex cursor-pointer items-center justify-between text-xs font-semibold text-gray-600"
          onClick={() => setShowPopularCourses(!showPopularCourses)}
        >
          Popular courses{" "}
          <RiArrowRightSLine
            className={clsxm(
              showPopularCourses && "rotate-90",
              "text-gray-600",
            )}
            size={20}
          />
        </h3>
        <div
          className={clsxm(
            showPopularCourses ? " max-h-full" : " max-h-0 overflow-hidden",
            "transition-all",
          )}
        >
          {popularCourses.map((item, idx) => (
            <SearchSidebarItem
              key={item.id}
              item={item}
              isFirst={idx === 0}
              isLast={idx === popularCourses.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSidebarMainPage;
