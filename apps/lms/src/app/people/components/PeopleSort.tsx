import { useRef, useState } from "react";
import { HiSortAscending } from "react-icons/hi";

import clsxm from "~/utils/clsxm";
import Dropdown from "~/components/Dropdown";
import useOnClickOutside from "~/hooks/useOnClickOutside";

type Props = {
  sortBy: "FIRST_NAME" | "LAST_NAME" | "SCORE";
  setSortBy: (sortBy: "FIRST_NAME" | "LAST_NAME" | "SCORE") => void;
  sortOrder: "ASC" | "DESC";
  setSortOrder: (sortOrder: "ASC" | "DESC") => void;
};

const PeopleSort = ({ sortBy, setSortBy, sortOrder, setSortOrder }: Props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const SortByFirstName = () => {
    return (
      <div
        className={clsxm(sortBy === "FIRST_NAME" && "text-emerald-500")}
        onClick={() => setSortBy("FIRST_NAME")}
      >
        Sort by First Name
      </div>
    );
  };

  const SortByLastName = () => {
    return (
      <div
        className={clsxm(sortBy === "LAST_NAME" && "text-emerald-500")}
        onClick={() => setSortBy("LAST_NAME")}
      >
        Sort by Last Name
      </div>
    );
  };

  const SortByScore = () => {
    return (
      <div
        className={clsxm(sortBy === "SCORE" && "text-emerald-500")}
        onClick={() => setSortBy("SCORE")}
      >
        Sort by Score
      </div>
    );
  };

  const options = [SortByFirstName, SortByLastName, SortByScore];

  const dropdownListRef = useRef(null);

  useOnClickOutside(dropdownListRef, () => setDropdownOpen(false));

  console.log({ sortOrder });

  return (
    <div className="mb-2 mr-2 flex items-center rounded-lg bg-white ">
      <Dropdown
        dropdownOpen={dropdownOpen}
        options={options}
        onClick={() => setDropdownOpen(true)}
        dropdownStyles="text-sm rounded-lg right-0 mr-2 mt-3 border"
        ref={dropdownListRef}
      >
        <div className="  cursor-pointer  gap-2  px-2 py-0.5 text-sm">
          <span className="text-sm">Sort by: First Name</span>
        </div>
      </Dropdown>
      <div
        className="mr-1 cursor-pointer"
        onClick={() => setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC")}
      >
        <HiSortAscending
          className={clsxm(
            sortOrder === "ASC" && "rotate-180",
            "transition-all active:text-emerald-500",
          )}
          size={24}
        />
      </div>
    </div>
  );
};

export default PeopleSort;
