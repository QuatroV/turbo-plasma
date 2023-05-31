import { type GetServerSidePropsContext, type NextPage } from "next";

import PeopleHeader from "~/app/people/components/PeopleHeader";
import PeopleList from "~/app/people/components/PeopleList";

type Props = {
  courseId: string;
};

const People: NextPage<Props> = ({ courseId }) => {
  return (
    <main className=" scrollbar font-rubik flex flex-auto flex-col gap-2 overflow-y-auto overflow-x-hidden p-2 ">
      <PeopleHeader />
      <PeopleList />
    </main>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;

  console.log({ params });

  const courseId =
    Array.isArray(params) && params ? params.join("") : params?.courses;

  return { props: { courseId } };
}

export default People;
