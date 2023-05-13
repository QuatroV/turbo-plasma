import Button from "~/components/Button";
import Input from "~/components/Input";

const LessonCommentInputForm = () => {
  return (
    <div className="flex flex-col items-end gap-2">
      <Input
        multiline
        className="h-24 border"
        type="text"
        placeholder="Write a comment here..."
      />
      <Button
        className="w-min whitespace-pre border bg-emerald-600 px-2 py-1 text-white"
        type="submit"
      >
        Post comment
      </Button>
    </div>
  );
};

export default LessonCommentInputForm;
