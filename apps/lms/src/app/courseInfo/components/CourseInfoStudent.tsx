import { Prisma } from "@prisma/client";
import { UserWithRole } from "~/stores/courseStore";
import clsxm from "~/utils/clsxm";

type Props = {
  index: number;
  first: boolean;
  last: boolean;
  user: UserWithRole;
};

const CourseInfoStudent = ({ user, first, last, index }: Props) => {
  const { user: userInfo, courseRole } = user;
  return (
    <div
      className={clsxm(
        "flex cursor-pointer gap-2 bg-white p-2 active:bg-gray-100 active:shadow-inner",
        last && "rounded-b-lg",
        first && "rounded-t-lg",
        !last && "border-b border-gray-300"
      )}
    >
      <div className="h-12 w-12 rounded-full bg-gray-200" />
      <div>
        <div className="flex items-center text-sm">
          {userInfo.name} {userInfo.surname}
        </div>
        <div className="text-xs text-gray-500">{userInfo.email}</div>
        <div className="text-xs text-gray-500">{courseRole}</div>
      </div>
    </div>
  );
};

export default CourseInfoStudent;
