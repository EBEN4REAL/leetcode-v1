import Dropdown from "@/components/Dropdown/dropdown";
import { RxCaretRight } from "react-icons/rx";
import { RxCaretLeft } from "react-icons/rx";
import usePagination from "@/hooks/usePagination";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { problemsState } from "../../atoms/problemsAtom";
import { RxCaretDown } from "react-icons/rx";
import { closeDropDowns } from "@/utils/handleDropClose";

interface PaginationProps<T> {
  list: T[];
  handleDropdownClose: () => void;
}

const Pagination = <T,>({ list, handleDropdownClose }: PaginationProps<T>) => {
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
  } = usePagination(list, 8);

  const setPaginatedList = useSetRecoilState(problemsState);

  useEffect(() => {
    setPaginatedList((prev) => ({ ...prev, paginatedProblems: paginatedList }));
  }, [paginatedList, setPaginatedList]);

  const dropdownHeader = `${pageSize} / page`;

  useEffect(() => {
    closeDropDowns();
  }, [pageSize]);

  return (
    <>
      <div className="py-3 md:flex lg:flex flex flex-col-reverse md:flex-row lg:flex-row justify-between relative">
        <div className="w-[150px] mx-auto md:mx-0 lg:mx-0 py-7 md:w-auto lg:w-auto md:py-0 lg:py-0">
          <Dropdown header={dropdownHeader}>
            <div
              className={`dropdown_content absolute top-9 left-0 p-3 dark:bg-dark-overlay-3 bg-white shadow-md rounded-lg hidden max-w-[15rem] min-w-[8.75rem] overflow-auto `}
            >
              {[4, 8, 10].map((_pageSize, index) => (
                <div
                  key={`pageSize__${index}`}
                  id="pagination-btn"
                  className={`flex  justify-between dark:text-white text-sm hover:bg-gray-100 hover:dark:bg-dark-fill-3 rounded-md ${
                    pageSize === _pageSize ? "" : ""
                  }  hover:dark:bg-dark-fill-3 hover:rounded-md px-2 py-1.5 whitespace-nowrap`}
                  onClick={() => {
                    setPageSize(_pageSize);
                  }}
                >
                  {_pageSize} / page
                  {pageSize === _pageSize && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      className="h-5 w-5 text-blue-600"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.688 15.898l-3.98-3.98a1 1 0 00-1.415 1.414L8.98 18.02a1 1 0 001.415 0L20.707 7.707a1 1 0 00-1.414-1.414l-9.605 9.605z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </Dropdown>
        </div>
        <div className="flex justify-center gap-2 w-full md:w-auto lg:w-auto mx-auto md:mx-0 lg:mx-0">
          <div
            className={`flex items-center justify-center px-1.5 h-8 w-9 rounded select-none focus:outline-none bg-fill-3 dark:bg-dark-fill-3  dark:text-dark-label-2 hover:bg-fill-2 dark:hover:bg-dark-fill-2  ${
              !paginationBtns.hasPrev ? "cursor-not-allowed" : "cursor-pointer "
            } `}
          >
            <RxCaretLeft
              className={`text-2xl font-bold  ${
                !paginationBtns.hasPrev
                  ? " text-gray-300 dark:text-gray-500"
                  : " text-dark dark: dark:text-gray-200"
              }`}
              onClick={() => {
                setPrevPage();
                closeDropDowns();
              }}
            />
          </div>
          {paginationLink.map(
            (num, index) =>
              num !== "..." && (
                <div
                  key={`paginator_btn_${index}`}
                  className={`flex items-center justify-center px-3 h-8 rounded select-none focus:outline-none bg-fill-3 dark:bg-dark-fill-3 text-label-2 dark:text-dark-label-2 hover:bg-fill-2 dark:hover:bg-dark-fill-2 ${
                    currentPage === num
                      ? "bg-white shadow-md dark:bg-[#5c5c5c]"
                      : ""
                  }   cursor-pointer text-sm  `}
                  onClick={
                    typeof num === "number"
                      ? () => {
                          setCurrentPage(num);
                          closeDropDowns();
                        }
                      : undefined
                  }
                >
                  {num}
                </div>
              )
          )}
          <div
            className={`flex items-center justify-center  px-1.5 h-8 w-9  rounded select-none focus:outline-none bg-fill-3 dark:bg-dark-fill-3 text-dark dark:text-dark-label-2 hover:bg-fill-2 dark:hover:bg-dark-fill-2  ${
              !paginationBtns.hasNext ? "cursor-not-allowed" : "cursor-pointer "
            } `}
          >
            <RxCaretRight
              className={`text-2xl font-bold  ${
                !paginationBtns.hasNext
                  ? " text-gray-300 dark:text-gray-500"
                  : " text-dark dark: dark:text-gray-200"
              }`}
              onClick={() => {
                setNextPage();
                closeDropDowns();
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagination;
