import { MouseEvent, MouseEventHandler, useState } from "react";
import clsxm from "~/utils/clsxm";

interface HeaderElementProps {
  children: React.ReactNode;
  onClick?: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
  className?: string;
}

const HeaderElement = ({
  children,
  onClick,
  className,
}: HeaderElementProps) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    setIsActive((prevState) => !prevState);
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div
      className={clsxm(
        `non-draggable relative cursor-pointer rounded-lg py-1 px-2 font-rubik outline-1 transition-all hover:bg-white active:scale-105 active:outline active:outline-emerald-400`,
        isActive && "underline underline-offset-4",
        className
      )}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default HeaderElement;
