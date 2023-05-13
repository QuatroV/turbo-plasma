import { useState } from "react";
import LessonInfoMenubar from "./LessonInfoMenubar";
import LessonShow from "./LessonShow";
import LessonEdit from "./LessonEdit";

const LessonContent = () => {
  const [mode, setMode] = useState<"read" | "write">("read");
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <LessonInfoMenubar mode={mode} setMode={setMode} />
      {mode === "read" ? <LessonShow /> : <LessonEdit />}
    </div>
  );
};

export default LessonContent;
