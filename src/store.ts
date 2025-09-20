import { create } from "zustand";

type State = {
  suggestions: string[];
  setSuggestions: (s: string[]) => void;
};
export const useApp = create<State>((set) => ({
  suggestions: [],
  setSuggestions: (s) => set({ suggestions: s }),
}));
