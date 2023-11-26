import { useRouter } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const prevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const router = useRouter();

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 rounded max-w-[250px] mx-auto mt-4">
      <button
        className={`p-2 text-gray-500 dark:text-gray-400 rounded-md ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100 dark:hover:bg-slate-800"
        }`}
        onClick={prevPage}
        disabled={currentPage === 1}
      >
        <FaChevronLeft />
      </button>

      <span className="text-gray-600 dark:text-gray-400">
        Page {currentPage} of {totalPages}
      </span>

      <button
        className={`p-2 text-gray-500 dark:text-gray-400 rounded-md ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100 dark:hover:bg-slate-800"
        }`}
        onClick={nextPage}
        disabled={currentPage === totalPages}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};
