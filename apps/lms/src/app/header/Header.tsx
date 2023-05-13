import { FiUser } from "react-icons/fi";
import { GrHomeRounded } from "react-icons/gr";
import AuthHeaderElement from "./AuthHeaderElement";
import HeaderElement from "./HeaderElement";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex h-[40px] w-full items-center justify-between bg-gray-100 p-2 text-sm">
      <div className="flex gap-1">
        <Link href="/">
          <HeaderElement>
            <GrHomeRounded size={18} />
          </HeaderElement>
        </Link>

        <HeaderElement>My courses</HeaderElement>
      </div>
      <AuthHeaderElement />
    </div>
  );
};

export default Header;
