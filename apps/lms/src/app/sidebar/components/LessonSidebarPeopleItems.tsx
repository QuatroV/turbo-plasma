import { Role } from "@prisma/client";
import { FaUserAlt } from "react-icons/fa";

type UserInfo = {
  name: string | null;
  image: string | null;
  email: string | null;
  surname: string;
  role: Role;
};

type Props = {
  title: string;
  items: UserInfo[];
};

const LessonSidebarPeopleItems = ({ items, title }: Props) => {
  return (
    <div>
      <div className="my-1 ml-3 text-sm font-bold">
        {title}
        <span className="ml-1 text-xs text-gray-500">{items.length}</span>
      </div>
      <div>
        {items.map((user) => (
          <div className="relative flex cursor-pointer items-center gap-2 py-1 px-2 text-sm hover:bg-gray-300 active:shadow-inner">
            <FaUserAlt />
            {user.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonSidebarPeopleItems;
