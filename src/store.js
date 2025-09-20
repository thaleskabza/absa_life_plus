import { create } from "zustand";
export const useApp = create((set) => ({
    suggestions: [],
    setSuggestions: (s) => set({ suggestions: s }),
}));
