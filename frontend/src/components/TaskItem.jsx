const PRIORITY_COLORS = {
    low: "text-[#2F6F5E] bg-[#2F6F5E]/10",
    medium: "text-[#B08900] bg-[#B08900]/10",
    high: "text-[#C0392B] bg-[#C0392B]/10",
}

const formatDate = (dateStr) => {
    if (!dateStr) return null
    const d = new Date(dateStr)
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
}

const TaskItem = ({ task, onToggleStatus, onEdit, onDelete }) => {
    const isCompleted = task.status === "completed"

    return (
        <div className="flex items-start gap-3 p-4 rounded-lg border border-[#DDE0DB] dark:border-[#2A3138] bg-white dark:bg-[#1F2428]">
            <input
                type="checkbox"
                checked={isCompleted}
                onChange={() => onToggleStatus(task)}
                className="mt-1 h-4 w-4 accent-[#2F6F5E] cursor-pointer"
            />

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <h3
                        className={`font-medium text-[#1C2321] dark:text-[#E7E9E4] ${
                            isCompleted ? "line-through opacity-60" : ""
                        }`}
                    >
                        {task.title}
                    </h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${PRIORITY_COLORS[task.priority]}`}>
                        {task.priority}
                    </span>
                </div>

                {task.description && (
                    <p
                        className={`text-sm text-[#5C645F] dark:text-[#9AA39D] mt-1 ${
                            isCompleted ? "line-through opacity-60" : ""
                        }`}
                    >
                        {task.description}
                    </p>
                )}

                {task.dueDate && (
                    <p className="text-xs text-[#5C645F] dark:text-[#9AA39D] mt-1">
                        Due {formatDate(task.dueDate)}
                    </p>
                )}
            </div>

            <div className="flex gap-2 shrink-0">
                <button
                    onClick={() => onEdit(task)}
                    className="text-sm text-[#2F6F5E] hover:opacity-80 transition"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(task._id)}
                    className="text-sm text-red-600 hover:opacity-80 transition"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default TaskItem