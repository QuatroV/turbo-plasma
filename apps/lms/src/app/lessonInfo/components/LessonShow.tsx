import ReactHtmlParser from "react-html-parser";
import { transform } from "../utils/parse";

import useLessonStore from "~/stores/lessonStore";

const LessonShow = () => {
  const currentContent = useLessonStore((state) => state.lesson?.content);
  if (!currentContent) return null;

  return <div>{ReactHtmlParser(currentContent, { transform })}</div>;
};

export default LessonShow;
