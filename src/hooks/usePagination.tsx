import React, { useState, useMemo, SetStateAction } from "react";
import { useEffect } from "react";

const usePagination = <T,>(itemList: T[], _pageSize: number) => {
  const [list, setList] = useState<T[]>(itemList);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(_pageSize);
  const [paginationLink, setPaginationLink] = useState<(string | number)[]>([]);
  const [totalPages, setTotalPages] = useState<number>(
    Math.ceil(list.length / pageSize)
  );
  const setNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => (prev += 1));
    }
  };

  const setPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => (prev -= 1));
    }
  };

  useEffect(() => {
    setTotalPages((prev) => Math.ceil(list.length / pageSize));
  }, [list.length, pageSize]);

  const paginatedList = useMemo(() => {
    const clonedList: T[] = [...list];
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const newList = clonedList.slice(startIndex, endIndex);

    return newList;
  }, [list, currentPage, pageSize]);

  const paginationBtns = useMemo(() => {
    generatePagination(currentPage, totalPages);
    return {
      hasNext: currentPage < totalPages,
      hasPrev: currentPage > 1,
    };
  }, [currentPage, totalPages]);

  function generatePagination(currentPage: number, totalPages: number) {
    const delta = 2;
    const range = [];
    const links = [];

    range.push(1);
    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i > 1 && i < totalPages) {
        range.push(i);
      }
    }
    range.push(totalPages);

    let prevPage = null;
    for (const page of range) {
      if (prevPage) {
        if (page - prevPage === 2) {
          links.push(prevPage + 1);
        } else if (page - prevPage !== 1) {
          links.push("...");
        }
      }
      links.push(page);
      prevPage = page;
    }
    setPaginationLink(links)
  }

  return {
    currentPage,
    paginatedList,
    pageSize,
    paginationBtns,
    totalPages,
    paginationLink,
    setCurrentPage,
    setNextPage,
    setPrevPage,
    setPageSize,
  };
};

export default usePagination;
