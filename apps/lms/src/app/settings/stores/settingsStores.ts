import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type Theme = "classic" | "sunrise" | "midnight" | "forest";

interface settingsState {
  currentTheme: Theme;
  setCurrentTheme: (currentTheme: Theme) => void;
}

const useSettingStore = create<settingsState>()(
  persist(
    devtools((set) => ({
      currentTheme: "classic",
      setCurrentTheme(currentTheme) {
        set({ currentTheme });
      },
    })),
    {
      name: "app-settings",
    }
  )
);

export default useSettingStore;
