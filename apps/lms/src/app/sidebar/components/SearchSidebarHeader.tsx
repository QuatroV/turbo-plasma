import {
  useEffect,
  useState,
  type ChangeEventHandler,
  type MouseEventHandler,
} from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineClear } from "react-icons/md";

import { api } from "~/utils/api";
import clsxm from "~/utils/clsxm";
import Input from "~/components/Input";
import useSearchStore from "~/stores/searchStore";

const SearchSidebarHeader = () => {
  const searchPhrase = useSearchStore((state) => state.searchQuery);
  const setSearchPhrase = useSearchStore((state) => state.setSearchQuery);

  useEffect(() => {
    setSearchPhrase(localStorage.getItem("lastSearchPhrase") || "");
  }, []);

  const searchQuery = api.course.search.useQuery(
    { phrase: searchPhrase },
    { enabled: searchPhrase.length > 0 },
  );

  const setSearchResult = useSearchStore((state) => state.setSearchResult);

  if (searchQuery.data) {
    setSearchResult(searchQuery.data);
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    localStorage.setItem("lastSearchPhrase", e.target.value);
    setSearchPhrase(e.target.value);
  };

  const handleClear: MouseEventHandler<SVGElement> = () => {
    localStorage.setItem("lastSearchPhrase", "");
    setSearchPhrase("");
  };

  const [playInputAnimation, setPlayInputAnimation] = useState(false);

  return (
    <div className="flex flex-col items-start gap-1 bg-gray-300 p-2">
      <label className="text-xs font-medium text-gray-600">
        Explore courses
      </label>
      <div className="relative w-full">
        {searchPhrase ? (
          <MdOutlineClear
            size="16"
            onClick={handleClear}
            className="absolute right-2 top-[6px] cursor-pointer"
          />
        ) : (
          <AiOutlineSearch size="16" className="absolute right-2 top-[6px]" />
        )}

        <Input
          id="main-sidebar-search-input"
          value={searchPhrase}
          onChange={handleChange}
          onFocus={() => setPlayInputAnimation(true)}
          onAnimationEnd={() => setPlayInputAnimation(false)}
          className={clsxm(
            " z-20 px-2 text-sm",
            playInputAnimation && " animate-squeeze",
          )}
          placeholder="Name of the course..."
        />
      </div>
    </div>
  );
};

export default SearchSidebarHeader;
