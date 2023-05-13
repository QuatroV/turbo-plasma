import useSearchStore from "~/stores/searchStore";
import SearchSidebarEnd from "./SearchSidebarEnd";
import SearchSidebarItem from "./SearchSidebarItem";

import { MdSearchOff } from "react-icons/md";
import SearchSidebarMainPage from "./SearchSidebarMainPage";

const SearchSidebarItems = () => {
  const searchResult = useSearchStore((state) => state.searchResult);
  const searchQuery = useSearchStore((state) => state.searchQuery);

  if (!searchQuery.length) {
    return <SearchSidebarMainPage />;
  }

  if (!searchResult.length && searchQuery.length) {
    return (
      <div className="scrollbar flex-1 overflow-auto p-2 text-sm">
        <div className="flex flex-col items-center justify-center text-gray-500">
          <MdSearchOff size={50} />
          <hr className=" my-1 h-0.5 w-1/2 bg-gray-300" />
          <p className=" text-xs italic text-gray-400">No results found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="scrollbar flex-1 overflow-auto p-2 text-sm">
      {searchResult.map((item, idx) => (
        <SearchSidebarItem
          key={item.id}
          item={item}
          isFirst={idx === 0}
          isLast={idx === searchResult.length - 1}
        />
      ))}
      {searchResult.length > 0 && <SearchSidebarEnd />}
    </div>
  );
};

export default SearchSidebarItems;
