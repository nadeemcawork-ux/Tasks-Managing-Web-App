const ProgressBar = ({ total, completed }) => {
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100)

    return (
        <div className="mb-6">
            <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-[#5C645F] dark:text-[#9AA39D]">
                    {completed} of {total} tasks completed
                </span>
                <span className="text-sm font-medium text-[#1C2321] dark:text-[#E7E9E4]">
                    {percent}%
                </span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#EDEFEB] dark:bg-[#2A3138] overflow-hidden">
                <div
                    className="h-full bg-[#2F6F5E] transition-all duration-300"
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    )
}

export default ProgressBar