import { useAuth } from "../context/AuthContext"
import ThemeToggle from "./ThemeToggle"

const Navbar = () => {
    const { user, logout } = useAuth()

    return (
        <nav className="border-b border-[#DDE0DB] dark:border-[#2A3138] bg-white dark:bg-[#1F2428]">
            <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
                <h1 className="text-xl font-semibold text-[#1C2321] dark:text-[#E7E9E4]">
                    Task Manager
                </h1>

                <div className="flex items-center gap-3">
                    <span className="hidden sm:inline text-sm text-[#5C645F] dark:text-[#9AA39D]">
                        Hi, {user?.name}
                    </span>
                    <ThemeToggle />
                    <button
                        onClick={logout}
                        className="px-3 py-1.5 rounded-md border border-[#DDE0DB] dark:border-[#2A3138] text-sm text-[#1C2321] dark:text-[#E7E9E4] bg-white dark:bg-[#1F2428] hover:opacity-80 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar