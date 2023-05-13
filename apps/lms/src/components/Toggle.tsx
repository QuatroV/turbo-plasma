import { MouseEventHandler } from "react";
import clsxm from "~/utils/clsxm";

type Options = {
  on: { Icon?: React.ReactNode; label: string };
  off: { Icon?: React.ReactNode; label: string };
};

type Props = {
  active: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
  options: Options;
};

const getSliderMargin = (active: boolean) => (active ? "ml-6" : "ml-0");

const Toggle = (props: Props) => {
  const { onClick, active, options } = props;

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    onClick(e);
  };

  const currentIcon = active ? options.on.Icon : options.off.Icon;

  return (
    <div
      onClick={handleClick}
      className="h-8 w-14 cursor-pointer rounded-full bg-gray-200 p-1 shadow-inner"
    >
      <div
        className={clsxm(
          "flex h-6 w-6 items-center justify-center rounded-full bg-white shadow transition-all",
          getSliderMargin(active)
        )}
      >
        {currentIcon}
      </div>
    </div>
  );
};

export default Toggle;
