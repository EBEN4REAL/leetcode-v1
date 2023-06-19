import { auth } from "@/firebase/firebase";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Logout from "../Buttons/Logout";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import Timer from "../Timer/Timer";
import { useRouter } from "next/router";
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/types/problem";
import { MdArrowDropDown } from "react-icons/md";
import { Hamburger } from "@/icons/hamburger";
import { Notification } from "@/icons/Notification";
import { Close } from "@/icons/Close";
import { RxCaretDown } from "react-icons/rx";
import { useSignOut } from "react-firebase-hooks/auth";
import Dropdown from "@/components/Custom-dropdown/Dropdown";

type TopbarProps = {
  problemPage?: boolean;
};

interface Nav {
  name: string;
  hasDropdown: boolean;
}

const Topbar: React.FC<TopbarProps> = ({ problemPage }) => {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("Problems");
  const [navTabs, setNavTabs] = useState<Nav[]>([
    {
      name: "Explore",
      hasDropdown: false,
    },
    {
      name: "Problems",
      hasDropdown: false,
    },
    {
      name: "Contest",
      hasDropdown: false,
    },
    {
      name: "Discuss",
      hasDropdown: false,
    },
    {
      name: "Interviews",
      hasDropdown: true,
    },
  ]);
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const [darkThemeToggle, setDarkThemeToggle] = useState<boolean>(true);
  const [signOut, loading, error] = useSignOut(auth);

  const navigationTabs = () =>
    navTabs.map((nav) => {
      const isActive = nav.name === activeTab;

      const handleClick = () => setActiveTab(nav.name);

      return (
        <li
          key={nav.name}
          className={`flex text-light-gray ${
            isActive ? "border-b-2 border-text-white pb-2" : ""
          }`}
          onClick={handleClick}
        >
          {nav.name} {nav.hasDropdown && <MdArrowDropDown className="mt-1" />}
        </li>
      );
    });

  const handleProblemChange = (isForward: boolean) => {
    const { order } = problems[router.query.pid as string] as Problem;
    const direction = isForward ? 1 : -1;
    const nextProblemOrder = order + direction;
    const nextProblemKey = Object.keys(problems).find(
      (key) => problems[key].order === nextProblemOrder
    );

    if (isForward && !nextProblemKey) {
      const firstProblemKey = Object.keys(problems).find(
        (key) => problems[key].order === 1
      );
      router.push(`/problems/${firstProblemKey}`);
    } else if (!isForward && !nextProblemKey) {
      const lastProblemKey = Object.keys(problems).find(
        (key) => problems[key].order === Object.keys(problems).length
      );
      router.push(`/problems/${lastProblemKey}`);
    } else {
      router.push(`/problems/${nextProblemKey}`);
    }
  };

  const list = [
    {
      name: "My Lists",
      src: "https://leetcode.com/_next/static/images/starred-2e4c5ddcac0ba3a09087d8ff98eff50c.png",
    },
    {
      name: "Notebook",
      src: "https://leetcode.com/_next/static/images/notebook-92e90c87d33d7403f2f016c245b203a7.png",
    },
    {
      name: "Submissions",
      src: "https://leetcode.com/_next/static/images/answer-9dab99b273b399a43f8826c193d187d5.png",
    },
    {
      name: "Progress",
      src: "https://leetcode.com/_next/static/images/progress-106c8d8956a5f08d22006a6ea911e6c3.png",
    },
    {
      name: "Points",
      src: "https://leetcode.com/_next/static/images/coin-9ed5754318458315a57c46abd2f431c1.png",
    },
    {
      name: "Sessions",
      src: "https://leetcode.com/_next/static/images/session-8dc060863ecf9d6f77c4c9a2963ea6ff.png",
    },
  ];

  return (
    <nav className="z-10 md:z-0 lg:z-0 fixed top-0 left-0 md:static lg:static  md:flex lg:flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7 ">
      <div
        className={` flex   w-full items-center justify-between ${
          !problemPage ? "max-w-[1150px] h-[50px] mx-auto" : ""
        }`}
      >
        {!navOpen && (
          <Hamburger handleNavOpen={() => setNavOpen((navOpen) => !navOpen)} />
        )}
        {navOpen && (
          <Close handleNavOpen={() => setNavOpen((navOpen) => !navOpen)} />
        )}
        <Link href="/" className="md:flex-1 lg:flex-1">
          <div className="md:flex sm:flex  gap-7 h-5">
            <img
              src="https://leetcode.com/_next/static/images/logo-dark-c96c407d175e36c81e236fcfdd682a0b.png"
              className="h-full"
              alt="LeetCode Logo"
            />
            <div className="hidden md:block lg:block">
              <ul className={`flex gap-7`}>{navigationTabs()}</ul>
            </div>
          </div>
        </Link>
        <div className="relative">
          <Notification />
          <div className="md:hidden lg:hidden block pointer-events-none absolute top-0.5 right-1 h-[7px] w-[7px] rounded-full  group-hover:border-gray-2 dark:group-hover:border-dark-gray-4">
            <div className="h-full w-full rounded-full bg-red-600 dark:bg-dark-red-s"></div>
          </div>
        </div>

        {navOpen && (
          <div className="absolute w-full top-12 left-0 md:hidden lg:hidden z-10 py-4  dark:bg-gray-level-1 overflow-y-auto">
            {user && (
              <div className="flex items-center gap-2">
                <div className="h-14 w-14 relative">
                  <img
                    src="https://assets.leetcode.com/users/igbinoba/avatar_1588932571.png"
                    alt="Avatar"
                    className="rounded-full w-full h-full"
                  />
                </div>
                <div>
                  <div className="mb-1 font-bold text-xl text-white">
                    igbinoba
                  </div>
                  <div className="text-xs text-brand-orange">
                    Access all features with our Premium subscription!
                  </div>
                </div>
              </div>
            )}
            {user && (
              <div className="flex gap-3 my-3 overflow-x-scroll">
                {list.map((list, index) => (
                  <div
                    key={`list___${index}`}
                    className="bg-fill-4 shrink-0 dark:bg-dark-fill-4 hover:bg-fill-3 dark:hover:bg-dark-fill-3 flex h-20 w-20 gap-2  flex-col items-center justify-center rounded-lg"
                  >
                    <div className="h-9 w-10 relative">
                      <img
                        src={list.src}
                        alt={list.name}
                        className="w-full h-full"
                      />
                    </div>
                    <span className="text-xs dark:text-dark-label-2">
                      {list.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {!user && (
              <div className="px-2 flex gap-1 items-center text-white teext-xs">
                <Link
                  href="/auth"
                  onClick={() =>
                    setAuthModalState((prev) => ({
                      ...prev,
                      isOpen: true,
                      type: "register",
                    }))
                  }
                >
                  <button className=" py-1 px-2 cursor-pointer rounded ">
                    Register
                  </button>
                </Link>
                <span>|</span>
                <Link
                  href="/auth"
                  onClick={() =>
                    setAuthModalState((prev) => ({
                      ...prev,
                      isOpen: true,
                      type: "login",
                    }))
                  }
                >
                  <button className=" py-1 px-2 cursor-pointer rounded ">
                    Sign In
                  </button>
                </Link>
              </div>
            )}
            {!user && (
              <div className="h-2  border-t border-gray-7 my-3 mx-auto w-full"></div>
            )}
            <div className="">
              <div className="flex flex-col gap-2 px-4 overflow-x-auto">
                <div className="text-white flex  text-sm hover:bg-dark-fill-3 p-2 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="dark:text-dark-label-2 mr-2"
                    width="18"
                    height="18"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M13.183 13.68a1 1 0 00.365-.365l3.144-5.434c.1-.174-.09-.371-.267-.276l-5.57 2.97a1 1 0 00-.412.411l-2.97 5.57c-.095.178.102.369.276.268l5.434-3.144zm-.736-.934a.75.75 0 11-1.061-1.061.75.75 0 011.06 1.06z"
                      clipRule="evenodd"
                    ></path>
                    <path
                      fillRule="evenodd"
                      d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-2 0a8 8 0 11-16 0 8 8 0 0116 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Explore
                </div>
                <div className="text-white flex text-sm hover:bg-dark-fill-3 p-2 rounded-md">
                  <svg
                    className="dark:text-dark-label-2 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M20.995 4.824A3 3 0 0018 2H6l-.176.005A3 3 0 003 5v14l.005.176A3 3 0 006 22h12l.176-.005A3 3 0 0021 19V5l-.005-.176zM6 4h12l.117.007A1 1 0 0119 5v14l-.007.117A1 1 0 0118 20H6l-.117-.007A1 1 0 015 19V5l.007-.117A1 1 0 016 4zm5.718 9.304a1 1 0 01.063 1.321l-.085.093-2.062 2a1 1 0 01-1.3.08l-.093-.08-.937-.91A1 1 0 018.6 14.292l.095.082.241.234 1.367-1.325a1 1 0 011.414.022zM17 15a1 1 0 00-1-1h-2l-.117.007A1 1 0 0014 16h2l.117-.007A1 1 0 0017 15zm-5.282-7.696a1 1 0 01.063 1.321l-.085.093-2.062 2a1 1 0 01-1.3.08l-.093-.08-.937-.91A1 1 0 018.6 8.292l.095.082.241.234 1.367-1.325a1 1 0 011.414.022zM17 9a1 1 0 00-1-1h-2l-.117.007A1 1 0 0014 10h2l.117-.007A1 1 0 0017 9z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Problems
                </div>
                <div className="text-white flex   text-sm hover:bg-dark-fill-3 p-2 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="dark:text-dark-label-2 mr-2"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 11.001a9.001 9.001 0 014.974-8.047A8.876 8.876 0 0110.998 2h.535c.018 0 .037 0 .055.002 3.934.218 7.204 3.02 8.15 6.753a1 1 0 01-1.94.49c-.734-2.9-3.27-5.065-6.294-5.245h-.51a6.876 6.876 0 00-3.12.74l-.004.002A7.001 7.001 0 004 11.003v.002a6.873 6.873 0 00.738 3.117c.206.407.271.871.185 1.32l-.387 2.022 2.022-.387c.448-.086.912-.021 1.32.185.44.222.9.395 1.373.518a1 1 0 11-.502 1.936 8.865 8.865 0 01-1.773-.669.067.067 0 00-.042-.006l-3.47.665a1 1 0 01-1.17-1.17l.665-3.47a.067.067 0 00-.006-.043A8.873 8.873 0 012 11.001zM17.004 20h-.005a3 3 0 01-2.68-1.658l-.004-.007A2.936 2.936 0 0114 17.004v-.206a2.995 2.995 0 012.773-2.797l.233-.001c.46-.001.917.107 1.33.315l.007.004A3 3 0 0120 17v.005c.001.425-.09.845-.268 1.232l-.133.29a1 1 0 00-.074.606l.093.485-.484-.093a1 1 0 00-.606.073l-.29.134a2.937 2.937 0 01-1.234.268zm-.296-8A4.995 4.995 0 0012 16.738v.262c-.002.777.18 1.543.53 2.237a5 5 0 006.542 2.313l2.303.441c.365.07.686-.25.616-.615l-.441-2.303a5 5 0 00-2.312-6.541A4.937 4.937 0 0017 12h-.292z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Discuss
                </div>
                <div className="text-white flex items-center text-sm hover:bg-dark-fill-3 p-2 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="dark:text-dark-label-2 mr-2"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.5 4.587v7.182c0 .575.184 1.463.707 2.18.487.665 1.312 1.251 2.793 1.251 1.48 0 2.306-.586 2.793-1.252.523-.716.707-1.604.707-2.179V4.587a10.732 10.732 0 00-7 0zm-1.557 9.371A5.957 5.957 0 016.5 11.77V8.6c-.536-.116-1.12-.158-1.587-.05-.312.073-.514.198-.644.358C4.14 9.064 4 9.357 4 9.923c0 1.399.848 2.694 2.361 3.687.186.122.38.238.582.348zM6.5 6.566V3.923a1 1 0 01.544-.89C7.779 2.656 9.674 2 12 2c2.325 0 4.221.656 4.956 1.033a1 1 0 01.544.89v2.643c.647-.101 1.364-.122 2.038.035.626.145 1.267.455 1.746 1.045.482.594.716 1.367.716 2.277 0 2.294-1.402 4.137-3.264 5.36-1.609 1.055-3.649 1.716-5.736 1.878V20h4.4a1 1 0 110 2H6.6a1 1 0 110-2H11v-2.839c-2.087-.162-4.127-.823-5.736-1.879C3.402 14.06 2 12.217 2 9.923c0-.91.234-1.683.716-2.277.48-.59 1.12-.9 1.746-1.045.674-.157 1.391-.136 2.038-.035zm11 2.033c.536-.116 1.12-.158 1.587-.05.312.073.515.198.645.358.127.157.268.45.268 1.016 0 1.399-.848 2.694-2.361 3.687-.186.122-.38.238-.582.348a5.956 5.956 0 00.443-2.189V8.6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Contest
                </div>
                <Dropdown
                  toggleElement={
                    <div className="text-white flex  items-center text-sm hover:bg-dark-fill-3 p-2 rounded-md justify-between _dropdown">
                      <div className="flex gap-2 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="dark:text-dark-label-2"
                          viewBox="0 0 24 24"
                          width="18"
                          height="18"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M14 20h3a1 1 0 001-1V5a1 1 0 00-1-1H7a1 1 0 00-1 1v14a1 1 0 001 1h3v-2a1 1 0 011-1h2a1 1 0 011 1v2zM7 2h10a3 3 0 013 3v14a3 3 0 01-3 3H7a3 3 0 01-3-3V5a3 3 0 013-3zm2.5 4h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5zm0 3h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5zm0 3h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5zm4-6h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5zm0 3h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5zm0 3h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        Interview
                      </div>
                      <RxCaretDown className="text-2xl" />
                    </div>
                  }
                >
                  <div className="flex flex-col space-y-3 px-4 py-3">
                    <div className="dark:text-dark-label-2 text-sm">
                      Online Interview
                    </div>
                    <div className="dark:text-dark-label-2 text-sm">
                      Assessments
                    </div>
                  </div>
                </Dropdown>
                <Dropdown
                  toggleElement={
                    <div className="text-white flex  items-center text-sm hover:bg-dark-fill-3 p-2 rounded-md justify-between _dropdown">
                      <div className="flex gap-2 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="dark:text-dark-label-2 "
                          viewBox="0 0 24 24"
                          width="18"
                          height="18"
                          fill="currentColor"
                        >
                          <path d="M4 4a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1z"></path>
                          <path
                            fillRule="evenodd"
                            d="M18 14H6v5h12v-5zM4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7H4z"
                            clipRule="evenodd"
                          ></path>
                          <path
                            fillRule="evenodd"
                            d="M4.766 8l-.5 4h15.468l-.5-4H4.766zm-.883-2a1 1 0 00-.993.876l-.75 6A1 1 0 003.133 14h17.734a1 1 0 00.992-1.124l-.75-6A1 1 0 0020.117 6H3.883z"
                            clipRule="evenodd"
                          ></path>
                          <path d="M14 12h2v9h-2v-9z"></path>
                        </svg>
                        Store
                      </div>
                      <RxCaretDown className="text-2xl" />
                    </div>
                  }
                >
                  <div className="flex flex-col space-y-3 px-4 py-3">
                    <div className="dark:text-dark-label-2 text-sm">
                      Redeem
                    </div>
                    <div className="dark:text-dark-label-2 text-sm">
                      Premium
                    </div>
                  </div>
                </Dropdown>
              </div>
            </div>
            {user && (
              <div className="h-2  border-t border-gray-7 mt-3 mx-auto w-11/12"></div>
            )}

            {user && (
              <div className="flex flex-col gap-2 px-2">
                <div className="flex gap-0.5 text-white text-sm hover:bg-dark-fill-3 p-2 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="dark:text-dark-label-2 mr-2"
                    width="18"
                    height="18"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 2a2 2 0 011.995 1.85L16 4v1a2 2 0 01-1.85 1.995L14 7h-4a2 2 0 01-1.995-1.85L8 5V4a2 2 0 011.85-1.995L10 2h4zm3.96 2H18a3 3 0 012.995 2.824L21 7v12a3 3 0 01-2.824 2.995L18 22H6a3 3 0 01-2.995-2.824L3 19V7a3 3 0 012.824-2.995L6.056 4a1 1 0 01.117 1.993L6.056 6H6a1 1 0 00-.993.883L5 7v12a1 1 0 00.883.993L6 20h12a1 1 0 00.993-.883L19 19V7a1 1 0 00-.883-.993L18 6h-.04a1 1 0 01-.116-1.993L17.961 4zM15 14a1 1 0 01.117 1.993L15 16H9a1 1 0 01-.117-1.993L9 14h6zm1-3a1 1 0 00-1-1H9l-.117.007A1 1 0 009 12h6l.117-.007A1 1 0 0016 11zm-6-7h4v1h-4V4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Orders
                </div>
                <div className="flex gap-0.5 text-white text-sm hover:bg-dark-fill-3 p-2 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="dark:text-dark-label-2 mr-2"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 18a1 1 0 110 2H5.7C3.663 20 2 18.383 2 16.375v-8.75C2 5.617 3.663 4 5.7 4h12.6C20.337 4 22 5.617 22 7.625v4.813a1 1 0 11-2 0V7.625C20 6.734 19.245 6 18.3 6H5.7C4.755 6 4 6.734 4 7.625v8.75C4 17.266 4.755 18 5.7 18H12zm5-2v-1.5a1 1 0 012 0V16h1.5a1 1 0 010 2H19v1.5a1 1 0 01-2 0V18h-1.5a1 1 0 010-2H17zm-7.973-4L6.906 9.879A1 1 0 018.32 8.464l2.475 2.475a1.5 1.5 0 010 2.122L8.32 15.536a1 1 0 11-1.414-1.415L9.027 12z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  My Playground
                </div>
                <div className="flex items-center justify-between text-white text-sm hover:bg-dark-fill-3 p-2 rounded-md">
                  <div className="flex items-center gap-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="dark:text-dark-label-2 mr-2"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 18a1 1 0 110 2H5.7C3.663 20 2 18.383 2 16.375v-8.75C2 5.617 3.663 4 5.7 4h12.6C20.337 4 22 5.617 22 7.625v4.813a1 1 0 11-2 0V7.625C20 6.734 19.245 6 18.3 6H5.7C4.755 6 4 6.734 4 7.625v8.75C4 17.266 4.755 18 5.7 18H12zm5-2v-1.5a1 1 0 012 0V16h1.5a1 1 0 010 2H19v1.5a1 1 0 01-2 0V18h-1.5a1 1 0 010-2H17zm-7.973-4L6.906 9.879A1 1 0 018.32 8.464l2.475 2.475a1.5 1.5 0 010 2.122L8.32 15.536a1 1 0 11-1.414-1.415L9.027 12z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <div>
                      Dark Side
                      <span className="bg-red-1 dark:bg-red-1 text-red-s dark:text-red-s rounded p-1 ml-2">
                        Beta
                      </span>
                    </div>
                  </div>
                  <div
                    className={`h-5 flex items-center w-[42px]  transition-all ${
                      darkThemeToggle
                        ? "justify-end bg-blue-500"
                        : "justify-start bg-fill-2"
                    }  rounded-full `}
                    onClick={() => setDarkThemeToggle((prev) => !prev)}
                  >
                    <div className="mx-1 my-1 h-4 w-4 bg-white  rounded-full"></div>
                  </div>
                </div>
                <div className="flex justify-between text-white text-sm hover:bg-dark-fill-3 p-2 rounded-md">
                  <div className="flex gap-0.5" onClick={() => signOut()}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="dark:text-dark-label-2 mr-2"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18.586 13h-8.083c-.523 0-.947-.448-.947-1s.424-1 .947-1h8.083l-2.738-2.737a1 1 0 011.415-1.415l4.444 4.445a1 1 0 010 1.414l-4.444 4.445a1 1 0 01-1.415-1.415L18.586 13zM9 5H6a1 1 0 00-1 1v12a1 1 0 001 1h3a1 1 0 110 2H6a3 3 0 01-3-3V6a3 3 0 013-3h3a1 1 0 010 2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Sign Out
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {problemPage && (
          <div className="md:flex lg:flex  items-center gap-4 flex-1 md:justify-center lg:justify-center hidden">
            <div
              className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer"
              onClick={() => handleProblemChange(false)}
            >
              <FaChevronLeft />
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 font-medium max-w-[170px] text-dark-gray-8 cursor-pointer"
            >
              <div>
                <BsList />
              </div>
              <p>Problem List</p>
            </Link>
            <div
              className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer"
              onClick={() => handleProblemChange(true)}
            >
              <FaChevronRight />
            </div>
          </div>
        )}

        <div className="md:flex lg:flex hidden items-center space-x-4 flex-1 justify-end">
          <div>
            <a
              href="https://www.buymeacoffee.com/burakorkmezz"
              target="_blank"
              rel="noreferrer"
              className="bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange hover:bg-dark-fill-2"
            >
              Premium
            </a>
          </div>
          {!user && (
            <Link
              href="/auth"
              onClick={() =>
                setAuthModalState((prev) => ({
                  ...prev,
                  isOpen: true,
                  type: "login",
                }))
              }
            >
              <button className="bg-dark-fill-3 py-1 px-2 cursor-pointer rounded ">
                Sign In
              </button>
            </Link>
          )}
          {user && problemPage && <Timer />}
          {user && (
            <div className="cursor-pointer group relative">
              <Image
                src="/avatar.png"
                alt="Avatar"
                width={30}
                height={30}
                className="rounded-full"
              />
              <div
                className="absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg 
								z-40 group-hover:scale-100 scale-0 
								transition-all duration-300 ease-in-out"
              >
                <p className="text-sm">{user.email}</p>
              </div>
            </div>
          )}
          {user && <Logout />}
        </div>
      </div>
    </nav>
  );
};
export default Topbar;
