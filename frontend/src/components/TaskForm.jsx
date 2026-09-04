import { useState } from "react"

const TaskForm = ({ initialTask, onSubmit, onClose }) => {
    const [title, setTitle] = useState(initialTask?.title || "")
    const [description, setDescription] = useState(initialTask?.description || "")
    const [priority, setPriority] = useState(initialTask?.priority || "medium")
    const [dueDate, setDueDate] = useState(
        initialTask?.dueDate ? initialTask.dueDate.slice(0, 10) : ""
    )
    const [error, setError] = useState("")
    const [saving, setSaving] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (!title.trim()) {
            setError("Title is required")
            return
        }

        setSaving(true)
        try {
            await onSubmit({
                title: title.trim(),
                description: description.trim(),
                priority,
                dueDate: dueDate || null,
            })
            onClose()
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong")
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white dark:bg-[#1F2428] p-6 rounded-lg border border-[#DDE0DB] dark:border-[#2A3138]"
            >
                <h2 className="text-lg font-semibold text-[#1C2321] dark:text-[#E7E9E4] mb-4">
                    {initialTask ? "Edit Task" : "New Task"}
                </h2>

                {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

                <label className="block text-sm text-[#5C645F] dark:text-[#9AA39D] mb-1">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full mb-3 px-3 py-2 rounded-md border border-[#DDE0DB] dark:border-[#2A3138] bg-transparent text-[#1C2321] dark:text-[#E7E9E4] focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]"
                />

                <label className="block text-sm text-[#5C645F] dark:text-[#9AA39D] mb-1">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full mb-3 px-3 py-2 rounded-md border border-[#DDE0DB] dark:border-[#2A3138] bg-transparent text-[#1C2321] dark:text-[#E7E9E4] focus:outline-none focus:ring-2 focus:ring-[#2F6F5E] resize-none"
                />

                <div className="flex gap-3 mb-4">
                    <div className="flex-1">
                        <label className="block text-sm text-[#5C645F] dark:text-[#9AA39D] mb-1">Priority</label>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full px-3 py-2 rounded-md border border-[#DDE0DB] dark:border-[#2A3138] bg-transparent text-[#1C2321] dark:text-[#E7E9E4] focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div className="flex-1">
                        <label className="block text-sm text-[#5C645F] dark:text-[#9AA39D] mb-1">Due date</label>
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full px-3 py-2 rounded-md border border-[#DDE0DB] dark:border-[#2A3138] bg-transparent text-[#1C2321] dark:text-[#E7E9E4] focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]"
                        />
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-2 rounded-md border border-[#DDE0DB] dark:border-[#2A3138] text-[#1C2321] dark:text-[#E7E9E4] hover:opacity-80 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex-1 py-2 rounded-md bg-[#2F6F5E] text-white font-medium hover:opacity-90 transition disabled:opacity-50"
                    >
                        {saving ? "Saving..." : "Save"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default TaskForm