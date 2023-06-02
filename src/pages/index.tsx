import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";
import Topbar from "@/components/Topbar/Topbar";
import useHasMounted from "@/hooks/useHasMounted";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

import React, { useState, useEffect, useMemo } from "react";
import { firestore } from "@/firebase/firebase";
import { clipText } from "@/utils/clipText";
import { RxCaretDown } from "react-icons/rx";
import { RxCaretLeft } from "react-icons/rx";
import { RxCaretRight } from "react-icons/rx";
import { BiSearch } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { QuestionPick } from "@/icons/questionPick";
import { Octagon } from "@/icons/octagon";
import { BsDash, BsCheck2 } from "react-icons/bs";
import { Attempted } from "@/icons/attempted";
import { Padlock } from "@/icons/padlock";
import { GrPowerReset } from "react-icons/gr";


// CALENDAR

import {
  Algorithms,
  ALlTopics,
  Concurrency,
  Database,
  Javascript,
  Shell,
} from "@/icons/Topics";

export default function Home() {
  const [loadingProblems, setLoadingProblems] = useState(false);
  const hasMounted = useHasMounted();
  const [activeTopic, setActiveTopic] = useState<string>("All Topics");
  const [collapseCategory, setCollapseCategory] = useState<boolean>(true);

  const [cards, setCards] = useState([
    {
      name: "lc-4",
      title: "Top Interview 150",
      desc: "Must-do List for Interview Prep",
    },
    {
      name: "lc-5",
      title: "LeetCode 75",
      desc: "Ace Coding Interview with 75 Qs",
    },
    {
      name: "lc-6",
      title: "SQL 50",
      desc: "Crack SQL Interview in 50 Qs",
    },
    {
      name: "lc-7",
      title: "Premium Algo 100",
      desc: "LeetCode Staff Pick",
    },
    {
      name: "lc-8",
      title: "Amazon Spring '23 High Frequency",
      desc: "Practice Amazon 25 Recently Asked Qs",
    },
    {
      name: "lc-9",
      title: "Dynamic Programming",
      desc: "10 Essential DP Patterns",
    },
  ]);

  const [categories, setCategories] = useState([
    {
      name: "Array",
      count: 1381,
    },
    {
      name: "String",
      count: 615,
    },
    {
      name: "Hash table",
      count: 475,
    },
    {
      name: "Dynamic Programming",
      count: 431,
    },
    {
      name: "Math",
      count: 430,
    },
    {
      name: "Sorting",
      count: 318,
    },
    {
      name: "Greedy",
      count: 309,
    },
    {
      name: "Depth-First Search ",
      count: 274,
    },
    {
      name: "Database",
      count: 226,
    },
    {
      name: "Array",
      count: 1381,
    },
    {
      name: "String",
      count: 615,
    },
    {
      name: "Hash table",
      count: 475,
    },
    {
      name: "Dynamic Programming",
      count: 431,
    },
    {
      name: "Math",
      count: 430,
    },
    {
      name: "Sorting",
      count: 318,
    },
    {
      name: "Greedy",
      count: 309,
    },
    {
      name: "Depth-First Search ",
      count: 274,
    },
    {
      name: "Database",
      count: 226,
    },
    {
      name: "Array",
      count: 1381,
    },
    {
      name: "String",
      count: 615,
    },
    {
      name: "Hash table",
      count: 475,
    },
    {
      name: "Dynamic Programming",
      count: 431,
    },
    {
      name: "Math",
      count: 430,
    },
    {
      name: "Sorting",
      count: 318,
    },
    {
      name: "Greedy",
      count: 309,
    },
    {
      name: "Depth-First Search ",
      count: 274,
    },
    {
      name: "Database",
      count: 226,
    },
    {
      name: "Array",
      count: 1381,
    },
    {
      name: "String",
      count: 615,
    },
    {
      name: "Hash table",
      count: 475,
    },
    {
      name: "Dynamic Programming",
      count: 431,
    },
    {
      name: "Math",
      count: 430,
    },
    {
      name: "Sorting",
      count: 318,
    },
    {
      name: "Greedy",
      count: 309,
    },
    {
      name: "Depth-First Search ",
      count: 274,
    },
    {
      name: "Database",
      count: 226,
    },
  ]);

  const [topics, setTopics] = useState([
    {
      name: "All Topics",
      img: ALlTopics,
    },
    {
      name: "Algorithms",
      img: Algorithms,
    },
    {
      name: "Database",
      img: Database,
    },
    {
      name: "Javascript",
      img: Javascript,
    },
    {
      name: "Shell",
      img: Shell,
    },
    {
      name: "Concurrency",
      img: Concurrency,
    },
  ]);

  const [inputs, setInputs] = useState({
    id: "",
    title: "",
    difficulty: "",
    category: "",
    videoId: "",
    link: "",
    order: 0,
    likes: 0,
    dislikes: 0,
  });

  const [companies, setCompanies] = useState([
    {
      name: "Amazon",
      count: 1237,
    },
    {
      name: "Google",
      count: 1202,
    },
    {
      name: "Microsoft",
      count: 729,
    },
    {
      name: "Facebook",
      count: 668,
    },
    {
      name: "Apple",
      count: 613,
    },
    {
      name: "Bloomberg",
      count: 585,
    },
    {
      name: "Adobe",
      count: 508,
    },
    {
      name: "Uber",
      count: 504378,
    },
    {
      name: "Oracle",
      count: 219,
    },
    {
      name: "TikTok",
      count: 213,
    },
    {
      name: "Goldman Sachs",
      count: 180,
    },
    {
      name: "Yahoo",
      count: 177,
    },
    {
      name: "LinkedIn",
      count: 168,
    },
  ]);

  const handleDropdownClicks = () => {
    const dropdowns = Array.from(document.querySelectorAll(".dropdown"));
    const dropdownContents = Array.from(
      document.querySelectorAll<HTMLElement>(".dropdown-content")
    );

    if (dropdowns.length > 0) {
      dropdowns.forEach((dropdown, index) => {
        dropdown.addEventListener("click", function (this: typeof dropdown, e) {
          e.stopPropagation();
          const dropdownContent = dropdownContents[index];
          dropdownContent.parentNode?.children[0].children[1]?.classList.toggle(
            "rotate-180"
          );
          dropdownContent.classList.toggle("show");
        });
      });
    }
  };

  const closeDropDowns = () => {
    const dropdowns: Element[] = Array.from(
      document.querySelectorAll(".dropdown")
    );

    document.addEventListener("mousedown", (e) => {
      const dropdownContents = Array.from(
        document.querySelectorAll<HTMLElement>(".dropdown-content")
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

  useEffect(() => {
    handleDropdownClicks();
  });

  useEffect(() => {
    setTimeout(() => {
      closeDropDowns();
    }, 100);
  });

  const renderednewCategories = useMemo(() => {
    const newCategories = [];
    for (let i = 0; i < categories.length; i++) {
      if (i < 10) {
        newCategories.push({ ...categories[i] });
      }
    }

    const categoriesList = collapseCategory ? newCategories : categories;

    return categoriesList.map((newCategory, index) => (
      <div
        key={index}
        className="flex dark:bg-dark-fill-3 rounded-full dark:text-dark-label-3 py-0.5 px-3 whitespace-nowrap text-xs"
      >
        {newCategory.name}
      </div>
    ));
  }, [categories, collapseCategory]);

  

  const renderCompanies = () =>
    companies.map((company, index) => (
      <div
        key={company.name}
        className="rounded-full dark:text-dark-label-2 py-1 px-2 dark:bg-dark-fill-3"
      >
        <span className="text-sm">{company.name} </span>
        <span className="bg-brand-orange rounded-full px-1.5 text-gray-700 text-sm">
          {company.count}
        </span>
      </div>
    ));

  function hanldeOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    async function saveDoc() {
      const newInputs = {
        ...inputs,
        order: Number(inputs.order),
      };
      try {
        await setDoc(doc(firestore, "problems", newInputs.id), newInputs);
        toast.success("Successful", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      } catch (e: unknown) {
        throw new Error(e as string);
      }
    }
    saveDoc();
  }

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
      <div className="inline-flex items-center " key={category.name}>
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
        <div className="max-w-[1150px] mx-auto mt-[67px]">
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
              <div className="relative overflow-x-auto mx-auto ">
                {loadingProblems && (
                  <div className="max-w-[1200px] mx-auto w-full animate-pulse">
                    {[...Array(10)].map((_, idx) => (
                      <LoadingSkeleton key={idx} />
                    ))}
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="text-text-gray text-xl pt-5">Study Plan</div>
                  <div>
                    <a className="text-blue-500">See all</a>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-5">
                  {cards.map((card, index) => (
                    <div
                      key={index}
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
                  {/* <span className="text-light-gray absolute whitespace-nowrap flex top-1 -right-1 font-bold items-center text-xs">
                    Expand
                    <span className="ml-0">
                      <RxCaretDown className="text-light-gray"/>
                    </span>
                  </span> */}
                </div>

                <div className="flex  gap-4 mt-5">
                  {topics.map((topic, _) => {
                    return (
                      <div
                        key={topic.name}
                        onClick={() => setActiveTopic(topic.name)}
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

                <div className="mt-5">
                  <div className="flex w-full gap-2">
                    <div className="relative">
                      <div
                        className="dropdown  flex py-1 gap-4 flex-1 justify-between items-center px-3 cursor-pointer  bg-secondary-gray rounded-[5px] relative"
                        id="dropdownDefaultButton"
                      >
                        <div className="text-light-gray text-sm label">
                          Lists
                        </div>
                        <div className="transition-all ease-in-out duration-300">
                          <RxCaretDown className="text-light-gray text-2xl caret" />
                        </div>
                      </div>
                      <div className="dropdown-content absolute top-9 left-0 p-3 dark:bg-dark-overlay-3 rounded-lg hidden max-w-[15rem] min-w-[8.75rem] overflow-auto">
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
                    </div>
                    <div className="relative">
                      <div className="dropdown py-1 gap-4 px-3 flex flex-1 justify-between items-center   bg-secondary-gray rounded-[5px] relative">
                        <div className="text-light-gray text-sm">
                          Difficulty
                        </div>
                        <div className="transition-all ease-in-out duration-300">
                          <RxCaretDown className="text-light-gray text-2xl" />
                        </div>
                      </div>
                      <div className="dropdown-content absolute top-9 left-0 p-3 dark:bg-dark-overlay-3 rounded-lg hidden max-w-[15rem] min-w-[8.75rem] overflow-auto">
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
                    </div>
                    <div className="relative">
                      <div className="dropdown flex flex-1 justify-between items-center px-3  bg-secondary-gray rounded-[5px] relative py-1">
                        <div className="text-light-gray text-sm">Status</div>
                        <div className="ransition-all ease-in-out duration-300">
                          <RxCaretDown className="text-light-gray text-2xl" />
                        </div>
                      </div>
                      <div className="dropdown-content absolute top-9 left-0 p-3 dark:bg-dark-overlay-3 rounded-lg hidden max-w-[15rem] min-w-[8.75rem] overflow-auto">
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
                    </div>
                    <div className="relative">
                      <div className="dropdown flex flex-1 justify-between py-1 items-center px-3  bg-secondary-gray rounded-[5px]">
                        <div className="text-light-gray text-sm">Tags</div>
                        <div className="transition-all ease-in-out duration-300">
                          <RxCaretDown className="text-light-gray text-2xl" />
                        </div>
                      </div>
                      <div className="dropdown-content absolute top-9 left-0 p-3 dark:bg-dark-overlay-3 rounded-lg hidden w-[372px] min-w-[8.75rem]  md:max-w-[500px] max-h-[400px] overflow-y-scroll">
                        <div className="flex w-full justify-center items-center  dark:bg-dark-fill-3 rounded-md ">
                          <div className="w-1/6 flex justify-center">
                            <BiSearch className="text-input-grey text-md ml-2" />
                          </div>
                          <div className="w-5/6">
                            <input
                              type="text"
                              placeholder="Search for tags..."
                              className="bg-transparent outline-none border-0 dark:text-dark-label-2  placeholder:text-input-grey text-input-grey py-1 placeholder:text-sm "
                            />
                          </div>
                        </div>
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
                    </div>
                    <div className="flex min-w-[230px] justify-center items-center  bg-secondary-gray rounded-md">
                      <div className="w-1/6 flex justify-center">
                        <BiSearch className="text-input-grey text-lg ml-2" />
                      </div>
                      <div className="w-5/6">
                        <input
                          type="text"
                          placeholder="Search questions"
                          className="bg-transparent outline-none border-0  placeholder:text-input-grey focus:text-input-grey text-input-grey "
                        />
                      </div>
                    </div>
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

                <table className="text-sm text-left text-gray-500 dark:text-gray-400  w-full max-w-[1200px] mx-auto mt-5">
                  {!loadingProblems && (
                    <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b border-light-border ">
                      <tr>
                        <th scope="col" className="px-1 py-3 w-0 text-sm">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 w-0 text-sm">
                          Title
                        </th>
                        <th scope="col" className="px-6 py-3 w-0 text-sm">
                          Difficulty
                        </th>

                        <th scope="col" className="px-6 py-3 w-0 text-sm">
                          Acceptance
                        </th>
                        <th scope="col" className="px-6 py-3 w-0 text-sm">
                          Solution
                        </th>
                        <th scope="col" className="px-6 py-3 w-0 text-sm">
                          Frequency
                        </th>
                      </tr>
                    </thead>
                  )}
                  <ProblemsTable setLoadingProblems={setLoadingProblems} />
                </table>
              </div>
            </div>
            <div className="w-3/12 relative">
              <div className="w-full  h-[300px] p-3 rounded-[8px] bg-dark-layer-1">
                <Octagon />
              </div>
              <div className="w-full  py-3 px-3 rounded-[8px] bg-dark-layer-1 mt-3">
                <div className="flex items-center justify-between">
                  <div className="dark:text-dark-label-2">Companies</div>
                  <div className="flex justify-center items-center gap-1">
                    <div className="flex items-center justify-center h-[25px] w-[25px] rounded-[5px] dark:bg-dark-fill-4  dark:hover:bg-dark-fill-3 dark:text-dark-label-2 text-label-2 cursor-pointer">
                      <RxCaretLeft className="text-4xl font-bold" />
                    </div>
                    <div className="flex items-center justify-center  h-[25px] w-[25px] rounded-[5px] dark:bg-dark-fill-4  dark:hover:bg-dark-fill-3 dark:text-dark-label-2 text-label-2 cursor-pointer">
                      <RxCaretRight className="text-4xl font-bold" />
                    </div>
                  </div>
                </div>
                <div className="flex min-w-[230px] justify-center items-center  dark:bg-dark-fill-3 rounded-md mt-2">
                  <div className="w-1/6 flex justify-center">
                    <BiSearch className="text-input-grey text-md ml-2" />
                  </div>
                  <div className="w-5/6">
                    <input
                      type="text"
                      placeholder="Search for tags..."
                      className="bg-transparent outline-none border-0 dark:text-dark-label-2  placeholder:text-input-grey text-input-grey py-1 placeholder:text-sm "
                    />
                  </div>
                </div>
                <div className="mt-3 flex gap-2 w-full flex-wrap">
                  {renderCompanies()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
