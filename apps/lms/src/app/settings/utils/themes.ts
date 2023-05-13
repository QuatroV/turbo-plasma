import { THEMES } from "../constants/themes";
import { Theme } from "../stores/settingsStores";

export const getBackgroundById = (id: Theme) =>
  THEMES.find((theme) => theme.id === id)?.background;
