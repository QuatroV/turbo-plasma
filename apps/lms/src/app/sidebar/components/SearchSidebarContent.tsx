import Button from "~/components/Button";
import useCourseStore from "~/stores/courseStore";
import { api } from "~/utils/api";
import SearchSidebarHeader from "./SearchSidebarHeader";
import SearchSidebarItems from "./SearchSidebarItems";

const SearchSidebarContent = () => {
  const createMutation = api.course.create.useMutation();

  const setCurrentCourse = useCourseStore((state) => state.setCurrentCourse);

  const handleCreate = async () => {
    const data = await createMutation.mutateAsync();
    setCurrentCourse({ ...data, lessons: [] });
  };

  return (
    <div className="flex h-full flex-col justify-between overflow-hidden">
      <SearchSidebarHeader />
      <SearchSidebarItems />

      <div className="flex-initial p-2 text-sm">
        <Button onClick={handleCreate} className="w-full rounded-lg py-3">
          Create new course
        </Button>
      </div>
    </div>
  );
};

export default SearchSidebarContent;
