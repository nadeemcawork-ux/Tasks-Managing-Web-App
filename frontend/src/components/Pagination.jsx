const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null

    return (
        <div className="flex items-center justify-center gap-3 mt-6">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="px-3 py-1.5 rounded-md border border-[#DDE0DB] dark:border-[#2A3138] text-sm text-[#1C2321] dark:text-[#E7E9E4] bg-white dark:bg-[#1F2428] hover:opacity-80 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
                Prev
            </button>

            <span className="text-sm text-[#5C645F] dark:text-[#9AA39D]">
                Page {currentPage} of {totalPages}
            </span>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="px-3 py-1.5 rounded-md border border-[#DDE0DB] dark:border-[#2A3138] text-sm text-[#1C2321] dark:text-[#E7E9E4] bg-white dark:bg-[#1F2428] hover:opacity-80 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
                Next
            </button>
        </div>
    )
}

export default Pagination