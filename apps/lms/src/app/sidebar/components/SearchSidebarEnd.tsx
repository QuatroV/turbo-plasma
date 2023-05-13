import useSearchStore from "~/stores/searchStore";

const SearchSidebarEnd = () => {
  const searchResult = useSearchStore((state) => state.searchResult);
  return (
    <div className="item flex flex-col items-center">
      <hr className=" my-1 h-0.5 w-1/2 bg-gray-300" />
      <div className=" text-xs italic text-gray-400">
        Total result: {searchResult.length}
      </div>
    </div>
  );
};

export default SearchSidebarEnd;
