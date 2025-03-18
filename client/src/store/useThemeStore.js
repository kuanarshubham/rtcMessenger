import { create } from "zustand";

const getThemeFromLocalStorage = localStorage.getItem("chat-theme");

const useThemeStore = create((set) => ({
    theme: getThemeFromLocalStorage ?? "forest",

    setTheme: (newThemeVal) => {
        localStorage.setItem("chat-theme", newThemeVal);
        set({themeVal: newThemeVal});
        window.location.reload();
    }
}));

export default useThemeStore;