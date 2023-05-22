import Logo from "~/app/header/Logo";
import AppBox from "./AppBox";

export type AppInfo = {
  title: string;
  icon: JSX.Element;
  shortInfo: string;
};

const APPS = {
  ide: {
    title: "Plasma IDE",
    icon: <Logo variant="classic" />,
    shortInfo: "IDE for learning assembly language",
  },
  lms: {
    title: "Plasma LMS",
    icon: <Logo variant="gray" />,
    shortInfo: "Learning management system for teachers",
  },
} as Record<string, AppInfo>;

const AppsContainer = () => {
  return (
    <div className="mx-24 mt-2 flex gap-4">
      {Object.values(APPS).map((el, idx) => (
        <AppBox key={idx} appInfo={el} />
      ))}
    </div>
  );
};

export default AppsContainer;
