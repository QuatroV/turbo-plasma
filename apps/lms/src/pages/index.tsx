import { type NextPage } from "next";
import { useEffect } from "react";
import CourseInfo from "~/app/courseInfo/components/CourseInfo";
import usePagesStore from "~/stores/pageStore";
import useSearchStore from "~/stores/searchStore";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const setCurrentPage = usePagesStore((state) => state.setCurrentPage);

  useEffect(() => setCurrentPage("search"), []);

  const setPopularCourses = useSearchStore((state) => state.setPopularCourses);

  const mainPageQuery = api.course.mainPage.useQuery();
  if (mainPageQuery.data) {
    setPopularCourses(mainPageQuery.data);
  }

  return <CourseInfo />;
};

export default Home;
