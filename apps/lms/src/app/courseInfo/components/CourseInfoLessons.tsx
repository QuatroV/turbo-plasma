import { useState } from "react";
import { IoSchool } from "react-icons/io5";

import { api } from "~/utils/api";
import clsxm from "~/utils/clsxm";
import Button from "~/components/Button";
import useCourseStore from "~/stores/courseStore";
import useTopicStore from "~/stores/topicStore";
import CourseInfoLesson from "./CourseInfoLesson";
import TopicPicker from "./TopicPicker";

const CourseInfoLessons = () => {
  const currentCourse = useCourseStore((state) => state.currentCourse);
  const setCurrentCourse = useCourseStore((state) => state.setCurrentCourse);
  const lessons = useCourseStore((state) => state.currentCourse?.lessons);
  const editMode = useCourseStore((state) => state.editMode);
  const setAddLessonModalOpen = useCourseStore(
    (state) => state.setAddLessonModalOpen,
  );
  const setChooseTopicModalOpen = useTopicStore(
    (state) => state.setChooseTopicModalOpen,
  );

  const currentTopic = useTopicStore((state) => state.currentTopic);

  const filteredLessons = lessons?.filter(
    (el) => !currentTopic || el.topicId === currentTopic,
  );

  const deleteMutation = api.lesson.delete.useMutation();

  const handleDeleteMany = async () => {
    if (!currentCourse) return;
    if (!chosenLessons.length) return;
    const updatedCourse = await deleteMutation.mutateAsync({
      courseId: currentCourse?.id,
      lessonIds: chosenLessons,
    });

    if (!updatedCourse) return;

    setCurrentCourse(updatedCourse);
  };

  const chosenLessons = useCourseStore((state) => state.chosenLessonsIds);
  const setChosenLessons = useCourseStore((state) => state.setChosenLessonsIds);

  return (
    <div className="min-w-0 flex-1">
      <div className="flex flex-shrink items-center gap-2 rounded-t-xl bg-white p-2 font-bold shadow">
        <IoSchool size={16} />
        Lessons
      </div>

      <div className="bg-glass flex min-w-0 flex-initial flex-shrink flex-col items-start gap-2 rounded-b-xl p-2 text-sm">
        <TopicPicker />
        <div className="w-full">
          {editMode && (
            <div
              className={clsxm(
                !lessons?.length && "mb-2 rounded-b-lg",
                "flex items-center justify-between gap-2 rounded-t-lg border-b bg-white p-2",
              )}
            >
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setAddLessonModalOpen(true)}
                  className="flex cursor-pointer items-center gap-2 rounded border px-2 py-1 text-sm active:bg-gray-300 active:shadow-inner"
                >
                  Add New Lesson
                </Button>
                <Button
                  onClick={handleDeleteMany}
                  className="flex cursor-pointer items-center gap-2 rounded border px-2 py-1 text-sm active:bg-gray-300 active:shadow-inner"
                >
                  Delete
                </Button>
                <Button
                  onClick={() => setChooseTopicModalOpen(true)}
                  className="flex cursor-pointer items-center gap-2 rounded border px-2 py-1 text-sm active:bg-gray-300 active:shadow-inner"
                >
                  Choose Topic
                </Button>
              </div>
              <div className="mr-1">Selected: {chosenLessons.length}</div>
            </div>
          )}
          {filteredLessons?.length ? (
            filteredLessons.map((lesson, idx) => (
              <CourseInfoLesson
                key={lesson.id}
                index={idx + 1}
                selected={chosenLessons.some((id) => id === lesson.id)}
                onSelect={() => setChosenLessons([...chosenLessons, lesson.id])}
                onDeselect={() =>
                  setChosenLessons(
                    chosenLessons.filter((id) => id !== lesson.id),
                  )
                }
                lesson={lesson}
                first={idx === 0 && !editMode}
                last={idx === filteredLessons.length - 1}
              />
            ))
          ) : (
            <div className="italic text-gray-500">No lessons found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseInfoLessons;
