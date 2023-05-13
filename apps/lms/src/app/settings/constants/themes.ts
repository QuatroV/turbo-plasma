import { Theme } from "../stores/settingsStores";

type ThemeInfo = {
  id: Theme;
  background: string;
};

export const THEMES: ThemeInfo[] = [
  {
    id: "classic",
    background: "bg-mesh-gradient",
  },
  {
    id: "sunrise",
    background: "bg-mesh-sunrise",
  },
  {
    id: "midnight",
    background: "bg-mesh-midnight",
  },
  {
    id: "forest",
    background: "bg-mesh-forest",
  },
];
