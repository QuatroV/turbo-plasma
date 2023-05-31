import { useRef, useState } from "react";
import { FaUser, FaUserGraduate, FaUserTie } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

import { api } from "~/utils/api";
import clsxm from "~/utils/clsxm";
import Button from "~/components/Button";
import Dropdown from "~/components/Dropdown";
import useOnClickOutside from "~/hooks/useOnClickOutside";
import { type PeopleType } from "../stores/peopleStore";
import PeopleItemContent from "./PeopleItemContent";

type Props = {
  person: PeopleType;
  first: boolean;
  last: boolean;
  refetch: () => void;
};

const PeopleItem = ({ person, first, last, refetch }: Props) => {
  const [collapsed, setCollapsed] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef, () => setDropdownOpen(false));

  const editRoleMutation = api.people.editUserRole.useMutation();

  const handleChangeRole = async (
    newRole: "LISTENER" | "MODERATOR" | "OWNER",
  ) => {
    await editRoleMutation.mutateAsync({
      userId: person.id,
      role: newRole,
    });
    refetch();
  };

  const deleteUserMutation = api.people.deleteUser.useMutation();

  const handleDelete = async () => {
    await deleteUserMutation.mutateAsync({
      userId: person.id,
    });
    refetch();
  };

  const setModeratorRoleOption = () => {
    return (
      <div
        onClick={() => handleChangeRole("MODERATOR")}
        className={clsxm(
          person.courseRole === "MODERATOR" && "text-emerald-500",
        )}
      >
        Moderator
      </div>
    );
  };

  const setListenerRoleOption = () => {
    return (
      <div
        onClick={() => handleChangeRole("LISTENER")}
        className={clsxm(
          person.courseRole === "LISTENER" && "text-emerald-500",
        )}
      >
        Listener
      </div>
    );
  };

  const setOwnerRoleOption = () => {
    return (
      <div
        onClick={() => handleChangeRole("OWNER")}
        className={clsxm(person.courseRole === "OWNER" && "text-emerald-500")}
      >
        Owner
      </div>
    );
  };

  const options = [
    setOwnerRoleOption,
    setModeratorRoleOption,
    setListenerRoleOption,
  ];

  return (
    <div
      className={clsxm(
        "gap-1 border border-b-0",
        first && "rounded-t-lg",
        last && "border-b-1 rounded-b-lg",
      )}
    >
      <div
        className={clsxm(
          "flex items-center justify-between p-2 ",
          first && "rounded-t-lg",
          last && "border-b-1 rounded-b-lg",
        )}
      >
        <div className="flex items-center gap-3">
          <IoIosArrowDown
            size={20}
            onClick={() => setCollapsed(!collapsed)}
            className={clsxm(
              !collapsed && "rotate-180",
              "cursor-pointer transition-all active:text-emerald-500",
            )}
          />
          <div>
            {person.courseRole === "LISTENER" && <FaUser />}
            {person.courseRole === "MODERATOR" && <FaUserGraduate />}
            {person.courseRole === "OWNER" && <FaUserTie />}
          </div>
          {person.name} {person.surname}
          <div className="text-xs text-gray-500">{person.email}</div>
          <div className="text-xs text-gray-500">
            Total course score:{" "}
            <span className=" underline underline-offset-2">
              {person.score}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Dropdown
            ref={dropdownRef}
            options={options}
            dropdownOpen={dropdownOpen}
            dropdownStyles="border mt-2 right-0 rounded text-right"
          >
            <Button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="border px-2 py-0.5"
            >
              Change role
            </Button>
          </Dropdown>
          <Button
            onClick={() => handleDelete()}
            className="border px-2 py-0.5 active:outline-red-400"
          >
            Delete from course
          </Button>
        </div>
      </div>
      {!collapsed && <PeopleItemContent userId={person.id} />}
    </div>
  );
};

export default PeopleItem;
