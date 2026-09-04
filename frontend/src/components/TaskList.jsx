import TaskItem from "./TaskItem"

const TaskList = ({ tasks, onToggleStatus, onEdit, onDelete }) => {
    if (tasks.length === 0) {
        return (
            <p className="text-center text-sm text-[#5C645F] dark:text-[#9AA39D] py-12">
                No tasks found.
            </p>
        )
    }

    return (
        <div className="flex flex-col gap-3">
            {tasks.map((task) => (
                <TaskItem
                    key={task._id}
                    task={task}
                    onToggleStatus={onToggleStatus}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    )
}

export default TaskList