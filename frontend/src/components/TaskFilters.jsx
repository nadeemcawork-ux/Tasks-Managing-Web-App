const FILTERS = ["all", "pending", "completed"]

const TaskFilters = ({ filter, setFilter, search, setSearch, onAddClick }) => {
    return (
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 px-3 py-2 rounded-md border border-[#DDE0DB] dark:border-[#2A3138] bg-white dark:bg-[#1F2428] text-[#1C2321] dark:text-[#E7E9E4] text-sm focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]"
            />

            <div className="flex gap-2">
                {FILTERS.map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-3 py-2 rounded-md text-sm capitalize border transition ${
                            filter === f
                                ? "bg-[#2F6F5E] text-white border-[#2F6F5E]"
                                : "bg-white dark:bg-[#1F2428] text-[#1C2321] dark:text-[#E7E9E4] border-[#DDE0DB] dark:border-[#2A3138] hover:opacity-80"
                        }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <button
                onClick={onAddClick}
                className="px-4 py-2 rounded-md bg-[#2F6F5E] text-white text-sm font-medium hover:opacity-90 transition"
            >
                + Add Task
            </button>
        </div>
    )
}

export default TaskFilters