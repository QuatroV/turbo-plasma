import clsxm from "~/utils/clsxm";
import { THEMES } from "../constants/themes";
import useSettingStore, { Theme } from "../stores/settingsStores";

const ThemePicker = () => {
  const currentTheme = useSettingStore((state) => state.currentTheme);
  const setCurrentTheme = useSettingStore((state) => state.setCurrentTheme);

  return (
    <div className="mb-2 rounded-lg p-2">
      <div className="flex gap-2">
        {THEMES.map((theme) => (
          <div
            className={clsxm(
              theme.background,
              "flex h-20 w-20   items-end justify-center rounded-lg border ",
              currentTheme === theme.id
                ? "border-white "
                : "cursor-pointer border-gray-700 text-white shadow"
            )}
            onClick={() => setCurrentTheme(theme.id)}
          >
            <div
              className={clsxm(
                "rounded-t-xl px-2 text-xs italic",
                currentTheme === theme.id ? "bg-white" : "bg-gray-700"
              )}
            >
              {theme.id}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemePicker;
