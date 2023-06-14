import React, { useState, useMemo } from "react";
import LInput from "../Base_input/input";
import { RxCaretRight } from "react-icons/rx";
import { RxCaretLeft } from "react-icons/rx";
import { BiSearch } from "react-icons/bi";
import { SwiperSlide } from "swiper/react";
import Slides from "../Swiper/Slides";

interface CompanyTagsProps {
  companies: { name: string; count: number }[];
}

const CompanyTags: React.FC<CompanyTagsProps> = ({ companies }) => {
  const [tagQuery, setTagQuery] = useState<string>("");

  /**
   * Pagination starts
   */
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [totalPages, setTotalPages] = useState<number>(
    Math.ceil(companies.length / pageSize)
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

  const paginatedCompanies = useMemo(() => {
    const clonedCompanies: { name: string; count: number }[] = [...companies];
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const newCompanies = clonedCompanies.slice(startIndex, endIndex);

    return newCompanies;
  }, [companies, currentPage, pageSize]);

  const paginationBtns = useMemo(() => {
    return {
      hasNext: currentPage < totalPages,
      hasPrev: currentPage > 1,
    };
  }, [currentPage, totalPages]);

  const filteredCompanies = useMemo(() => {
    const clonedCompanies = [...companies];

    const trimmedCompanies = clonedCompanies.filter((company) =>
      company.name.toLowerCase().includes(tagQuery.toLowerCase())
    );
    const tags = tagQuery.length > 0 ? trimmedCompanies : clonedCompanies;
    setTotalPages((_) => Math.ceil(tags.length / pageSize));

    return tags;
  }, [companies, pageSize, tagQuery]);

  let startIndex = 0;
  let endIndex = 10;
  let page = 1;

  const companiesSliders = Array(totalPages)
    .fill(undefined)
    .map((_, index) => {
      let clonedCompanies = [...filteredCompanies];
      startIndex = (page - 1) * pageSize;
      endIndex = startIndex + pageSize;
      let slidesArr = clonedCompanies.slice(startIndex, endIndex);

      const slidesPageHtml = slidesArr.map((slide, _idx) => {
        return (
          <div
            key={`company_slide_${(Math.random() + 1) * 163636636373373}`}
            className="rounded-full dark:text-dark-label-2 py-1 px-2 dark:bg-dark-fill-3 max-h-[32px]"
          >
            <span className="text-sm">{slide.name} </span>
            <span className="bg-brand-orange rounded-full px-1.5 text-gray-700 text-sm">
              {slide.count}
            </span>
          </div>
        );
      });

      page += 1;

      return (
        <SwiperSlide key={`slide___${index}`}>{slidesPageHtml}</SwiperSlide>
      );
    });

  const handleTagsPaginationBtns = () => {
    const tagsBtns = Array.from(document.querySelectorAll(".tags-btn"));
    tagsBtns.forEach((tagBtn) => {
      if (tagBtn.classList.contains("swiper-button-disabled")) {
        tagBtn.classList.add("disabled_btn");
      } else {
        tagBtn.classList.remove("disabled_btn");
        tagBtn.classList.add("enabled-btn");
      }
    });
  };

  handleTagsPaginationBtns();

  return (
    <>
      <div className="w-full  py-3 px-3 rounded-[8px] bg-dark-layer-1 mt-3">
        <div className="flex items-center justify-between">
          <div className="dark:text-dark-label-2">Companies</div>
          <div className="flex justify-center items-center gap-1">
            <div
              className={`flex items-center justify-center  h-[25px] w-[25px] rounded-[5px] dark:bg-dark-fill-4   dark:hover:bg-dark-fill-3   cursor-pointer  `}
            >
              <RxCaretLeft className="text-4xl font-bold prev tags-btn" />
            </div>
            <div
              className={`flex items-center justify-center  h-[25px] w-[25px] rounded-[5px] dark:bg-dark-fill-4   dark:hover:bg-dark-fill-3   cursor-pointer `}
            >
              <RxCaretRight className="text-4xl font-bold next tags-btn" />
            </div>
          </div>
        </div>
        <LInput
          handleInputChange={(e: React.FormEvent<HTMLInputElement>): void =>
            setTagQuery((e.target as HTMLInputElement).value)
          }
          config={{
            type: "text",
            placeholderText: "Search questions",
            styles: ["min-w-[230px]", "dark:bg-dark-fill-3", "mt-2"],
            placeholderImg: {
              component: BiSearch,
              color: "text-input-grey",
            },
          }}
        />
        <Slides
          styles={["mt-3 flex gap-2 w-full flex-wrap slider"]}
          companiesSliders={companiesSliders}
        />
      </div>
    </>
  );
};

export default CompanyTags;
