import { AiOutlineSearch } from "react-icons/ai";

import Input from "~/components/Input";

const SearchPanel = () => {
  const handleFocus = () => {
    const searchInputSidebar = document.querySelector(
      "#main-sidebar-search-input",
    );
    if (searchInputSidebar) {
      searchInputSidebar.focus();
    }
  };

  return (
    <div className=" mx-24 flex flex-col gap-2 rounded py-2">
      <div className="flex justify-center text-white">
        Search for your courses:
      </div>
      <div className="relative">
        <Input onClick={handleFocus} className="bg-glass rounded-lg p-3" />
        <AiOutlineSearch
          size="32"
          className="absolute right-4 top-[8px] text-white"
        />
      </div>
    </div>
  );
};

export default SearchPanel;
