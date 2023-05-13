import { BsArrow90DegUp } from "react-icons/bs";
import useSearchStore from "~/stores/searchStore";
import SearchSidebarItem from "./SearchSidebarItem";

const SearchSidebarMainPage = () => {
  const popularCourses = useSearchStore((state) => state.popularCourses);
  return (
    <div className="flex flex-1 flex-col gap-2 p-2 text-sm">
      <div className="flex gap-2 pl-2 text-gray-500">
        <BsArrow90DegUp />
        <p className=" text-xs italic text-gray-400">
          Use input field above to search
        </p>
      </div>
      <div>
        <h3 className="mb-2 text-xs font-semibold text-gray-600">
          Popular courses
        </h3>
        <div>
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
