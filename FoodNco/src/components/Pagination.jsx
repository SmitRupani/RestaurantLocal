import React from "react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  if (totalPages <= 1) return null;

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center gap-2 mt-4">
      <button
        className="px-3 py-1 rounded bg-gray-200"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Prev
      </button>
      {pageNumbers.map((num) => (
        <button
          key={num}
          className={`px-3 py-1 rounded ${num === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setCurrentPage(num)}
        >
          {num}
        </button>
      ))}
      <button
        className="px-3 py-1 rounded bg-gray-200"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
