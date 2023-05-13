import { Dispatch, SetStateAction, useState } from "react";
import { AiOutlineRead } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";
import Toggle from "~/components/Toggle";

const LessonMenubarToggleOptions = {
  on: {
    label: "Edit",
    Icon: <GrEdit size={16} />,
  },
  off: { label: "Learn", Icon: <AiOutlineRead size={18} /> },
};

type Props = {
  mode: "write" | "read";
  setMode: Dispatch<SetStateAction<"read" | "write">>;
};

const LessonInfoMenubar = ({ mode, setMode }: Props) => {
  return (
    <div className="mb-4 flex">
      <div
        onClick={() => setMode((prev) => (prev === "read" ? "write" : "read"))}
        className="flex cursor-pointer items-center gap-2"
      >
        <Toggle
          options={LessonMenubarToggleOptions}
          active={mode === "write"}
          onClick={() => null}
        />
        <span className=" text-sm text-gray-500">
          {mode === "write" ? "Edit" : "Read"} mode
        </span>
      </div>
    </div>
  );
};

export default LessonInfoMenubar;
