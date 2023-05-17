import React from "react";
import { GrCheckmark } from "react-icons/gr";

import clsxm from "~/utils/clsxm";
import { COLORS } from "../constants/topics";

type Props = {
  color: string;
  setColor: React.Dispatch<string>;
};

const TopicColorPicker = ({ color, setColor }: Props) => {
  return (
    <>
      <div className="mb-1 font-semibold">Color theme:</div>
      <div className="mb-2 flex gap-2">
        {Object.entries(COLORS).map(([colorName, colorStr]) => (
          <div
            key={colorName}
            onClick={() => setColor(colorName)}
            className={clsxm(
              colorStr,
              "flex h-8 w-8 cursor-pointer items-center justify-center rounded border ",
            )}
          >
            {color === colorName && <GrCheckmark />}
          </div>
        ))}
      </div>
    </>
  );
};

export default TopicColorPicker;
