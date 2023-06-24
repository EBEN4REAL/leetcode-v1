import Topbar from "@/components/Topbar/Topbar";
import Workspace from "@/components/Workspace/Workspace";
import useHasMounted from "@/hooks/useHasMounted";
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/types/problem";
import React from "react";
import { auth } from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "Next/image";
import Calendar from "react-github-contribution-calendar";
import GitHubCalendar from "react-github-calendar";

type UserProfileProps = {
  username: string;
};

const UserProfile: React.FC<UserProfileProps> = () => {
  const hasMounted = useHasMounted();
  const [user] = useAuthState(auth);

  var panelAttributes = { rx: 6, ry: 6 };
  var values = {
    "2022-01-01": 1,
    "2022-02-01": 1,
    "2022-03-01": 1,
    "2022-04-01": 1,
    "2022-05-01": 1,
    "2022-06-01": 1,
    "2022-07-01": 1,
    "2022-08-01": 1,
    "2022-09-01": 1,
    "2022-10-01": 1,
    "2022-11-01": 1,
    "2022-12-01": 1,
  };
  var until = "2022-12-31";

  if (!hasMounted) return null;

  return (
    <div>
      <Topbar />
      <div className="min-w-screen min-h-screen bg-dark-layer-2 pb-40">
        <div className="flex gap-4 pt-5 max-w-[1150px] mx-auto">
          <div
            className="w-[300px] rounded-md bg-dark-layer-1 px-5 py-5 flex flex-col"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.08) 0px 2px 4px, rgba(0, 0, 0, 0.08) 0px 4px 8px, rgba(0, 0, 0, 0.08) 0px 6px 12px",
            }}
          >
            <div className="flex gap-4 ">
              <div className="h-20 w-20 ">
                <img
                  className="h-full w-full rounded-md"
                  src="https://assets.leetcode.com/users/igbinoba/avatar_1588932571.png"
                  alt="profile-pic"
                />
              </div>
              <div>
                <div className="text-white font-bold text-md leading-5">
                  Eben Igbinoba
                </div>
                <span className="dark:text-dark-label-3 text-sm">igbinoba</span>
                <div className="flex mt-3">
                  <span className="dark:text-dark-label-2"> Rank </span>
                  <span className="text-white ml-3">3,811,465</span>
                </div>
              </div>
            </div>
            <div className="mt-5 w-full">
              <a className="bg-green-0 inline-block dark:bg-dark-green-0 text-green-s dark:text-dark-green-s hover:text-green-s dark:hover:text-dark-green-s w-full rounded-lg py-[7px] text-center font-medium">
                Edit profile
              </a>
            </div>
            <div className="flex gap-2 mt-3">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  className="text-gray-300"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.89 3.727l5.377 5.375a2.499 2.499 0 010 3.536l-7.77 7.776a2 2 0 01-1.415.586H5a2 2 0 01-2-2v-6.08a2 2 0 01.586-1.415l7.78-7.778a2.5 2.5 0 013.524 0zm-1.412 1.416l.002.002a.499.499 0 00-.702-.002L5 12.92V19h6.082l7.772-7.777a.499.499 0 000-.706l-5.376-5.374zm-4.01 9.389a1.249 1.249 0 11-1.766 1.766 1.249 1.249 0 011.766-1.766z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
              <div className="flex gap-1.5 flex-wrap">
                {["JavaScript", "Vue", "Reactjs", "sass", "Bootstra-gridp"].map(
                  (element, index) => (
                    <div
                      key={`cat_tags__${index}`}
                      className={` text-light-gray bg-dark-fill-3  py-0.5 flex items-center justify-center rounded-full px-2 text-xs font-normal`}
                    >
                      <span className="w-full h-full">{element}</span>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="h-2  border-t border-gray-7 my-5 mx-auto w-full"></div>
            <div>
              <div className="text-base font-medium leading-6">
                Community Stats
              </div>
              <div className="mt-4 flex flex-col space-y-4">
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2 text-[14px]">
                    <div className="text-[18px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        className="text-blue-s dark:text-dark-blue-s"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M1.104 12.444a1 1 0 010-.888c.13-.26.37-.693.722-1.241A18.85 18.85 0 013.88 7.652C6.184 5.176 8.896 3.667 12 3.667s5.816 1.509 8.119 3.985c.79.85 1.475 1.756 2.055 2.663.352.548.593.98.722 1.24a1 1 0 010 .89c-.13.26-.37.692-.722 1.24a18.848 18.848 0 01-2.055 2.663c-2.303 2.476-5.015 3.985-8.119 3.985s-5.816-1.509-8.119-3.985a18.846 18.846 0 01-2.055-2.663c-.352-.548-.593-.98-.722-1.24zM12 16a4 4 0 110-8 4 4 0 010 8zm0-2a2 2 0 100-4 2 2 0 000 4z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div className="text-label-2 dark:text-dark-label-2">
                      Views
                    </div>
                    <div className="text-white">0</div>
                  </div>
                  <div className="ml-7 space-x-1 text-xs text-label-3 dark:text-dark-label-3">
                    <span>Last week</span>
                    <span>
                      <span className="text-label-4 dark:text-dark-label-4">
                        0
                      </span>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2 text-[14px]">
                    <div className="text-[18px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        className="text-teal dark:text-dark-teal text-[#65d2ff]"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2.442 3.433C2 4.152 2 5.136 2 7.1v9.8c0 1.964 0 2.946.442 3.668a3 3 0 00.99.99C4.155 22 5.136 22 7.1 22h9.8c1.964 0 2.946 0 3.668-.442.403-.247.743-.587.99-.99C22 19.845 22 18.863 22 16.9V7.1c0-1.964 0-2.946-.442-3.667a3 3 0 00-.99-.99C19.845 2 18.863 2 16.9 2H7.1c-1.964 0-2.946 0-3.667.442a3 3 0 00-.99.99zm6.534 7.823l1.805 1.805 4.243-4.243a1 1 0 011.414 1.414l-4.95 4.95a1 1 0 01-1.414 0L7.562 12.67a1 1 0 111.414-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div className="text-label-2 dark:text-dark-label-2">
                      Solution
                    </div>
                    <div className="text-white">0</div>
                  </div>
                  <div className="ml-7 space-x-1 text-xs text-label-3 dark:text-dark-label-3">
                    <span>Last week</span>
                    <span>
                      <span className="text-label-4 dark:text-dark-label-4">
                        0
                      </span>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2 text-[14px]">
                    <div className="text-[18px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 18 18"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        className="text-olive dark:text-dark-olive"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9 12.553A3.746 3.746 0 0112.531 9l.22-.001a3.75 3.75 0 013.412 5.304l.33 1.727a.395.395 0 01-.462.462l-1.727-.331A3.75 3.75 0 019 12.749v-.197z"
                          clip-rule="evenodd"
                        ></path>
                        <path d="M1.5 8.251a6.75 6.75 0 013.73-6.036A6.657 6.657 0 018.249 1.5h.401a.75.75 0 01.042.001c2.95.164 5.403 2.265 6.112 5.065.101.402 0 .895-.543.911-.543.016-1.51.023-1.51.023a5.25 5.25 0 00-5.25 5.25s-.048 1.248-.024 1.5c.024.25-.513.64-.914.537a6.653 6.653 0 01-1.33-.502.05.05 0 00-.032-.004l-2.601.498a.75.75 0 01-.878-.877l.498-2.603a.05.05 0 00-.004-.032A6.655 6.655 0 011.5 8.251z"></path>
                      </svg>
                    </div>
                    <div className="text-label-2 dark:text-dark-label-2">
                      Discuss
                    </div>
                    <div className="text-white">0</div>
                  </div>
                  <div className="ml-7 space-x-1 text-xs text-label-3 dark:text-dark-label-3">
                    <span>Last week</span>
                    <span>
                      <span className="text-label-4 dark:text-dark-label-4">
                        0
                      </span>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2 text-[14px]">
                    <div className="text-[18px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        className="text-brand-orange dark:text-dark-brand-orange"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M11.394 2.074a2.5 2.5 0 011.212 0c.723.181 1.185.735 1.526 1.262.342.528.703 1.259 1.131 2.127l.392.795c.302.61.348.667.386.7a.498.498 0 00.086.063c.043.025.11.052.786.15l.877.128c.958.139 1.764.256 2.372.418.606.162 1.276.43 1.671 1.062a2.5 2.5 0 01.375 1.152c.052.744-.333 1.354-.728 1.841-.397.489-.98 1.058-1.674 1.733l-.634.619c-.489.476-.527.537-.548.583a.5.5 0 00-.033.101c-.01.05-.015.122.1.794l.15.873c.164.954.302 1.758.335 2.386.034.627-.014 1.346-.493 1.918-.263.314-.6.558-.98.712-.692.279-1.39.102-1.976-.124-.588-.226-1.309-.605-2.165-1.056l-.785-.412c-.603-.317-.674-.335-.724-.34a.497.497 0 00-.106 0c-.05.005-.12.023-.724.34l-.785.412c-.856.45-1.577.83-2.165 1.056-.585.226-1.284.403-1.976.124a2.5 2.5 0 01-.98-.712c-.48-.572-.527-1.291-.493-1.918.033-.628.171-1.431.335-2.386l.15-.873c.115-.672.11-.745.1-.794a.5.5 0 00-.033-.101c-.02-.046-.06-.107-.548-.583l-.634-.619c-.694-.675-1.277-1.244-1.674-1.733-.395-.487-.78-1.097-.728-1.841a2.5 2.5 0 01.375-1.152c.395-.633 1.065-.9 1.67-1.062.61-.162 1.415-.28 2.373-.418l.877-.128c.675-.098.743-.125.786-.15a.5.5 0 00.086-.062c.038-.034.084-.09.386-.701l.392-.795c.428-.868.789-1.599 1.131-2.127.341-.527.803-1.08 1.526-1.262z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div className="text-label-2 dark:text-dark-label-2">
                      Reputation
                    </div>
                    <div className="text-white">0</div>
                  </div>
                  <div className="ml-7 space-x-1 text-xs text-label-3 dark:text-dark-label-3">
                    <span>Last week</span>
                    <span>
                      <span className="text-label-4 dark:text-dark-label-4">
                        0
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-2  border-t border-gray-7 my-5 mx-auto w-full"></div>
              <div className="text-base font-medium leading-6">Languages</div>
              <div className="mt-4 flex flex-col space-y-3">
                <div className="flex items-center justify-between text-xs text-label-1 dark:text-dark-label-1">
                  <div className="text-xs">
                    <span
                      color="text-label-2 dark:text-dark-label-2"
                      className="inline-flex items-center px-2 whitespace-nowrap text-xs leading-6 rounded-full text-label-3 dark:text-dark-label-3 bg-fill-3 dark:bg-dark-fill-3 notranslate"
                    >
                      JavaScript
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-xs font-medium text-label-1 dark:text-dark-label-1">
                      1
                    </span>{" "}
                    &nbsp;
                    <span className="text-label-3 dark:text-dark-label-3">
                      problem solved
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-label-1 dark:text-dark-label-1">
                  <div className="text-xs">
                    <span
                      color="text-label-2 dark:text-dark-label-2"
                      className="inline-flex items-center px-2 whitespace-nowrap text-xs leading-6 rounded-full text-label-3 dark:text-dark-label-3 bg-fill-3 dark:bg-dark-fill-3 notranslate"
                    >
                      TypeScript
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-xs font-medium text-label-1 dark:text-dark-label-1">
                      1
                    </span>{" "}
                    &nbsp;
                    <span className="text-label-3 dark:text-dark-label-3">
                      problem solved
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-2  border-t border-gray-7 my-5 mx-auto w-full"></div>
              <div>
                <div className="text-base font-medium leading-6">Skills</div>
                <div className="mt-4 flex flex-col space-y-4">
                  <div>
                    <div className="flex items-center text-xs">
                      <span className="mr-1.5 flex">
                        <span className="inline-block h-1 w-1 rounded-full bg-red-s dark:bg-dark-red-s"></span>
                      </span>
                      <span className="font-medium text-white">Advanced</span>
                    </div>
                    <div className="mt-3 flex items-center justify-center text-xs text-label-4 dark:text-dark-label-4">
                      Not enough data
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center text-xs">
                      <span className="mr-1.5 flex">
                        <span className="inline-block h-1 w-1 rounded-full bg-yellow dark:bg-dark-yellow"></span>
                      </span>
                      <span className="font-medium text-white">Intermediate</span>
                    </div>
                    <div className="mt-3 flex flex-wrap">
                      <div className="mr-4 mb-3 inline-block text-xs">
                        <a href="/tag/hash-table/">
                          <span className="inline-flex items-center px-2 whitespace-nowrap text-xs leading-6 rounded-full bg-fill-3 dark:bg-dark-fill-3 cursor-pointer transition-all hover:bg-fill-2 dark:hover:bg-dark-fill-2 text-label-2 dark:text-dark-label-2">
                            Hash Table
                          </span>
                        </a>
                        <span className="pl-1 text-xs text-label-3 dark:text-dark-label-3">
                          x1
                        </span>
                      </div>
                      <div className="mr-4 mb-3 inline-block text-xs">
                        <a href="/tag/recursion/">
                          <span className="inline-flex items-center px-2 whitespace-nowrap text-xs leading-6 rounded-full bg-fill-3 dark:bg-dark-fill-3 cursor-pointer transition-all hover:bg-fill-2 dark:hover:bg-dark-fill-2 text-label-2 dark:text-dark-label-2">
                            Recursion
                          </span>
                        </a>
                        <span className="pl-1 text-xs text-label-3 dark:text-dark-label-3">
                          x1
                        </span>
                      </div>
                      <div className="mr-4 mb-3 inline-block text-xs">
                        <a href="/tag/math/">
                          <span className="inline-flex items-center px-2 whitespace-nowrap text-xs leading-6 rounded-full bg-fill-3 dark:bg-dark-fill-3 cursor-pointer transition-all hover:bg-fill-2 dark:hover:bg-dark-fill-2 text-label-2 dark:text-dark-label-2">
                            Math
                          </span>
                        </a>
                        <span className="pl-1 text-xs text-label-3 dark:text-dark-label-3">
                          x1
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="pb-1">
                    <div className="flex items-center text-xs">
                      <span className="mr-1.5 flex">
                        <span className="inline-block h-1 w-1 rounded-full bg-green-s dark:bg-dark-green-s"></span>
                      </span>
                      <span className="font-medium text-white">Fundamental</span>
                    </div>
                    <div className="mt-3 flex flex-wrap">
                      <div className="mr-4 mb-3 inline-block text-xs">
                        <a href="/tag/array/">
                          <span className="inline-flex items-center px-2 whitespace-nowrap text-xs leading-6 rounded-full bg-fill-3 dark:bg-dark-fill-3 cursor-pointer transition-all hover:bg-fill-2 dark:hover:bg-dark-fill-2 text-label-2 dark:text-dark-label-2">
                            Array
                          </span>
                        </a>
                        <span className="pl-1 text-xs text-label-3 dark:text-dark-label-3">
                          x1
                        </span>
                      </div>
                      <div className="mr-4 mb-3 inline-block text-xs">
                        <a href="/tag/linked-list/">
                          <span className="inline-flex items-center px-2 whitespace-nowrap text-xs leading-6 rounded-full bg-fill-3 dark:bg-dark-fill-3 cursor-pointer transition-all hover:bg-fill-2 dark:hover:bg-dark-fill-2 text-label-2 dark:text-dark-label-2">
                            Linked List
                          </span>
                        </a>
                        <span className="pl-1 text-xs text-label-3 dark:text-dark-label-3">
                          x1
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-9/12">
            <div className="flex gap-4">
              <div
                className="w-1/2 rounded-md bg-dark-layer-1 h-[186px] "
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.08) 0px 2px 4px, rgba(0, 0, 0, 0.08) 0px 4px 8px, rgba(0, 0, 0, 0.08) 0px 6px 12px",
                }}
              >
                <div className="px-[13px] text-xs font-medium text-label-3 dark:text-dark-label-3 pt-4">
                  Solved problems
                </div>
                <div className="mx-7 h-full ">
                  <div className="flex items-center justify-center gap-6">
                    <div className="w-5/12">
                      <div className="relative max-h-[115px] max-w-[115px] mt-5">
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
                            strokeWidth={`7`}
                            strokeLinecap="round"
                            stroke="currentColor"
                            className={`cursor-pointer text-dark-yellow`}
                            strokeDasharray="0.09645240603126558 263.79733049551135"
                            strokeDashoffset="0"
                            data-difficulty="EASY"
                          ></circle>
                        </svg>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-default text-center">
                          <div>
                            <div className="text-[24px] font-medium text-white dark:text-dark-label-1">
                              2
                            </div>
                            <div className="whitespace-nowrap text-xs text-label-3 dark:text-dark-label-3">
                              Solved
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-8/12 flex flex-col space-y-4 max-w-[228px]">
                      <div className="space-y-2">
                        <div className="flex w-full items-end text-xs">
                          <div className="w-[53px] text-label-3 dark:text-dark-label-3">
                            Easy
                          </div>
                          <div className="flex flex-1 items-center">
                            <span className="mr-[5px] text-base font-medium leading-[20px] text-white dark:text-dark-label-1">
                              1
                            </span>
                            <span className="text-xs font-medium text-label-4 dark:text-dark-label-4">
                              /687
                            </span>
                          </div>
                          <div className="lc-lg:hidden lc-xl:inline text-label-3 dark:text-dark-label-3">
                            <span className="text-label-4 dark:text-dark-label-4">
                              Not enough data
                            </span>
                          </div>
                        </div>
                        <div className="relative h-2 w-full overflow-hidden rounded-full h-1 max-w-none">
                          <div className="absolute h-full w-full bg-green-1 dark:bg-dark-green-1"></div>
                          <div
                            className="absolute h-full rounded-full transition-all duration-300 ease-out bg-olive dark:bg-dark-olive"
                            style={{ width: "0.14556%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex w-full items-end text-xs">
                          <div className="w-[53px] text-label-3 dark:text-dark-label-3">
                            Medium
                          </div>
                          <div className="flex flex-1 items-center">
                            <span className="mr-[5px] text-base font-medium leading-[20px] text-white dark:text-dark-label-1">
                              1
                            </span>
                            <span className="text-xs font-medium text-label-4 dark:text-dark-label-4">
                              /687
                            </span>
                          </div>
                          <div className="lc-lg:hidden lc-xl:inline text-label-3 dark:text-dark-label-3">
                            <span className="text-label-4 dark:text-dark-label-4">
                              Not enough data
                            </span>
                          </div>
                        </div>
                        <div className="relative h-2 w-full overflow-hidden rounded-full h-1 max-w-none">
                          <div className="absolute h-full w-full bg-green-1 dark:bg-dark-yellow-1"></div>
                          <div
                            className="absolute h-full rounded-full transition-all duration-300 ease-out bg-olive dark:bg-dark-olive"
                            style={{ width: "0.14556%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex w-full items-end text-xs">
                          <div className="w-[53px] text-label-3 dark:text-dark-label-3">
                            Hard
                          </div>
                          <div className="flex flex-1 items-center">
                            <span className="mr-[5px] text-base font-medium leading-[20px] text-white dark:text-dark-label-1">
                              1
                            </span>
                            <span className="text-xs font-medium text-label-4 dark:text-dark-label-4">
                              /687
                            </span>
                          </div>
                          <div className="lc-lg:hidden lc-xl:inline text-label-3 dark:text-dark-label-3">
                            <span className="text-label-4 dark:text-dark-label-4">
                              Not enough data
                            </span>
                          </div>
                        </div>
                        <div className="relative h-2 w-full overflow-hidden rounded-full h-1 max-w-none">
                          <div className="absolute h-full w-full bg-green-1 dark:bg-dark-red-1"></div>
                          <div
                            className="absolute h-full rounded-full transition-all duration-300 ease-out bg-olive dark:bg-dark-olive"
                            style={{ width: "0.14556%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="w-1/2 rounded-md bg-dark-layer-1 h-[186px]"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.08) 0px 2px 4px, rgba(0, 0, 0, 0.08) 0px 4px 8px, rgba(0, 0, 0, 0.08) 0px 6px 12px",
                }}
              >
                <div className="p-4">
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-label-3 dark:text-dark-label-3 text-xs">
                          Badges
                        </div>
                        <div className="text-white dark:text-dark-label-1 mt-1.5 text-2xl leading-[18px]">
                          0
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full justify-end">
                      <img
                        src="https://leetcode.com/static/images/badges/dcc-2023-6.png"
                        alt="upcoming badge"
                        className="mr-5 h-[72px] cursor-pointer opacity-5"
                      />
                    </div>
                    <div className="text-label-3 dark:text-dark-label-3 text-xs">
                      Locked Badge
                    </div>
                    <div className="text-white dark:text-dark-label-1 text-base">
                      Jun LeetCoding Challenge
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="h-[186x] rounded-md bg-dark-layer-1 mt-4 p-4"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.08) 0px 2px 4px, rgba(0, 0, 0, 0.08) 0px 4px 8px, rgba(0, 0, 0, 0.08) 0px 6px 12px",
              }}
            >
              <div className="flex flex-col flex-wrap space-y-2 md:flex-row md:items-center md:space-y-0">
                <div className="flex flex-1 items-center">
                  <span className="mr-[5px] text-white font-medium md:text-xl">
                    4
                  </span>
                  <span className="whitespace-nowrap md:text-base text-label-2 dark:text-dark-label-2">
                    submissions in the last year
                  </span>
                  <div className="ml-1 mr-2 text-gray-5 dark:text-dark-gray-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="text-gray-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 11a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm0-3a1 1 0 110 2 1 1 0 010-2zm0 14C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16z"
                        clip-Rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="flex items-center text-xs">
                  <div className="mr-4.5 space-x-1">
                    <span className="text-label-3 dark:text-dark-label-3">
                      Total active days:
                    </span>
                    <span className="font-medium text-label-2 dark:text-dark-label-2">
                      2
                    </span>
                  </div>
                  <div className="space-x-1">
                    <span className="text-label-3 dark:text-dark-label-3">
                      Max streak:
                    </span>
                    <span className="font-medium text-label-2 dark:text-dark-label-2">
                      1
                    </span>
                  </div>
                  <div className="ml-[21px]">
                    <div className="relative">
                      <button
                        className="flex cursor-pointer items-center rounded px-3 py-1.5 text-left focus:outline-none whitespace-nowrap bg-fill-3 dark:bg-dark-fill-3 text-label-2 dark:text-dark-label-2 hover:bg-fill-2 dark:hover:bg-dark-fill-2 active:bg-fill-3 dark:active:bg-dark-fill-3"
                        id="headlessui-listbox-button-:r8k4:"
                        type="button"
                        aria-haspopup="true"
                        aria-expanded="false"
                        data-headlessui-state=""
                      >
                        Current
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          className="pointer-events-none ml-3"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.929 7.913l7.078 7.057 7.064-7.057a1 1 0 111.414 1.414l-7.77 7.764a1 1 0 01-1.415 0L3.515 9.328a1 1 0 011.414-1.414z"
                            clip-Rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 ml-4">
                <GitHubCalendar
                  loading={false}
                  hideColorLegend={true}
                  hideTotalCount={true}
                  showWeekdayLabels={true}
                  transformData={(days) =>
                    days.map(({ date, count, level }) => {
                      if (date.split("-")[2] === "01") {
                        return { date, count, level: 1 };
                      }
                      return { date, count, level: 0 };
                    })
                  }
                  weekStart={1}
                  year={2022}
                  username="grubersjoe"
                />
              </div>
            </div>
            <div className="mt-4">
              <div
                className="bg-layer-1 dark:bg-dark-layer-1 rounded-lg px-4 pt-4 pb-4"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.08) 0px 2px 4px, rgba(0, 0, 0, 0.08) 0px 4px 8px, rgba(0, 0, 0, 0.08) 0px 6px 12px",
                }}
              >
                <div className="space-y-[18px]">
                  <div className="text-label-2 dark:text-dark-label-2 flex w-full items-center">
                    <div className="cursor-pointer">
                      <div className="text-label-1 dark:text-dark-label-1 bg-fill-3 dark:bg-dark-fill-3 flex items-center rounded-[5px] px-5 py-[10px] font-medium md:space-x-2 hover:text-label-1 dark:hover:text-dark-label-1">
                        <span className="hidden text-2xl md:inline">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M20.995 4.824A3 3 0 0018 2H6l-.176.005A3 3 0 003 5v14l.005.176A3 3 0 006 22h12l.176-.005A3 3 0 0021 19V5l-.005-.176zM6 4h12l.117.007A1 1 0 0119 5v14l-.007.117A1 1 0 0118 20H6l-.117-.007A1 1 0 015 19V5l.007-.117A1 1 0 016 4zm5.718 9.304a1 1 0 01.063 1.321l-.085.093-2.062 2a1 1 0 01-1.3.08l-.093-.08-.937-.91A1 1 0 018.6 14.292l.095.082.241.234 1.367-1.325a1 1 0 011.414.022zM17 15a1 1 0 00-1-1h-2l-.117.007A1 1 0 0014 16h2l.117-.007A1 1 0 0017 15zm-5.282-7.696a1 1 0 01.063 1.321l-.085.093-2.062 2a1 1 0 01-1.3.08l-.093-.08-.937-.91A1 1 0 018.6 8.292l.095.082.241.234 1.367-1.325a1 1 0 011.414.022zM17 9a1 1 0 00-1-1h-2l-.117.007A1 1 0 0014 10h2l.117-.007A1 1 0 0017 9z"
                              clip-Rule="evenodd"
                            ></path>
                          </svg>
                        </span>
                        <span className="whitespace-nowrap">Recent AC</span>
                      </div>
                    </div>
                    <div className="cursor-pointer">
                      <div className="flex items-center rounded-[5px] px-5 py-[10px] font-medium md:space-x-2 hover:text-label-1 dark:hover:text-dark-label-1">
                        <span className="hidden text-2xl md:inline">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M20.995 4.824A3 3 0 0018 2H6l-.176.005A3 3 0 003 5v14l.005.176A3 3 0 006 22h12l.176-.005A3 3 0 0021 19V5l-.005-.176zM6 4h12l.117.007A1 1 0 0119 5v14l-.007.117A1 1 0 0118 20H6l-.117-.007A1 1 0 015 19V5l.007-.117A1 1 0 016 4z"
                              clip-Rule="evenodd"
                            ></path>
                            <path
                              fillRule="evenodd"
                              d="M10.763 12.827l-1.06-1.06a1 1 0 00-1.415 1.414l1.415 1.414a1.5 1.5 0 002.12 0l3.889-3.888a1 1 0 00-1.415-1.414l-3.534 3.534z"
                              clip-Rule="evenodd"
                            ></path>
                          </svg>
                        </span>
                        <span className="whitespace-nowrap">Solutions</span>
                      </div>
                    </div>
                    <div className="cursor-pointer">
                      <div className="flex items-center rounded-[5px] px-5 py-[10px] font-medium md:space-x-2 hover:text-label-1 dark:hover:text-dark-label-1">
                        <span className="hidden text-2xl md:inline">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2 11.001a9.001 9.001 0 014.974-8.047A8.876 8.876 0 0110.998 2h.535c.018 0 .037 0 .055.002 3.934.218 7.204 3.02 8.15 6.753a1 1 0 01-1.94.49c-.734-2.9-3.27-5.065-6.294-5.245h-.51a6.876 6.876 0 00-3.12.74l-.004.002A7.001 7.001 0 004 11.003v.002a6.873 6.873 0 00.738 3.117c.206.407.271.871.185 1.32l-.387 2.022 2.022-.387c.448-.086.912-.021 1.32.185.44.222.9.395 1.373.518a1 1 0 11-.502 1.936 8.865 8.865 0 01-1.773-.669.067.067 0 00-.042-.006l-3.47.665a1 1 0 01-1.17-1.17l.665-3.47a.067.067 0 00-.006-.043A8.873 8.873 0 012 11.001zM17.004 20h-.005a3 3 0 01-2.68-1.658l-.004-.007A2.936 2.936 0 0114 17.004v-.206a2.995 2.995 0 012.773-2.797l.233-.001c.46-.001.917.107 1.33.315l.007.004A3 3 0 0120 17v.005c.001.425-.09.845-.268 1.232l-.133.29a1 1 0 00-.074.606l.093.485-.484-.093a1 1 0 00-.606.073l-.29.134a2.937 2.937 0 01-1.234.268zm-.296-8A4.995 4.995 0 0012 16.738v.262c-.002.777.18 1.543.53 2.237a5 5 0 006.542 2.313l2.303.441c.365.07.686-.25.616-.615l-.441-2.303a5 5 0 00-2.312-6.541A4.937 4.937 0 0017 12h-.292z"
                              clip-Rule="evenodd"
                            ></path>
                          </svg>
                        </span>
                        <span className="whitespace-nowrap">Discuss</span>
                      </div>
                    </div>
                    <div
                      className="ml-auto flex items-center overflow-auto whitespace-nowrap hidden"
                      style={{ overflowX: "hidden" }}
                    >
                      <div className="group ml-4 inline-block items-center space-x-4">
                        <div className="text-label-1 dark:text-dark-label-1 flex cursor-pointer items-center space-x-2">
                          <span className="text-base group-hover:text-gray-8 dark:group-hover:text-dark-gray-8 text-gray-8 dark:text-dark-gray-8">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="1em"
                              height="1em"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm1-13.4v4.782l3.047 1.524a1 1 0 11-.894 1.788l-3.6-1.8A1 1 0 0111 12V6.6a1 1 0 112 0z"
                                clip-Rule="evenodd"
                              ></path>
                            </svg>
                          </span>
                          <span className="text-xs group-hover:text-label-1 dark:group-hover:text-dark-label-1 text-label-1 dark:text-dark-label-1">
                            Most Recent
                          </span>
                        </div>
                      </div>
                      <div className="w-px ml-4 inline-block h-3 bg-gray-3 dark:bg-dark-gray-3"></div>
                      <div className="group ml-4 inline-block items-center space-x-4">
                        <div className="flex cursor-pointer items-center space-x-2">
                          <span className="text-base group-hover:text-gray-8 dark:group-hover:text-dark-gray-8 text-gray-6 dark:text-dark-gray-6">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 18 18"
                              width="1em"
                              height="1em"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.19 1.564a.75.75 0 01.729.069c2.137 1.475 3.373 3.558 3.981 5.002l.641-.663a.75.75 0 011.17.115c1.633 2.536 1.659 5.537.391 7.725-1.322 2.282-3.915 2.688-5.119 2.688-1.177 0-3.679-.203-5.12-2.688-.623-1.076-.951-2.29-.842-3.528.109-1.245.656-2.463 1.697-3.54.646-.67 1.129-1.592 1.468-2.492.337-.895.51-1.709.564-2.105a.75.75 0 01.44-.583zm.784 2.023c-.1.368-.226.773-.385 1.193-.375.997-.947 2.13-1.792 3.005-.821.851-1.205 1.754-1.282 2.63-.078.884.153 1.792.647 2.645C6.176 14.81 7.925 15 8.983 15c1.03 0 2.909-.366 3.822-1.94.839-1.449.97-3.446.11-5.315l-.785.812a.75.75 0 01-1.268-.345c-.192-.794-1.04-2.948-2.888-4.625z"
                                clip-Rule="evenodd"
                              ></path>
                            </svg>
                          </span>
                          <span className="text-xs group-hover:text-label-1 dark:group-hover:text-dark-label-1 text-label-3 dark:text-dark-label-3">
                            Most Votes
                          </span>
                        </div>
                      </div>
                    </div>
                    <a
                      className="text-label-3 dark:text-dark-label-3 hover:text-label-2 dark:hover:text-dark-label-2 text-xs font-medium ml-auto flex cursor-pointer items-center overflow-hidden pl-[50px]"
                      href="/submissions/"
                    >
                      <div
                        className="flex items-center overflow-auto"
                        style={{ overflowX: "hidden" }}
                      >
                        <span className="whitespace-nowrap">
                          View all submissions
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          className="ml-1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.913 19.071l7.057-7.078-7.057-7.064a1 1 0 011.414-1.414l7.764 7.77a1 1 0 010 1.415l-7.764 7.785a1 1 0 01-1.414-1.414z"
                            clip-Rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <a
                      className="flex h-[56px] items-center rounded px-4 bg-fill-4 dark:bg-dark-fill-4"
                      target="_blank"
                      href="/submissions/detail/970601782/"
                    >
                      <div
                        data-title="Add Two Numbers"
                        className="flex flex-1 justify-between"
                      >
                        <span className="text-label-1 dark:text-dark-label-1 font-medium line-clamp-1">
                          Add Two Numbers
                        </span>
                        <span className="text-label-3 dark:text-dark-label-3 hidden whitespace-nowrap md:inline">
                          10 days ago
                        </span>
                      </div>
                    </a>
                    <a
                      className="flex h-[56px] items-center rounded px-4"
                      target="_blank"
                      href="/submissions/detail/835465845/"
                    >
                      <div
                        data-title="Two Sum"
                        className="flex flex-1 justify-between"
                      >
                        <span className="text-label-1 dark:text-dark-label-1 font-medium line-clamp-1">
                          Two Sum
                        </span>
                        <span className="text-label-3 dark:text-dark-label-3 hidden whitespace-nowrap md:inline">
                          8 months ago
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
