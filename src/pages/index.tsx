import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";
import Topbar from "@/components/Topbar/Topbar";
import useHasMounted from "@/hooks/useHasMounted";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import Calendar from "moedim";

import React, { useState, useMemo, useEffect } from "react";
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
import { useLayoutEffect } from "react";
/**
 *
 * @returns Components
 */
import LInput from "@/components/Base_input/input";
import CompanyTags from "@/components/Company_tags/CompanyTags";
import Filters from "@/components/Filters/filters";
import Dropdown from "@/components/Dropdown/dropdown";
import Pagination from "@/components/Pagination";

/**
 *
 * @returns constants
 */
import { _cards, _categories, _topics, _inputs, _companies } from "@/constants";
import { problems } from "../mockProblems/problems";
import { DBProblem } from "../utils/types/problem";

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

  const closeDropDowns = () => {
    const dropdowns: Element[] = Array.from(
      document.querySelectorAll("._dropdown")
    );

    document.addEventListener("mousedown", (e) => {
      const dropdownContents = Array.from(
        document.querySelectorAll<HTMLElement>(".dropdown_content")
      );

      dropdownContents.forEach((ddContent, index) => {
        if (
          !ddContent.contains(e.target as HTMLElement) &&
          !dropdowns[index]?.contains(e.target as HTMLElement)
        ) {
          ddContent.classList.remove("show");
          ddContent.parentNode?.children[0].children[1]?.classList.remove(
            "rotate-180"
          );
        }
      });
    });
  };

  useLayoutEffect(() => {
    handleDropdownClicks();
  });

  useLayoutEffect(() => {
    handleDropdownClicks();
  }, [activeTopic]);

  useLayoutEffect(() => {
    setTimeout(() => {
      closeDropDowns();
    }, 1000);
  });

  function CategoryCount({ count, index }: { count: number; index: number }) {
    return (
      <>
        <span
          className={`ml-1 text-light-gray bg-secondary-gray  flex h-[18px] items-center justify-center rounded-[10px] px-1.5 text-xs font-normal ${
            index === 6
              ? "bg-gradient-to-r from-secondary-gray to-black-500"
              : ""
          }`}
        >
          {count}
        </span>
      </>
    );
  }

  const renderCategories = () =>
    categories.slice(0, 7).map((category, index) => (
      <div className="inline-flex items-center " key={`category_&_${index}`}>
        <span className="text-white whitespace-nowrap">{category.name}</span>
        {index < 7 ? (
          <CategoryCount count={category.count} index={index} />
        ) : (
          ""
        )}
      </div>
    ));

  if (!hasMounted) return null;

  return (
    <>
      <main className="bg-dark-layer-2 min-h-screen ">
        <Topbar />
        <div className="max-w-[1150px] mx-auto mt-[67px] pb-5">
          <div className="flex gap-6">
            <div className="w-9/12">
              <div className="flex gap-6">
                <div className="md:h-auto md:w-auto">
                  <span className="inline-block overflow-hidden  rounded-[8px]">
                    <img src={`./lc-1.png`} />
                  </span>
                </div>
                <div>
                  <span className="inline-block overflow-hidden  rounded-[8px]">
                    <img src={`./lc-2.png`} />
                  </span>
                </div>
                <div>
                  <span className="inline-block overflow-hidden  rounded-[8px]">
                    <img src={`./lc-3.png`} />
                  </span>
                </div>
              </div>
              <div className="relative  mx-auto ">
                <div className="flex justify-between items-center">
                  <div className="text-text-gray text-xl pt-5">Study Plan</div>
                  <div>
                    <a className="text-blue-500">See all</a>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-5">
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

                <div className="border-t border-light-border mt-10"></div>

                <div className="flex gap-4 mt-5  overflow-hidden flex-nowrap relative">
                  {renderCategories()}
                </div>

                <div className="flex  gap-4 mt-5">
                  {topics.map((topic, _) => {
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
                          <topic.img
                            active={activeTopic === topic.name ? true : false}
                          />
                          <span
                            className={`whitespace-nowrap ${
                              activeTopic === topic.name
                                ? "text-black"
                                : "text-light-gray"
                            }`}
                          >
                            {topic.name} {activeTopic === topic.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <Filters />

                <div className="mt-5">
                  <div className="flex w-full gap-2">
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
                        <div className="flex  gap-1 items-center dark:text-white text-sm hover:rounded-md   hover:dark:bg-dark-fill-3 px-2 py-1.5 whitespace-nowrap">
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
                            <GrPowerReset className="dark:text-dark-label-3 opacity-60" />
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
                    <div className="flex justify-center items-center ">
                      <div className="flex items-center justify-center bg-green-500 h-[32px] w-[32px] rounded-full ml-3">
                        <QuestionPick />
                      </div>
                      <span className="ml-2 text-green-500">Pick One</span>
                    </div>
                  </div>
                </div>
                <ProblemsTable />
              </div>
            </div>
            <div className="w-3/12 relative">
              <div className="w-full  h-auto py-1.5 p-3 rounded-[8px] bg-dark-layer-1 relative">
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
