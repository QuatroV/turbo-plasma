import Link from "next/link";

import AuthHeaderElement from "./AuthHeaderElement";
import Logo from "./Logo";

const Header = () => {
  return (
    <div className="flex h-[40px] w-full items-center justify-between bg-gray-100 p-2 text-sm">
      <div className="flex gap-1">
        <Link href="/" className="flex items-center gap-2">
          <Logo variant="gray" color="" width={32} height={32} />
          <h1 className="font-rubik font-black text-gray-500">PLASMA</h1>
        </Link>

        {/* <HeaderElement>My courses</HeaderElement> */}
      </div>
      <AuthHeaderElement />
    </div>
  );
};

export default Header;
