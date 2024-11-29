import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const isBrowser = typeof window !== "undefined";

export const favouritesAtom = isBrowser
  ? atomWithStorage("favourites", [])
  : atom([]);

export const searchHistoryAtom = isBrowser
  ? atomWithStorage("searchHistory", [])
  : atom([]);

export const userAtom = isBrowser ? atomWithStorage("user", null) : atom([]);
