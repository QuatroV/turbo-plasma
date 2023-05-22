import { type AppInfo } from "./AppsContainer";

type Props = {
  appInfo: AppInfo;
};

const AppBox = ({ appInfo }: Props) => {
  return (
    <div className="bg-glass flex-1 cursor-pointer rounded-lg p-2 shadow transition-all">
      <div className="mb-2 flex items-center gap-4">
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
