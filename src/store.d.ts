type State = {
    suggestions: string[];
    setSuggestions: (s: string[]) => void;
};
export declare const useApp: import("zustand").UseBoundStore<import("zustand").StoreApi<State>>;
export {};
