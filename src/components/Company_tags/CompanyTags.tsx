import React, { useState, useMemo } from "react";
import LInput from "../Base_input/input";
import { RxCaretRight } from "react-icons/rx";
import { RxCaretLeft } from "react-icons/rx";
import { BiSearch } from "react-icons/bi";
import { SwiperSlide } from "swiper/react";
import Slides from "../Swiper/Slides";
import usePagination from '@/hooks/usePagination'
import {CompanyTagsProps} from "@/utils/types/companyTags"

const CompanyTags: React.FC<CompanyTagsProps> = ({ companies }) => {
  const [tagQuery, setTagQuery] = useState<string>("");

  const {
    currentPage,
    paginatedList,
    pageSize,
    paginationBtns,
    totalPages,
    paginationLink,
    setTotalPages,
    setCurrentPage,
    setNextPage,
    setPrevPage,
    setPageSize,
  } = usePagination(companies, 20);

  const filteredCompanies = useMemo(() => {
    const clonedCompanies = [...companies];

    const trimmedCompanies = clonedCompanies.filter((company) =>
      company.name.toLowerCase().includes(tagQuery.toLowerCase())
    );
    const tags = tagQuery.length > 0 ? trimmedCompanies : clonedCompanies;
    setTotalPages((_) => Math.ceil(tags.length / pageSize));

    return tags;
  }, [companies, pageSize, setTotalPages, tagQuery]);

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
            className="rounded-full dark:text-dark-label-2 bg-gray-100 py-1 px-2 dark:bg-dark-fill-3 max-h-[32px]"
          >
            <span className="text-sm">{slide.name} </span>
            <span className="bg-brand-orange rounded-full px-1.5 dark:text-gray-700 text-white text-sm">
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
      <div className="w-full  py-3 px-3 rounded-[8px] dark:bg-dark-layer-1 bg-white shadow-md mt-3">
        <div className="flex items-center justify-between">
          <div className="dark:text-dark-label-2 text-black">Companies</div>
          <div className="flex justify-center items-center gap-1">
            <div
              className={`flex items-center justify-center  h-[25px] w-[25px] rounded-[5px] dark:bg-dark-fill-4   dark:hover:bg-dark-fill-3   cursor-pointer  `}
            >
              <RxCaretLeft className="text-4xl font-bold prev dark:text-dark-label-2 text-dark" />
            </div>
            <div
              className={`flex items-center justify-center  h-[25px] w-[25px] rounded-[5px] dark:bg-dark-fill-4   dark:hover:bg-dark-fill-3 text-dark   cursor-pointer `}
            >
              <RxCaretRight className="text-4xl font-bold next dark:text-dark-label-2" />
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
            styles: ["min-w-[230px]", "bg-gray-100 dark:bg-dark-fill-3", "mt-2"], 
            placeholderImg: {
              component: BiSearch,
              color: "text-input-grey",
            },
          }}
        />
        <Slides
          styles={["mt-3 flex gap-2 w-full flex-wrap slider"]}
          items={companiesSliders}
          prevClass="prev"
          nextClass="next"
          showEmptyContainer={true}
        />
      </div>
    </>
  );
};

export default CompanyTags;
