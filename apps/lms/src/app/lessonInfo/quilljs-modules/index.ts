import { StringMap } from "quill";

const toolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline"], // toggled buttons
  ["blockquote", "code-block"],

  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ align: [] }],
];

const QuillJSModules: StringMap = {
  toolbar: toolbarOptions,
};

export default QuillJSModules;
