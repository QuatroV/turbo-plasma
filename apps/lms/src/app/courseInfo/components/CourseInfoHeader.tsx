import { ChangeEventHandler, useState } from "react";
import Input from "~/components/Input";
import useCourseStore, { CourseInfo } from "~/stores/courseStore";
import CourseInfoButtons from "./CourseInfoButtons";

type Props = {
  item: CourseInfo;
};

const CourseInfoHeader = ({ item }: Props) => {
  const owner = useCourseStore((state) => state.currentCourseOwner);
  const { name, private: isPrivate, id } = item;

  const editMode = useCourseStore((state) => state.editMode);
  const editField = useCourseStore((state) => state.editField);

  const [inputContent, setInputContent] = useState(item.name);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputContent(e.target.value);
    editField({ name: e.target.value });
  };

  return (
    <div className="flex gap-2">
      <div className="bg-glass h-14 w-14 flex-initial rounded-full p-2" />
      <div className="bg-glass w-full flex-1 rounded-xl p-2">
        <div className="flex justify-between text-sm">
          <div className="flex flex-col gap-1">
            <div className="flex items-center">
              {editMode ? (
                <Input
                  className="p-0 px-2 text-xl font-black"
                  onChange={handleChange}
                  value={inputContent}
                />
              ) : (
                <h2 className="text-xl font-black">{name}</h2>
              )}
              {isPrivate ? (
                <span className="ml-2 rounded border bg-white px-1 text-xs text-gray-500">
                  Private
                </span>
              ) : null}
            </div>

            <span className="text-xs text-gray-500">
              Creator: {owner?.user.name || "Unknown"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CourseInfoButtons courseId={id} isPrivate={isPrivate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInfoHeader;
