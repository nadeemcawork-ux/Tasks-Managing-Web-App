import { useTheme } from "../context/ThemeContext"

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            onClick={toggleTheme}
            className="px-3 py-1.5 rounded-md border border-[#DDE0DB] dark:border-[#2A3138] text-sm text-[#1C2321] dark:text-[#E7E9E4] bg-white dark:bg-[#1F2428] hover:opacity-80 transition"
        >
            {theme === "light" ? "Dark mode" : "Light mode"}
        </button>
    )
}

export default ThemeToggle