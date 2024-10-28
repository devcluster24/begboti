"use client";
import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  currentPage,
  onPageChange,
}) => {
  const [loading, setLoading] = useState(false);
  const numberOfPages = Math.ceil(totalItems / itemsPerPage);
  const pages = Array.from(Array(numberOfPages).keys());

  const handlePrevPage = () => {
    setLoading(true);
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
    setLoading(false);
  };

  const handleNextPage = () => {
    setLoading(true);
    if (currentPage < numberOfPages) {
      onPageChange(currentPage + 1);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center gap-5 py-10 lg:px-20 px-5 w-full justify-center">
      <button
        disabled={currentPage === 1}
        onClick={handlePrevPage}
        className={`bg-[#E7F0FA] flex items-center justify-center h-10 w-10 rounded-full text-2xl ${
          currentPage === 1 ? "text-[#99C2FF]" : "text-primary"
        }`}
      >
        <IoIosArrowBack />
      </button>
      {pages.map((page) => (
        <button
          onClick={() => onPageChange(page + 1)}
          key={page + 1}
          className={`${
            currentPage === page + 1
              ? "bg-gray-400 text-white"
              : "bg-[#F1F2F4] text-[#5E6670]"
          } flex items-center justify-center h-10 w-10 rounded-full text-lg font-medium`}
        >
          {page + 1}
        </button>
      ))}
      <button
        disabled={currentPage === numberOfPages}
        onClick={handleNextPage}
        className={`bg-[#E7F0FA] flex items-center justify-center h-10 w-10 rounded-full text-2xl ${
          currentPage === numberOfPages ? "text-[#99C2FF]" : "text-primary"
        }`}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Pagination;
