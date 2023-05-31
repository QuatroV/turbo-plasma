import { useEffect, useState } from "react";

import { api } from "~/utils/api";
import useCourseStore from "~/stores/courseStore";
import usePeopleStore from "../stores/peopleStore";
import PeopleActionbar from "./PeopleActionbar";
import PeopleSearchResults from "./PeopleSearchResults";

const PeopleList = () => {
  const currentCourse = useCourseStore((state) => state.currentCourse);

  const setPeople = usePeopleStore((state) => state.setPeople);

  const [searchValue, setSearchValue] = useState("");

  const [roleFilter, setRoleFilter] = useState<
    ("LISTENER" | "MODERATOR" | "OWNER")[]
  >([]);

  const [sortBy, setSortBy] = useState<"FIRST_NAME" | "LAST_NAME" | "SCORE">(
    "FIRST_NAME",
  );

  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");

  const handleChangeRoleFilter = (role: "LISTENER" | "MODERATOR" | "OWNER") => {
    if (!roleFilter.includes(role)) {
      setRoleFilter([...roleFilter, role]);
    } else {
      setRoleFilter(roleFilter.filter((r) => r !== role));
    }
  };

  const searchPeopleQuery = api.people.search.useQuery(
    {
      courseId: currentCourse?.id || "",
      search: searchValue,
      roleFilter,
      sortBy,
      sortOrder,
    },
    { enabled: !!currentCourse?.id },
  );

  useEffect(() => {
    if (searchPeopleQuery.data) {
      setPeople(searchPeopleQuery.data);
    }
  }, [searchPeopleQuery.data]);

  const actionbarProps = {
    searchValue,
    setSearchValue,
    handleChangeRoleFilter,
    roleFilter,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
  };

  return (
    <div className="bg-glass rounded-xl">
      <PeopleActionbar {...actionbarProps} />
      <PeopleSearchResults refetch={searchPeopleQuery.refetch} />
    </div>
  );
};

export default PeopleList;
