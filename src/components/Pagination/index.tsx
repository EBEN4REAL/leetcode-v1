import Dropdown from "@/components/Dropdown/dropdown";
import { RxCaretRight } from "react-icons/rx";
import { RxCaretLeft } from "react-icons/rx";
import usePagination from "@/hooks/usePagination";

interface PaginationProps<T> {
  list: T[];
}

const Pagination = <T,>({ list }: PaginationProps<T>) => {
  const {
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
  } = usePagination(list, 4);

  console.log("paginatedList", paginationLink);
  console.log("currentPage", currentPage);

  return (
    <>
      <div className="py-3 flex justify-between relative">
        <div>
          <Dropdown header={`${pageSize} / page`}>
            <div
              className={`dropdown-content absolute top-9 left-0 p-3 dark:bg-dark-overlay-3 rounded-lg hidden max-w-[15rem] min-w-[8.75rem] overflow-auto `}
            >
              {[4, 8, 10].map((pageSize, index) => (
                <div
                  key={`pageSize__${index}`}
                  className="flex  gap-4 dark:text-white text-sm hover:dark:bg-dark-fill-3 hover:rounded-md px-2 py-1.5 whitespace-nowrap"
                  onClick={() => setPageSize(pageSize)}
                >
                  {pageSize} / page
                </div>
              ))}
            </div>
          </Dropdown>
        </div>
        <div className="flex gap-2">
          <div
            className={`flex items-center p-1 justify-center  h-[32px] w-[37px] rounded-[5px] dark:bg-dark-fill-4   dark:hover:bg-dark-fill-3    ${
              !paginationBtns.hasPrev
                ? "cursor-not-allowed text-gray-500"
                : "cursor-pointer"
            } `}
          >
            <RxCaretLeft
              className="text-xl font-bold  tags-btn"
              onClick={() => setPrevPage()}
            />
          </div>
          {paginationLink
            .map((num, index) => (
              <div
                key={`paginator_btn_${index}`}
                className={`flex items-center p-1 justify-center  h-[32px] w-[32px] rounded-[5px]   dark:hover:bg-dark-fill-3 text-gray-200 ${currentPage === num ? 'bg-gray-500' : 'dark:bg-dark-fill-4 '}   cursor-pointer text-sm  `}
                onClick={() => setCurrentPage(index + 1)}
              >
                {num} 
              </div>
            ))}
          <div
            className={`flex items-center p-1 justify-center  h-[32px] w-[37px] rounded-[5px] dark:bg-dark-fill-4   dark:hover:bg-dark-fill-3  ${
              !paginationBtns.hasNext
                ? "cursor-not-allowed text-gray-500"
                : "cursor-pointer"
            } `}
          >
            <RxCaretRight
              className="text-xl font-bold  tags-btn"
              onClick={() => setNextPage()}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagination;
