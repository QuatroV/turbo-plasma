import { BsFillPeopleFill } from "react-icons/bs";
import useCourseStore from "~/stores/courseStore";
import CourseInfoStudent from "./CourseInfoStudent";

const CourseInfoPeople = () => {
  const courseUsers = useCourseStore((state) => state.users);
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 rounded-t-xl bg-white p-2 font-bold shadow">
        <BsFillPeopleFill size={16} />
        People
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
