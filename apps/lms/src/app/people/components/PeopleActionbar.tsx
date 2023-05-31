import { BsCheckCircleFill } from "react-icons/bs";

import Input from "~/components/Input";
import PeopleSort from "./PeopleSort";

type Props = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  handleChangeRoleFilter: (role: "LISTENER" | "MODERATOR" | "OWNER") => void;
  roleFilter: ("LISTENER" | "MODERATOR" | "OWNER")[];
  sortBy: "FIRST_NAME" | "LAST_NAME" | "SCORE";
  setSortBy: (value: "FIRST_NAME" | "LAST_NAME" | "SCORE") => void;
  sortOrder: "ASC" | "DESC";
  setSortOrder: (value: "ASC" | "DESC") => void;
};

const PeopleActionbar = ({
  searchValue,
  setSearchValue,
  handleChangeRoleFilter,
  roleFilter,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}: Props) => {
  return (
    <div className="col flex flex-col items-start gap-2 ">
      <div className="mx-2 w-min whitespace-pre rounded-b-lg bg-white px-2 py-1 font-bold">
        People list
      </div>
      <div className="flex w-full justify-between">
        <div className="flex">
          <Input
            value={searchValue}
            onClear={() => setSearchValue("")}
            onChange={(e: any) => setSearchValue(e.target.value)}
            searchable
            placeholder="Search users..."
            className="mx-2 mb-2 w-min text-sm"
          />
          <div className="mb-2 flex gap-1 text-sm">
            <div
              onClick={() => handleChangeRoleFilter("LISTENER")}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-emerald-400 bg-emerald-100 px-2"
            >
              Students
              {roleFilter.includes("LISTENER") && (
                <BsCheckCircleFill
                  size={18}
                  className=" right-0 top-0 rounded-full border border-white bg-white text-blue-500"
                />
              )}
            </div>
            <div
              onClick={() => handleChangeRoleFilter("MODERATOR")}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-blue-400 bg-blue-100 px-2"
            >
              Moderators
              {roleFilter.includes("MODERATOR") && (
                <BsCheckCircleFill
                  size={18}
                  className=" right-0 top-0 rounded-full border border-white bg-white text-blue-500"
                />
              )}
            </div>
            <div
              onClick={() => handleChangeRoleFilter("OWNER")}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-yellow-400 bg-yellow-100 px-2"
            >
              Admins
              {roleFilter.includes("OWNER") && (
                <BsCheckCircleFill
                  size={18}
                  className=" right-0 top-0 rounded-full border border-white bg-white text-blue-500"
                />
              )}
            </div>
          </div>
        </div>

        <PeopleSort
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </div>
    </div>
  );
};

export default PeopleActionbar;
