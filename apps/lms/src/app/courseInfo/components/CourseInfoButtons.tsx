import { useSession } from "next-auth/react";
import Button from "~/components/Button";
import useCourseStore from "~/stores/courseStore";
import { api } from "~/utils/api";

type Props = {
  courseId: string;
  isPrivate: boolean | null;
};

const CourseInfoButtons = ({ isPrivate, courseId }: Props) => {
  const { data: session } = useSession();

  const joined = useCourseStore((state) => state.joined);
  const setJoined = useCourseStore((state) => state.setJoined);
  const isOwner = useCourseStore((state) => state.isOwner);
  const editMode = useCourseStore((state) => state.editMode);
  const setEditMode = useCourseStore((state) => state.setEditMode);
  const editedCurrentCourse = useCourseStore(
    (state) => state.editedCurrentCourse
  );
  const setCurrentCourse = useCourseStore((state) => state.setCurrentCourse);

  const joinMutation = api.course.join.useMutation();
  const leaveMutation = api.course.leave.useMutation();

  const handleJoin = () => {
    if (session?.user.id) {
      joinMutation.mutate({
        courseId,
        userId: session?.user.id,
        role: "LISTENER",
      });
      setJoined(true);
    } else {
      console.error("User ID not found");
    }
  };

  const handleLeave = () => {
    if (session?.user.id) {
      leaveMutation.mutate({
        courseId,
        userId: session?.user.id,
      });
      setJoined(false);
    } else {
      console.error("User ID not found");
    }
  };

  const updateCourseMutation = api.course.update.useMutation();

  const handleEditMode = () => {
    setEditMode(true);
  };

  const handleSaveEditChanges = async () => {
    if (editedCurrentCourse) {
      const updatedCourse = await updateCourseMutation.mutateAsync(
        editedCurrentCourse
      );

      setCurrentCourse(updatedCourse);
    }

    setEditMode(false);
  };

  const handleDeleteCourse = () => {};

  if (isOwner) {
    return editMode ? (
      <div className="flex justify-center gap-2">
        <Button onClick={handleSaveEditChanges}>Save changes</Button>
        <Button onClick={handleDeleteCourse}>Delete course</Button>
      </div>
    ) : (
      <div className="flex justify-center">
        <Button onClick={handleEditMode}>Edit</Button>
      </div>
    );
  }

  return joined ? (
    <div className="flex justify-center">
      <Button onClick={handleLeave}>Leave</Button>
    </div>
  ) : (
    <div className="flex justify-center">
      <Button onClick={handleJoin}>
        {isPrivate ? "Ask for invitation" : "Join the course"}
      </Button>
    </div>
  );
};

export default CourseInfoButtons;
