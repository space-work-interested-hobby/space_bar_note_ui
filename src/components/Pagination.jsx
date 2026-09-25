import { useState } from 'react';

/**
 * Pagination Component
 * Component phân trang tái sử dụng cho các list
 */
const MS = ({ name, className = '', filled = false }) => (
  <span className={`material-symbols-outlined ${filled ? 'material-symbols-filled' : ''} ${className}`}>
    {name}
  </span>
);

export default function Pagination({
  currentPage = 1,
  totalItems = 0,
  itemsPerPage = 12,
  onPageChange,
  showInfo = true,
  className = '',
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (totalPages <= 1) return null;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 py-4 ${className}`}>
      {showInfo && (
        <span className="text-body-sm text-on-surface-variant">
          Hiển thị <span className="text-primary font-semibold">{startItem}-{endItem}</span> của{' '}
          <span className="text-primary font-semibold">{totalItems}</span> mục
        </span>
      )}

      <div className="flex items-center gap-1">
        {/* First & Previous buttons */}
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
            currentPage === 1
              ? 'bg-surface-obsidian text-cream-muted cursor-not-allowed opacity-50'
              : 'bg-surface-slate hover:bg-surface-smoke text-cream-text hover:text-primary'
          }`}
          title="Trang đầu"
        >
          <MS name="first_page" className="text-lg" />
        </button>
        
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
            currentPage === 1
              ? 'bg-surface-obsidian text-cream-muted cursor-not-allowed opacity-50'
              : 'bg-surface-slate hover:bg-surface-smoke text-cream-text hover:text-primary'
          }`}
          title="Trang trước"
        >
          <MS name="chevron_left" className="text-lg" />
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1 mx-1">
          {getVisiblePages().map((page, index) => (
            page === '...' ? (
              <span
                key={`ellipsis-${index}`}
                className="w-10 h-10 flex items-center justify-center text-cream-muted"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg font-label-md text-label-md transition-all ${
                  currentPage === page
                    ? 'bg-primary-container text-on-primary-container shadow-sm'
                    : 'bg-surface-slate hover:bg-surface-smoke text-cream-text hover:text-primary'
                }`}
              >
                {page}
              </button>
            )
          ))}
        </div>

        {/* Next & Last buttons */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
            currentPage === totalPages
              ? 'bg-surface-obsidian text-cream-muted cursor-not-allowed opacity-50'
              : 'bg-surface-slate hover:bg-surface-smoke text-cream-text hover:text-primary'
          }`}
          title="Trang sau"
        >
          <MS name="chevron_right" className="text-lg" />
        </button>
        
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
            currentPage === totalPages
              ? 'bg-surface-obsidian text-cream-muted cursor-not-allowed opacity-50'
              : 'bg-surface-slate hover:bg-surface-smoke text-cream-text hover:text-primary'
          }`}
          title="Trang cuối"
        >
          <MS name="last_page" className="text-lg" />
        </button>
      </div>

      {/* Items per page selector */}
      <div className="hidden sm:flex items-center gap-2">
        <span className="text-body-sm text-on-surface-variant">Mỗi trang:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onPageChange(1)}
          className="bg-surface-obsidian text-cream-text text-body-sm px-3 py-1.5 rounded-lg border border-surface-smoke focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
        >
          <option value={6}>6</option>
          <option value={12}>12</option>
          <option value={24}>24</option>
          <option value={48}>48</option>
        </select>
      </div>
    </div>
  );
}

// Hook để quản lý pagination state
export function usePagination(totalItems, defaultItemsPerPage = 12) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginate = (items) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const resetPagination = () => {
    setCurrentPage(1);
  };

  const changeItemsPerPage = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return {
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems,
    paginate,
    goToPage,
    resetPagination,
    changeItemsPerPage,
    startItem: (currentPage - 1) * itemsPerPage + 1,
    endItem: Math.min(currentPage * itemsPerPage, totalItems),
  };
}
