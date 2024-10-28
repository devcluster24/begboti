"use client";

import NewsCard from "@/components/NewsCard";
import Pagination from "@/components/Pagination";
import React, { useState } from "react";

interface PaginationClientProps {
  itemsPerPage: number;
  totalItems: number;
  newsItems: Array<any>;
  colNum: number;
}

const PaginationClient: React.FC<PaginationClientProps> = ({
  itemsPerPage,
  totalItems,
  newsItems,
  colNum,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="fle flex-col items-center w-full gap-y-5">
      <div
        className={`w-full grid lg:grid-cols-${colNum} md:grid-cols-2 grid-cols-1 row-auto items-stretch gap-5`}
      >
        {currentItems.map((newsItem) => (
          <NewsCard key={newsItem.id} news={newsItem} />
        ))}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default PaginationClient;
