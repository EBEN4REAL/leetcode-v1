import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";
import Topbar from "@/components/Topbar/Topbar";
import useHasMounted from "@/hooks/useHasMounted";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import Calendar from "moedim";
import { RxCaretRight } from "react-icons/rx";
import { RxCaretLeft } from "react-icons/rx";

import React, { useState, useMemo } from "react";
import { firestore } from "@/firebase/firebase";
import { clipText } from "@/utils/clipText";
import { BiSearch } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { QuestionPick } from "@/icons/questionPick";
import { BsDash, BsCheck2 } from "react-icons/bs";
import { Attempted } from "@/icons/attempted";
import { Padlock } from "@/icons/padlock";
import { GrPowerReset } from "react-icons/gr";
import { getDropDownDirection } from "@/utils/getDropDownDirection";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { problemsState } from "@/atoms/problemsAtom";
import { useEffect } from "react";
import { RxCaretDown } from "react-icons/rx";

/**
 *
 * @returns Components
 */
import LInput from "@/components/Base_input/input";
import CompanyTags from "@/components/Company_tags/CompanyTags";
import Filters from "@/components/Filters/filters";
import Dropdown from "@/components/Dropdown/dropdown";
import Pagination from "@/components/Pagination";
import { closeDropDowns } from "@/utils/handleDropClose";
import SwiperBtns from "@/components/Swiper-btns/Swiper-btns";
import Slides from "@/components/Swiper/Slides";

import { SwiperSlide } from "swiper/react";
import { Swiper } from "swiper/react";
import { Navigation } from "swiper";
import { Pagination as SwiperPagination } from "swiper";
import { FrigadeChecklist, FrigadeProgressBadge } from "@frigade/react";

/**
 *
 * @returns constants
 */
import { _cards, _categories, _topics, _inputs, _companies } from "@/constants";
import { render } from "react-dom";

const Home = () => {
  const [loadingProblems, setLoadingProblems] = useState(false);
  const hasMounted = useHasMounted();
  const [activeTopic, setActiveTopic] = useState<string>("All Topics");
  const [collapseCategory, setCollapseCategory] = useState<boolean>(true);
  const [date, setDate] = useState(new Date());
  const [cards, setCards] = useState(_cards);
  const [categories, setCategories] = useState(_categories);
  const [topics, setTopics] = useState(_topics);
  const [inputs, setInputs] = useState(_inputs);
  const [companies, setCompanies] = useState(_companies);
  const [guagePercent, setGuagePercent] = useState<boolean>(false);
  const [solvedProblems, setSolvedProblems] = useState<number>(0);
  const [difficultyMode, setDifficultyMode] = useState<string>("");
  const [expandCategories, setExpandCategories] = useState<boolean>(false);
  const [topicScroll, setTopicScroll] = useState<boolean>(false);

  const renderednewCategories = useMemo(() => {
    const categoriesList = collapseCategory
      ? categories.slice(0, 11)
      : categories;

    return categoriesList.map((newCategory, index) => (
      <div
        key={`cat_${index}`}
        className="flex dark:bg-dark-fill-3 rounded-full dark:text-dark-label-3 py-0.5 px-3 whitespace-nowrap text-xs"
      >
        {newCategory.name}
      </div>
    ));
  }, [categories, collapseCategory]);

  const handleDropdownClicks = () => {
    const dropdowns = Array.from(document.querySelectorAll("._dropdown"));
    const dropdownContents = Array.from(
      document.querySelectorAll<HTMLElement>(".dropdown_content")
    );

    dropdowns.forEach((dropdown, index) => {
      dropdown.addEventListener("click", (e) => {
        e.stopPropagation();
        const dropdownContent = dropdownContents[index];
        dropdownContent.parentNode?.children[0].children[1]?.classList.toggle(
          "rotate-180"
        );
        dropdownContent.classList.remove("dropdown-up");
        dropdownContent.classList.toggle("show");
        ``;
        const dropdownDirection = getDropDownDirection(
          dropdown,
          dropdownContent
        );
        const dropdownUpwards =
          dropdownContent.classList.contains("show") &&
          dropdownDirection === "up";

        const dropdownContentHeight = dropdownContent.clientHeight;
        const dropdownHeight = dropdown.clientHeight;
        if (dropdownUpwards) {
          dropdownContent.style.setProperty(
            "top",
            `${-(dropdownContentHeight + dropdownHeight - 27)}px`
          );
        } else {
          dropdownContent.style.setProperty("top", `${2.2}rem`);
        }
      });
    });
  };

  useEffect(() => {
    handleDropdownClicks();
  });

  useEffect(() => {
    handleDropdownClicks();
  }, [activeTopic]);

  useEffect(() => {
    setTimeout(() => {
      closeDropDowns();
    }, 5000);
  });

  function CategoryCount({ count, index }: { count: number; index: number }) {
    return (
      <>
        <div
          className={`ml-1 text-light-gray bg-secondary-gray  py-0.5 flex items-center justify-center rounded-full px-2 text-xs font-normal ${
            index === 6 && !expandCategories
              ? "bg-gradient-to-r from-secondary-gray to-dark-layer-2 opacity-30"
              : ""
          } 
          `}
        >
          <span className="w-full h-full">{count}</span>
        </div>
      </>
    );
  }

  const expandButton = (
    <div
      className="absolute z-5 bottom-[-2.5px] right-0 items-center text-white  py-0.5  text-xs flex cursor-pointer text-right"
      onClick={() => setExpandCategories((prev) => !prev)}
    >
      <div className="bg-dark-layer-2 p-[2.5px] shadow bg-gradient-to-l">
        {expandCategories ? "Collapse" : "Expand"}
      </div>
      {expandCategories ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="1em"
          height="1em"
          fill="currentColor"
          className="h-[15px] w-[15px]"
        >
          <path
            fillRule="evenodd"
            d="M17.707 11.707a1 1 0 01-1.414 0L12 7.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 010 1.414zm-1.414 7L12 14.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="1em"
          height="1em"
          fill="currentColor"
          className="h-[15px] w-[15px]"
        >
          <path
            fillRule="evenodd"
            d="M7.707 12.293L12 16.586l4.293-4.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414zM12 9.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L12 9.586z"
            clipRule="evenodd"
          ></path>
        </svg>
      )}
    </div>
  );

  const checkIfMobile = () => {
    if (typeof window !== "undefined") {
      return screen.width <= 768;
    }
  };

  const renderCategories = useMemo(() => {
    let cats = expandCategories ? [...categories] : categories.slice(0, 7);

    if (checkIfMobile() && !expandCategories) {
      cats = categories.slice(0, 3);
    }

    return cats.map((category, index) => (
      <div className={`inline-flex items-center `} key={`category_&_${index}`}>
        <span className="text-white text-sm whitespace-nowrap">
          {category.name}
        </span>
        {index < 7 || expandCategories ? (
          <CategoryCount count={category.count} index={index} />
        ) : (
          ""
        )}
      </div>
    ));
  }, [categories, expandCategories]);

  renderCategories.push(expandButton);

  const homeCards = () => {
    return ["lc-1.png", "lc-2.png", "lc-3.png"].map((homeCard, index) => (
      <SwiperSlide key={`home_card_${index}`}>
        <div className="md:h-auto md:w-auto h-[116px] w-[222px]">
          <span className="inline-block overflow-hidden  rounded-[8px]">
            <img src={`./${homeCard}`} className="w-full h-full" />
          </span>
        </div>
      </SwiperSlide>
    ));
  };

  const topicSlideBtn = () => {
    return (
      <div
        className="bg-dark-layer-2 flex  sticky z-2 right-0 top-0 cursor-pointer pl-1 order-20"
        onClick={() => setTopicScroll((prev) => !prev)}
      >
        {/* <span className="h-10 w-4 bg-gradient-to-l from-paper dark:from-dark-paper"></span> */}
        <span className="bg-paper pl-1 font-normal bg-gradient-to-l from-paper dark:from-dark-paper h-10 w-8 flex items-center justify-cente">
          {topicScroll ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
              fill="currentColor"
              className="h-3.5 w-3.5 text-white"
            >
              <path
                fillRule="evenodd"
                d="M11.707 7.707L7.414 12l4.293 4.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414zM14.414 12l4.293 4.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L14.414 12z"
                clipRule="evenodd"
              ></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
              fill="currentColor"
              className="h-3.5 w-3.5 text-white"
            >
              <path
                fillRule="evenodd"
                d="M12.293 16.293L16.586 12l-4.293-4.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414zM9.586 12L5.293 7.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L9.586 12z"
                clipRule="evenodd"
              ></path>
            </svg>
          )}
        </span>
      </div>
    );
  };

  const renderTopics = () => {
    return topics.map((topic, _) => {
      return (
        <div
          key={`topic__${topic.name}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setActiveTopic(() => topic.name);
          }}
          className={`${
            activeTopic === topic.name ? "bg-white" : ""
          } cursor-pointer bg-secondary-gray rounded-full py-[8px] px-4`}
        >
          <div className="flex items-center justify-center">
            <topic.img active={activeTopic === topic.name ? true : false} />
            <span
              className={`whitespace-nowrap ${
                activeTopic === topic.name ? "text-black" : "text-light-gray"
              }`}
            >
              {topic.name}
            </span>
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    const topicWrapper = document.querySelector(".topic-wrapper");
    if (topicWrapper) {
      if (topicScroll) {
        topicWrapper.scrollLeft =
          topicWrapper.scrollWidth - topicWrapper.clientWidth;
      } else {
        topicWrapper.scrollLeft = 0;
      }
    }
  }, [topicScroll]);

  if (!hasMounted) return null;

  return (
    <>
      <main className="bg-dark-layer-2 min-h-screen ">
        <Topbar />
        <div className="md:max-w-[1150px] lg:max-w-[1150px] max-w-full mx-auto px-3  md:pt-[67px] pt-[70px] pb-5">
          <div className="flex md:gap-6 lg:gap-6 space-y-3   md:space-y-0 lg:space-y-0  md:flex-row lg:flex-row flex-col">
            <div className="md:w-9/12 lg:md:w-9/12 w-full">
              <div className="md:flex lg:flex hidden gap-6">
                <div className="md:h-auto md:w-auto h-[100px] w-[200px]">
                  <span className="inline-block overflow-hidden  rounded-[8px]">
                    <img src={`./lc-1.png`} className="w-full h-full" />
                  </span>
                </div>
                <div className="md:h-auto md:w-auto h-[100px] w-[200px]">
                  <span className="inline-block overflow-hidden  rounded-[8px]">
                    <img src={`./lc-2.png`} className="w-full h-full" />
                  </span>
                </div>
                <div className="md:h-auto md:w-auto h-[100px] w-[200px]">
                  <span className="inline-block overflow-hidden  rounded-[8px]">
                    <img src={`./lc-3.png`} className="w-full h-full" />
                  </span>
                </div>
              </div>
              <div className="md:hidden lg:hidden flex justify-end py-3">
                <SwiperBtns prevClass="prev-card" nextClass="next-card" />
              </div>
              <div className="md:hidden lg:hidden flex gap-6 mb-3">
                <Swiper
                  navigation={{
                    prevEl: `.prev-card`,
                    nextEl: `.next-card`,
                  }}
                  slidesPerView={1.5}
                  modules={[Navigation]}
                  slideToClickedSlide
                >
                  {homeCards()}
                </Swiper>
              </div>
              <div className="relative  mx-auto ">
                <div className="flex justify-between items-center">
                  <div className="text-text-gray text-xl md:pt-5 lg:pt-5 pt-0 md:sml-0 lg:ml-0 ml-2">
                    Study Plan
                  </div>
                  <div>
                    <a className="text-blue-500">See all</a>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 lg:grid-cols-3 grid-cols-2 gap-4 mt-5">
                  {cards.map((card, index) => (
                    <div
                      key={`car__${index}`}
                      className="flex gap-4 items-center  bg-secondary-gray rounded-[8px] p-2"
                    >
                      <span className="inline-block overflow-hidden  rounded-[8px]">
                        <img
                          src={`./assets/img/${card.name}.png`}
                          width="72"
                          height="72"
                        />
                      </span>

                      <div>
                        <div>
                          <p className="text-white font-bold text-sm	pb-2 ">
                            {card.title}
                          </p>
                        </div>
                        <p className="text-card-para text-xs	pr-2">
                          {clipText(card.desc, 23)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-light-border mt-7"></div>

                <div className="flex flex-wrap   gap-4 mt-5 overflow-auto	relative">
                  {renderCategories}
                </div>

                <div className="flex  relative gap-3 mt-5 overflow-auto  topic-wrapper">
                  {renderTopics()}
                  {topicSlideBtn()}
                </div>
                <Filters />

                <div className="mt-5">
                  <div className="flex w-full gap-2 flex-wrap md:flex-nowrap lg:flex-nowrap	">
                    <Dropdown header="Lists" activeTopic={activeTopic}>
                      <div className="dropdown_content absolute top-9 left-0 p-3 dark:bg-dark-overlay-3 rounded-lg hidden max-w-[15rem] min-w-[8.75rem] overflow-auto">
                        <div className="flex  gap-4 dark:text-white text-sm hover:dark:bg-dark-fill-3 hover:rounded-md px-2 py-1.5 whitespace-nowrap">
                          LeetCode Curated Algo 170
                        </div>
                        <div className="flex  gap-4 dark:text-white text-sm hover:rounded-md   hover:dark:bg-dark-fill-3 px-2 py-1.5 whitespace-nowrap">
                          LeetCode Curated Algo 170
                        </div>
                        <div className="flex  gap-4 dark:text-white text-sm hover:rounded-md  hover:dark:bg-dark-fill-3 px-2 py-1.5 whitespace-nowrap">
                          LeetCode Curated Algo 170
                        </div>
                        <div className="flex  gap-4 dark:text-white text-sm hover:rounded-md  hover:dark:bg-dark-fill-3 px-2 py-1.5 whitespace-nowrap">
                          LeetCode Curated Algo 170
                        </div>
                      </div>
                    </Dropdown>
                    <Dropdown header="Difficulty" activeTopic={activeTopic}>
                      <div className="dropdown_content absolute top-9 left-0 p-3 dark:bg-dark-overlay-3 rounded-lg hidden max-w-[15rem] min-w-[8.75rem] overflow-auto">
                        <div className="flex  gap-4   text-sm hover:dark:bg-dark-fill-3 hover:rounded-md px-2 py-1.5 whitespace-nowrap text-dark-green-s">
                          Easy
                        </div>
                        <div className="flex  gap-4  text-sm hover:rounded-md  hover:dark:bg-dark-fill-3 px-2 py-1.5 whitespace-nowrap text-dark-yellow">
                          Medium
                        </div>
                        <div className="flex  gap-4 text-sm hover:rounded-md  hover:dark:bg-dark-fill-3 px-2 py-1.5 whitespace-nowrap text-dark-pink">
                          Hard
                        </div>
                      </div>
                    </Dropdown>
                    <Dropdown header="Status" activeTopic={activeTopic}>
                      <div className="dropdown_content absolute top-9 left-0 p-3 dark:bg-dark-overlay-3 rounded-lg hidden max-w-[15rem] min-w-[8.75rem] overflow-auto">
                        <div className="flex gap items-center dark:text-white text-sm hover:dark:bg-dark-fill-3 hover:rounded-md px-2 py-1.5 whitespace-nowrap">
                          <span className="">
                            <BsDash className="text-xl" />
                          </span>
                          Todo
                        </div>
                        <div className="flex  gap-1 items-center dark:text- white text-sm hover:rounded-md   hover:dark:bg-dark-fill-3 px-2 py-1.5 whitespace-nowrap">
                          <span className="">
                            <BsCheck2 className="text-lg text-dark-green-s " />
                          </span>
                          Solved
                        </div>
                        <div className="flex  gap-1 items-center dark:text-white text-sm hover:rounded-md  hover:dark:bg-dark-fill-3 px-2 py-1.5 whitespace-nowrap">
                          <span className="">
                            <Attempted />
                          </span>
                          Attempted
                        </div>
                      </div>
                    </Dropdown>
                    <Dropdown header="Tags" activeTopic={activeTopic}>
                      <div className="dropdown_content absolute top-9 left-0 p-3 dark:bg-dark-overlay-3 rounded-lg hidden w-[372px] min-w-[8.75rem]  md:max-w-[500px] max-h-[400px] overflow-y-scroll">
                        <LInput
                          config={{
                            type: "text",
                            placeholderText: "Filter topics",
                            styles: ["w-full", "dark:bg-dark-fill-3"],
                            placeholderImg: {
                              component: BiSearch,
                              color: "text-input-grey",
                            },
                          }}
                        />
                        <div className="mt-3">
                          <ul className="flex items-center gap-6">
                            <li className="text-white text-sm py-1 border-b-2 border-text-white">
                              Topics
                            </li>
                            <li className="dark:text-dark-label-2 text-sm flex items-center">
                              Companies
                              <span className="ml-1">
                                <div className="h-4">
                                  <Padlock />
                                </div>
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="mt-5 flex gap-2 w-full flex-wrap mb-4">
                          {renderednewCategories}
                          <span
                            className="text-blue-500 ml-2 cursor-pointer text-sm"
                            onClick={() => setCollapseCategory((prev) => !prev)}
                          >
                            {collapseCategory ? "Expand" : "Collapse"}
                          </span>
                        </div>

                        <div className="border-t border-light-border h-2"></div>

                        <div className="flex items-center justify-end mt-2 dark:text-dark-label-3 opacity-60">
                          <span className="mr-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="1em"
                              height="1em"
                              fill="currentColor"
                              className="h-4 w-4"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.725 9.255h2.843a1 1 0 110 2H3.2a1 1 0 01-1-1V4.887a1 1 0 012 0v3.056l2.445-2.297a9.053 9.053 0 11-2.142 9.415 1 1 0 011.886-.665 7.053 7.053 0 1010.064-8.515 7.063 7.063 0 00-8.417 1.202L5.725 9.255z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </span>
                          <span className="d text-sm ">Reset</span>
                        </div>
                      </div>
                    </Dropdown>
                    <LInput
                      config={{
                        type: "text",
                        placeholderText: "Search questions",
                        styles: ["min-w-[230px]", "bg-secondary-gray"],
                        placeholderImg: {
                          component: BiSearch,
                          color: "text-input-grey",
                        },
                      }}
                    />
                    <div className="flex items-center justify-between bg-dark-layer-3 rounded-[5px]  px-3">
                      <FiSettings className="text-xl text-light-gray" />
                    </div>
                    <div className="flex justify-center items-center ml-3">
                      <div className="shadow-md flex h-8 w-8 items-center justify-center rounded-full bg-[#34c164]  ">
                        <QuestionPick />
                      </div>
                      <span className="ml-2 text-green-500 hidden sm:block md:block lg:block">
                        Pick One
                      </span>
                    </div>
                  </div>
                </div>
                <div className="md:overflow-x-visible lg:overflow-x-visible">
                  <ProblemsTable
                    handleDropDownClose={() => {
                      closeDropDowns();
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="md:w-3/12 lg:w-3/12 w-full relative">
              <div className="w-full  h-auto py-1.5 p-3 rounded-[8px] bg-dark-layer-1 relative mt-7 md:mt-0 lg:mt-0">
                <div className=" w-[75px] h-[75px] absolute -top-[2.5rem] right-[2.0rem] dark:opacity-50">
                  <img
                    src="./assets/img/lccal.png"
                    alt="DCC March 2022"
                    className="h-full w-full"
                  />
                </div>
                <Calendar
                  className="!w-full !border-0 !bg-transparent"
                  onChange={(date: React.SetStateAction<Date>) =>
                    setDate(date as React.SetStateAction<Date>)
                  }
                  value={date}
                />
                <div className="mt-4 w-full h-auto rounded-lg p-3 py-4  bg-cover bg-[url('/lc-bg.svg')]">
                  <div className="text-xs text-brand-orange">
                    Weekly premium
                  </div>
                  <div className="flex gap-7 mt-3 ">
                    <span className="text-xs text-brand-orange cursor-pointer">
                      W1
                    </span>
                    <span className="text-xs text-brand-orange cursor-pointer">
                      W2
                    </span>
                    <span className="text-xs text-brand-orange cursor-pointer">
                      W3
                    </span>
                    <span className="text-xs text-brand-orange cursor-pointer">
                      W4
                    </span>
                    <span className="text-xs text-brand-orange cursor-pointer">
                      W5
                    </span>
                  </div>
                </div>
                <div className="mt-5 flex  justify-between items-center mb-2">
                  <div className="w-4/5 flex items-center gap-2">
                    <img
                      src="./assets/img/points-oct.png"
                      className="h-[18px] w-[18px]"
                    />
                    <span className=" text-sm dark:text-dark-label-2 ">0</span>
                    <span className="text-xs dark:text-dark-green-s ">
                      Redeem
                    </span>
                  </div>
                  <div className="w-1/5 dark:text-dark-label-2 text-xs flex justify-end">
                    Rules
                  </div>
                </div>
              </div>
              <CompanyTags companies={companies} />
              <div className="w-full  py-3 mt-4 bg-dark-layer-1  rounded-lg">
                <div className="flex items-center justify-between px-3 pb-3">
                  <div className=" text-white">Session</div>
                  <div className="flex gap-[1px]">
                    <div className="rounded-l-[5px] h-[24px] flex items-center px-1.5 text-xs cursor-pointer  dark:bg-dark-fill-3  dark:text-dark-label-3">
                      Anonymous
                    </div>
                    <div className="flex items-center justify-center h-[24px] w-[22px] rounded-r-[5px] dark:bg-dark-fill-3  dark:text-dark-label-3">
                      <FiSettings className="text-xl text-light-gray w-3" />
                    </div>
                  </div>
                </div>
                <div className="w-full px-3 flex">
                  <div className="w-1/2">
                    <div
                      className=" relative max-h-[100px] max-w-[100px] z-base"
                      onMouseEnter={() => setGuagePercent(true)}
                      onMouseLeave={() => setGuagePercent(false)}
                    >
                      <svg
                        className="h-full w-full origin-center -rotate-90 transform"
                        viewBox="0 0 100 100"
                      >
                        <circle
                          fill="none"
                          cx="50px"
                          cy="50px"
                          r="42px"
                          strokeWidth="3"
                          strokeLinecap="round"
                          stroke="currentColor"
                          className="text-gray-4 dark:text-dark-gray-4"
                        ></circle>
                        <circle
                          fill="none"
                          cx="50px"
                          cy="50px"
                          r="42px"
                          strokeWidth={`${difficultyMode ? "7" : "3"}`}
                          strokeLinecap="round"
                          stroke="currentColor"
                          className={`cursor-pointer ${
                            difficultyMode === "Easy"
                              ? "text-dark-green-s"
                              : difficultyMode === "Medium"
                              ? "text-dark-yellow"
                              : difficultyMode === "Hard"
                              ? "text-dark-pink"
                              : "text-olive dark:text-dark-olive"
                          }`}
                          strokeDasharray="0.09645240603126558 263.79733049551135"
                          strokeDashoffset="0"
                          data-difficulty="EASY"
                        ></circle>
                      </svg>
                      {!guagePercent && (
                        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2   transform cursor-default">
                          <div
                            data-difficulty="TOTAL"
                            className="truncate text-center"
                          >
                            <div className="mb-[1px] text-[11px]">
                              <span className="text-label-3 dark:text-dark-label-3">
                                All
                              </span>
                            </div>
                            <div className="pb-0.5 text-xl font-medium leading-none text-white lg:text-2xl lg:leading-none">
                              {solvedProblems}
                            </div>
                            <hr className="border-divider-2 dark:border-dark-label-4 mx-auto max-w-[32px]" />
                            <div className="text-label-4 dark:text-dark-label-4 pt-0.5 text-xs font-semibold">
                              2736
                            </div>
                          </div>
                        </div>
                      )}

                      {guagePercent && (
                        <div className="flex flex-col	items-center justify-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2   transform cursor-default">
                          <div
                            className={`pb-0.5 text-lg font-medium leading-none ${
                              difficultyMode === "Easy"
                                ? "text-dark-green-s"
                                : difficultyMode === "Medium"
                                ? "text-dark-yellow"
                                : difficultyMode === "Hard"
                                ? "text-dark-pink"
                                : "text-white"
                            } lg:text-2xl lg:leading-none`}
                          >
                            50
                            <span className="text-xs">.0%</span>
                          </div>
                          <div className="text-label-4 dark:text-dark-label-5 pt-0.5 text-[11px] font-semibold">
                            Acceptance
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-1/2">
                    <div>
                      {["Easy", "Medium", "Hard"].map((difficulty, _) => (
                        <div
                          key={`difficulty__${difficulty}`}
                          onMouseEnter={() => {
                            setGuagePercent(true);
                            setDifficultyMode(difficulty);
                          }}
                          onMouseLeave={() => {
                            setGuagePercent(false);
                            setDifficultyMode("");
                          }}
                          className={`text-sm cursor-pointer  mt-3 whitespace-nowrap ${
                            difficulty === "Easy"
                              ? "text-dark-green-s"
                              : difficulty === "Medium"
                              ? "text-dark-yellow"
                              : "text-dark-pink"
                          } `}
                        >
                          {difficulty}
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="text-sm  mt-3 whitespace-nowrap">
                        <span className="dark:text-dark-label-2">1 </span>
                        <span className="font-semibold text-xs dark:text-dark-label-4">
                          /686
                        </span>
                      </div>
                      <div className="text-sm  mt-3 whitespace-nowrap">
                        <span className="dark:text-dark-label-2">0 </span>
                        <span className="font-semibold text-xs dark:text-dark-label-4">
                          /1447
                        </span>
                      </div>
                      <div className="text-sm  mt-3 whitespace-nowrap">
                        <span className="dark:text-dark-label-2">0 </span>
                        <span className="font-semibold text-xs text-dark-label-4">
                          /603
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
