import { useState, useEffect, useCallback } from "react"
import api from "../api/axios"
import Navbar from "../components/Navbar"
import ProgressBar from "../components/ProgressBar"
import TaskFilters from "../components/TaskFilters"
import TaskList from "../components/TaskList"
import TaskForm from "../components/TaskForm"
import Pagination from "../components/Pagination"

const LIMIT = 10

const Dashboard = () => {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const [filter, setFilter] = useState("all")
    const [search, setSearch] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")

    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const [totalTasks, setTotalTasks] = useState(0)
    const [completedCount, setCompletedCount] = useState(0)

    const [showForm, setShowForm] = useState(false)
    const [editingTask, setEditingTask] = useState(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search)
            setPage(1)
        }, 400)
        return () => clearTimeout(timer)
    }, [search])

    useEffect(() => {
        setPage(1)
    }, [filter])

    const fetchTasks = useCallback(async () => {
        setLoading(true)
        setError("")
        try {
            const response = await api.get("/tasks", {
                params: {
                    status: filter,
                    search: debouncedSearch || undefined,
                    page,
                    limit: LIMIT,
                },
            })
            setTasks(response.data.tasks)
            setTotalPages(response.data.totalPages)
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load tasks")
        } finally {
            setLoading(false)
        }
    }, [filter, debouncedSearch, page])

    const fetchProgress = useCallback(async () => {
        try {
            const [allRes, completedRes] = await Promise.all([
                api.get("/tasks", { params: { status: "all", page: 1, limit: 1 } }),
                api.get("/tasks", { params: { status: "completed", page: 1, limit: 1 } }),
            ])
            setTotalTasks(allRes.data.totalTasks)
            setCompletedCount(completedRes.data.totalTasks)
        } catch (err) {
      
        }
    }, [])

    useEffect(() => {
        fetchTasks()
    }, [fetchTasks])

    useEffect(() => {
        fetchProgress()
    }, [fetchProgress, tasks])

    const handleCreate = async (data) => {
        const response = await api.post("/tasks", data)

        if (page === 1) {
            fetchTasks()
        } else {
            setPage(1)
        }
        return response.data.task
    }

    const handleUpdate = async (id, data) => {
        const response = await api.put(`/tasks/${id}`, data)
        const updated = response.data.task
        setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)))
        fetchProgress()
        return updated
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this task?")) return
        try {
            await api.delete(`/tasks/${id}`)
            if (tasks.length === 1 && page > 1) {
                setPage((p) => p - 1)
            } else {
                fetchTasks()
            }
            fetchProgress()
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete task")
        }
    }

    const handleToggleStatus = async (task) => {
        const newStatus = task.status === "completed" ? "pending" : "completed"
        try {
            const response = await api.put(`/tasks/${task._id}`, { status: newStatus })
            const updated = response.data.task

            if (filter !== "all" && updated.status !== filter) {
                setTasks((prev) => prev.filter((t) => t._id !== task._id))
            } else {
                setTasks((prev) => prev.map((t) => (t._id === task._id ? updated : t)))
            }
            fetchProgress()
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update task")
        }
    }

    const openEditForm = (task) => {
        setEditingTask(task)
        setShowForm(true)
    }

    const openCreateForm = () => {
        setEditingTask(null)
        setShowForm(true)
    }

    const closeForm = () => {
        setShowForm(false)
        setEditingTask(null)
    }

    const handleFormSubmit = async (data) => {
        if (editingTask) {
            await handleUpdate(editingTask._id, data)
        } else {
            await handleCreate(data)
        }
    }

    return (
        <div className="min-h-screen bg-[#F5F6F4] dark:bg-[#15191C]">
            <Navbar />

            <div className="max-w-3xl mx-auto px-4 py-8">
                <ProgressBar total={totalTasks} completed={completedCount} />

                <TaskFilters
                    filter={filter}
                    setFilter={setFilter}
                    search={search}
                    setSearch={setSearch}
                    onAddClick={openCreateForm}
                />

                {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

                {loading ? (
                    <p className="text-center text-sm text-[#5C645F] dark:text-[#9AA39D] py-12">
                        Loading tasks...
                    </p>
                ) : (
                    <>
                        <TaskList
                            tasks={tasks}
                            onToggleStatus={handleToggleStatus}
                            onEdit={openEditForm}
                            onDelete={handleDelete}
                        />
                        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                    </>
                )}
            </div>

            {showForm && (
                <TaskForm
                    initialTask={editingTask}
                    onSubmit={handleFormSubmit}
                    onClose={closeForm}
                />
            )}
        </div>
    )
}

export default Dashboard