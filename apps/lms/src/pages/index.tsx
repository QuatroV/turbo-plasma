import { useEffect } from "react";
import { type NextPage } from "next";

import { api } from "~/utils/api";
import CourseInfo from "~/app/courseInfo/components/CourseInfo";
import usePagesStore from "~/stores/pageStore";
import useSearchStore from "~/stores/searchStore";

const Home: NextPage = () => {
  const setCurrentPage = usePagesStore((state) => state.setCurrentPage);

  useEffect(() => setCurrentPage("search"), []);

  const setPopularCourses = useSearchStore((state) => state.setPopularCourses);
  const setMyCourses = useSearchStore((state) => state.setMyCourses);

  const mainPageQuery = api.course.mainPage.useQuery();
  if (mainPageQuery.data) {
    const { popularCourses, myCourses } = mainPageQuery.data;

    setPopularCourses(popularCourses);

    if (myCourses) {
      setMyCourses(myCourses);
    }
  }

  return <CourseInfo />;
};

export default Home;
