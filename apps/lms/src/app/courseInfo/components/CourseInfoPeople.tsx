import { useRouter } from "next/router";
import { BsFillPeopleFill } from "react-icons/bs";

import Button from "~/components/Button";
import useCourseStore from "~/stores/courseStore";
import CourseInfoStudent from "./CourseInfoStudent";

const CourseInfoPeople = () => {
  const courseUsers = useCourseStore((state) => state.users);

  const currentCourse = useCourseStore((state) => state.currentCourse);
  const isOwner = useCourseStore((state) => state.isOwner);
  const isModerator = useCourseStore((state) => state.isModerator);

  const router = useRouter();

  return (
    <div className="flex flex-initial flex-col">
      <div className="flex items-center justify-between gap-2 rounded-t-xl bg-white p-2 font-bold shadow">
        <div className="flex items-center gap-2">
          <BsFillPeopleFill size={16} />
          People
        </div>
        {isOwner || isModerator ? (
          <Button
            onClick={() => router.push(`/courses/${currentCourse?.id}/people`)}
            className="bg-transparent px-2 py-0.5 text-sm outline outline-1 outline-gray-400 active:bg-gray-400 active:shadow-inner active:outline-gray-400"
          >
            Edit people
          </Button>
        ) : null}
      </div>
      <div className="bg-glass w-64 flex-initial rounded-b-xl p-2">
        {courseUsers.map((user, index) => (
          <CourseInfoStudent
            key={index}
            user={user}
            index={index + 1}
            first={index === 0}
            last={index === courseUsers.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseInfoPeople;
