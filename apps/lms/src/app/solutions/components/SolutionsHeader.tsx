import { useState } from "react";

import Input from "~/components/Input";

const SolutionsHeader = () => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="col flex flex-col items-start gap-2 ">
      <div className="mx-2 w-min whitespace-pre rounded-b-lg bg-white px-2 py-1 font-bold">
        Solutions
      </div>
      <div>
        <Input
          value={searchValue}
          onClear={() => setSearchValue("")}
          onChange={(e: any) => setSearchValue(e.target.value)}
          searchable
          placeholder="Search by user..."
          className="mx-2 mb-2 w-min text-sm"
        />
      </div>
    </div>
  );
};

export default SolutionsHeader;
