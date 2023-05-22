import { type AppInfo } from "./AppsContainer";

type Props = {
  appInfo: AppInfo;
};

const AppBox = ({ appInfo }: Props) => {
  return (
    <div className="bg-glass flex flex-1 cursor-pointer items-center rounded-xl p-3 shadow transition-all hover:-translate-y-1">
      <div className=" flex items-center gap-4">
        <div className="w-14 rounded-full bg-white p-2">{appInfo.icon}</div>
        <div className="text-gray-600">
          <div className=" text-lg font-black text-gray-700">
            {appInfo.title}
          </div>
          <div className="text-sm">{appInfo.shortInfo}</div>
        </div>
      </div>
    </div>
  );
};

export default AppBox;
