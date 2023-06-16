import React, { useState, useMemo, SetStateAction, useEffect } from "react";

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
    setTotalPages((prev) => Math.ceil(itemList.length / pageSize));
  }, [itemList.length, pageSize]);

  useEffect(() => {
    setCurrentPage(1)
  }, [pageSize])

  const paginatedList = useMemo(() => {
    const clonedList: T[] = [...itemList];
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const newList = clonedList.slice(startIndex, endIndex);

    return newList;
  }, [itemList, currentPage, pageSize]);

  const paginationBtns = useMemo(() => {
    getPaginationLinks(currentPage, totalPages, 6);
    return {
      hasNext: currentPage < totalPages,
      hasPrev: currentPage > 1,
    };
  }, [currentPage, totalPages]);

  function getPaginationLinks(
    currentPage: number,
    totalPages: number,
    maxVisiblePages: number
  ): void {
    const links: Array<number | string> = [];

    if (totalPages <= maxVisiblePages) {
      // If the total number of pages is less than or equal to the maximum visible pages,display all page links.
      for (let i = 1; i <= totalPages; i++) {
        links.push(i);
      }
    } else {
      // Calculate the range of page links to display around the current page.
      const halfVisiblePages = Math.floor(maxVisiblePages / 2);
      let startPage = currentPage - halfVisiblePages;
      let endPage = currentPage + halfVisiblePages;

      if (startPage < 1) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (endPage > totalPages) {
        endPage = totalPages;
        startPage = totalPages - maxVisiblePages + 1;
      }

      // Add the first page link.
        links.push(1);

        if(startPage === 1) {
            links.shift()
        }

      // Add dots if the range of page links is not adjacent to the first page.
      if (startPage > 2) {
        links.push("...");
      }

      // Add the page links within the range.
      for (let i = startPage; i <= endPage; i++) {
        links.push(i);
      }

      // Add dots if the range of page links is not adjacent to the last page.
      if (endPage < totalPages - 1) {
        links.push("...");
      }
      // Add the last page link.
      links.push(totalPages);

      if(endPage === totalPages) {
        links.pop()
      }
    }
    setPaginationLink(links);
  }

  return {
    currentPage,
    paginatedList,
    pageSize,
    paginationBtns,
    totalPages,
    paginationLink,
    setTotalPages,
    setList,
    setCurrentPage,
    setNextPage,
    setPrevPage,
    setPageSize,
  };
};

export default usePagination;
