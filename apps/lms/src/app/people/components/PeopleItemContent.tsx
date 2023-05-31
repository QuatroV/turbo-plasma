import { useEffect } from "react";
import { useRouter } from "next/router";

import { api } from "~/utils/api";
import Button from "~/components/Button";
import useCourseStore from "~/stores/courseStore";

type Props = {
  userId: string;
};

const PeopleItemContent = ({ userId }: Props) => {
  const currentCourse = useCourseStore((state) => state.currentCourse);
  const detailedInfoQuery = api.people.detailedInfo.useQuery(
    {
      userId,
      courseId: currentCourse?.id || "",
    },
    { enabled: !!currentCourse?.id },
  );

  const router = useRouter();

  if (detailedInfoQuery.isLoading && !detailedInfoQuery.data)
    return <div className="border-t p-2">Loading...</div>;
  if (detailedInfoQuery.isError)
    return (
      <div className="border-t p-2">
        Error: {detailedInfoQuery.error.message}
      </div>
    );

  if (detailedInfoQuery.data)
    return (
      <div className="border-t bg-gray-100 p-2">
        <div className="mb-2 font-bold">Statistics:</div>
        <div>
          {detailedInfoQuery.data.map((el, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between border-l border-r border-t bg-white p-2 first:rounded-t last:rounded-b last:border-b"
            >
              <div className="flex items-center gap-2">{el.name}</div>
              <div className="flex items-center gap-2">
                <div className="rounded-full border  px-2">
                  Score: {el.score}
                </div>
                <Button
                  onClick={() => router.push(`/lessons/${el.id}`)}
                  className="border px-2 py-0"
                >
                  Go to lesson
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  return null;
};

export default PeopleItemContent;
