import { MouseEventHandler, ReactNode } from "react";
import clsxm from "~/utils/clsxm";

type Props = {
  name: string;
  icon: ReactNode;
  key: number;
  onClick: MouseEventHandler<HTMLDivElement>;
  active?: boolean;
};

const SidebarHeaderTab = ({ name, icon, key, onClick, active }: Props) => {
  return (
    <div
      className={clsxm(
        active && "bg-white",
        "flex cursor-pointer flex-row items-center gap-1 rounded-full px-2 hover:bg-gray-100 active:scale-105"
      )}
      key={key}
      onClick={onClick}
    >
      {icon}
      {name}
    </div>
  );
};

export default SidebarHeaderTab;
