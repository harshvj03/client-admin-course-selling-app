// atoms.ts
import { atom } from "recoil";

export const loginState = atom<boolean>({
  key: "loginState",
  default: false,
});

export const tokenState = atom<string>({
  key: "tokenState",
  default: "",
});

export const modeState = atom<boolean>({
  key: "mode",
  default: false,
});

export const fakeReloadState = atom<boolean>({
  key: "fakeReload",
  default: false,
});

export const coursesDataState = atom<Course[]>({
  key: "courseData",
  default: [],
});
