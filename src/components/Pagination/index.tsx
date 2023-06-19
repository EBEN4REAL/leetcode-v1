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
              className={`dropdown_content absolute top-9 left-0 p-3 dark:bg-dark-overlay-3 rounded-lg hidden max-w-[15rem] min-w-[8.75rem] overflow-auto `}
            >
              {[4, 8, 10].map((pageSize, index) => (
                <div
                  key={`pageSize__${index}`}
                  id="pagination-btn"
                  className="flex  gap-4 dark:text-white text-sm hover:dark:bg-dark-fill-3 hover:rounded-md px-2 py-1.5 whitespace-nowrap"
                  onClick={() => {
                    console.log("hchnage page size")
                    setPageSize(pageSize)
                  }}
                >
                  {pageSize} / page
                </div>
              ))}
            </div>
          </Dropdown>
        </div>
        <div className="flex justify-center gap-2 w-full md:w-auto lg:w-auto mx-auto md:mx-0 lg:mx-0">
          <div
            className={`flex items-center p-1 justify-center  h-[32px] w-[37px] rounded-[5px] dark:bg-dark-fill-4   dark:hover:bg-dark-fill-3    ${
              !paginationBtns.hasPrev
                ? "cursor-not-allowed text-gray-500"
                : "cursor-pointer"
            } `}
          >
            <RxCaretLeft
              className="text-xl font-bold  tags-btn"
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
                  className={`flex items-center p-1 justify-center  h-[32px] w-[32px] rounded-[5px]   dark:hover:bg-dark-fill-3 text-gray-200 ${
                    currentPage === num ? "bg-gray-500" : "dark:bg-dark-fill-4 "
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
            className={`flex items-center p-1 justify-center  h-[32px] w-[37px] rounded-[5px] dark:bg-dark-fill-4   dark:hover:bg-dark-fill-3  ${
              !paginationBtns.hasNext
                ? "cursor-not-allowed text-gray-500"
                : "cursor-pointer"
            } `}
          >
            <RxCaretRight
              className="text-xl font-bold  tags-btn"
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
