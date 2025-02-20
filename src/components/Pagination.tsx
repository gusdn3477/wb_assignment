import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex h-32 items-center space-x-2">
      <button onClick={() => handlePageClick(1)} disabled={currentPage === 1}>
        ≪
      </button>
      <button onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>
        〈
      </button>
      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;
        return (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={
              page === currentPage ? 'bg-blue-500 px-2 py-1 font-bold text-white' : 'px-2 py-1'
            }
          >
            {page}
          </button>
        );
      })}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        〉
      </button>
      <button onClick={() => handlePageClick(totalPages)} disabled={currentPage === totalPages}>
        ≫
      </button>
    </div>
  );
};

export default Pagination;
