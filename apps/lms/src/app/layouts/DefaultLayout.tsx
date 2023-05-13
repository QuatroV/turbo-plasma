import Head from "next/head";
import useGetFromStore from "~/hooks/useGetFromStore";
import clsxm from "~/utils/clsxm";
import AuthModal from "../auth/components/AuthModal";
import ProfileModal from "../auth/components/ProfileModal";
import AddLessonModal from "../courseInfo/components/CreateLessonModal";
import Header from "../header/Header";
import TaskModal from "../lessonTasks/components/TaskModal";
import useSettingStore from "../settings/stores/settingsStores";
import { getBackgroundById } from "../settings/utils/themes";
import Sidebar from "../sidebar/components/Sidebar";

type Props = {
  className?: string;
  children: React.ReactNode;
  [x: string]: any;
};

const DefaultLayout = ({ className = "", children, ...other }: Props) => {
  const currentTheme = useGetFromStore(
    useSettingStore,
    (state) => state.currentTheme
  );

  const themeString = getBackgroundById(currentTheme || "classic");

  return (
    <>
      <Head>
        <title>Plasma IDE</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={clsxm(themeString, "flex h-screen flex-col")}>
        <TaskModal />
        <ProfileModal />
        <AuthModal />
        <AddLessonModal />
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          {children}
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
