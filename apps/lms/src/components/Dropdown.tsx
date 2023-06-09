import React, { forwardRef } from "react";

import clsxm from "../utils/clsxm";

interface DropdownProps {
  children: React.ReactNode;
  options: ((() => JSX.Element) | string)[];
  dropdownOpen: boolean;
  onClick?: () => void;
  onContextMenu?: (e: any) => void;
  align?: "right" | "left";
  dropdownStyles?: string;
  unstyledOptions?: boolean;
}

const Dropdown = (
  {
    children,
    options,
    dropdownOpen,
    onClick,
    onContextMenu,
    align,
    dropdownStyles,
    unstyledOptions = false,
  }: DropdownProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  return (
    <div className="relative flex flex-col justify-center" ref={ref}>
      <div onClick={onClick} onContextMenu={onContextMenu} className="h-full">
        {children}
      </div>
      {dropdownOpen && (
        <div
          className={clsxm(
            `font-rubik absolute top-3/4 z-10 flex flex-col gap-1 rounded-b rounded-tr bg-white p-1 shadow-lg`,
            align === "right" && "right-0",
            dropdownStyles,
          )}
        >
          {options.map((el, idx) => {
            return typeof el === "string" ? (
              <hr className="" />
            ) : unstyledOptions ? (
              el()
            ) : (
              <div
                className=" cursor-pointer whitespace-pre rounded pb-1 pl-2 pr-2 pt-1 hover:bg-gray-200 active:shadow-inner"
                key={idx}
              >
                {el()}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default forwardRef(Dropdown);
