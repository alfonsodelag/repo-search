import React from 'react';

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
      <ul className="flex justify-between w-10/12 m-auto">
        <li>
          <button
            className="bg-black border-2 rounded-md text-white w-20 cursor-pointer"
            onClick={onPreviousPage}
            disabled={currentPage === 1}
            type="button"
          >
            Previous
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page && 'active'}`}
          >
            <p>Page: {currentPage}</p>
          </li>
        ))}
        <li>
          <button
            className="bg-black border-2 rounded-md text-white w-20 cursor-pointer"
            onClick={onNextPage}
            type="button"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
