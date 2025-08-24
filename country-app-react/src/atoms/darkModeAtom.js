import { atom } from "jotai";

export const darkModeAtom = atom(true);
export const toggleDarkModeAtom = atom(
  (get) => get(darkModeAtom),
  (get, set) => set(darkModeAtom, !get(darkModeAtom))
);
