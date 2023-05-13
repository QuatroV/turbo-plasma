import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import Input from "~/components/Input";
import useCourseStore from "~/stores/courseStore";

type Props = {
  shortInfo?: React.ReactNode;
};

const CourseInfoShortInfo = ({ shortInfo }: Props) => {
  const editMode = useCourseStore((state) => state.editMode);
  const editField = useCourseStore((state) => state.editField);
  const [inputContent, setInputContent] = useState(shortInfo);

  useEffect(() => {
    setInputContent(shortInfo);
  }, [shortInfo]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputContent(e.target.value);
    editField({ shortInfo: e.target.value });
  };

  return (
    <div className="bg-glass flex-initial rounded-xl ">
      <div className="mx-2 mb-2 w-min whitespace-pre rounded-b-lg bg-white px-2 py-1 font-bold">
        Short info
      </div>
      <div className="mx-2 mb-2 rounded-lg bg-white p-2 text-sm">
        {editMode ? (
          <Input multiline value={inputContent} onChange={handleChange} />
        ) : (
          shortInfo
        )}
      </div>
    </div>
  );
};

export default CourseInfoShortInfo;
