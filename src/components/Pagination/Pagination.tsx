import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
}) => {
  return (
    <nav>
      <ul className="flex">
        <li className={`page-item ${currentPage === 1 && "disabled"}`}>
          <button
            className="bg-black border-2 rounded-md text-white w-20 cursor-pointer"
            onClick={onPreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page && "active"}`}
          >
            <p>{currentPage}</p>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
          <button
            className="bg-black border-2 rounded-md text-white w-20 cursor-pointer"
            onClick={onNextPage}
            // disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
