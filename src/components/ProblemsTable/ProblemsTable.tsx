import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { AiFillYoutube } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import YouTube from "react-youtube";
import { SolvedIcon } from "@/icons/solvedIcon";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, firestore } from "@/firebase/firebase";
import { DBProblem } from "@/utils/types/problem";
import { useAuthState } from "react-firebase-hooks/auth";
import { Padlock } from "../../icons/padlock";
import usePagination from "@/hooks/usePagination";
import useGetProblems from "@/hooks/useGetProblems";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { problemsState } from "@/atoms/problemsAtom";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Pagination from "@/components/Pagination";

const ProblemsTable: React.FC<{ handleDropDownClose: () => void }> = ({
  handleDropDownClose,
}) => {
  const [youtubePlayer, setYoutubePlayer] = useState({
    isOpen: false,
    videoId: "",
  });
  const [loadingProblems, setLoadingProblems] = useState<boolean>(false);
  const problems = useGetProblems(setLoadingProblems);
  const solvedProblems = useGetSolvedProblems();
  const problemsObj = useRecoilValue(problemsState);

  const closeModal = () => {
    setYoutubePlayer({ isOpen: false, videoId: "" });
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const problemsToRender = problemsObj.paginatedProblems as DBProblem[];

  const tBody = () =>
    problemsToRender.map((problem, idx) => {
      const difficulyColor =
        problem.difficulty === "Easy"
          ? "text-dark-green-s"
          : problem.difficulty === "Medium"
          ? "text-dark-yellow"
          : "text-dark-pink";

      const isEvenRow = idx % 2 === 1;
      const solved = solvedProblems.includes(problem.id);
      const randomPercentage = (Math.random() * 100 + 1).toFixed(2);
      const hasVideo = !!problem.videoId;

      const handleVideoClick = () => {
        setYoutubePlayer({
          isOpen: true,
          videoId: problem.videoId as string,
        });
      };

      return (
        <tr className={isEvenRow ? "dark:bg-dark-layer-1 bg-white" : "bg-gray-100 dark:bg-dark"} key={problem.id}>
          <td className="px-2 py-4 font-medium whitespace-nowrap text-dark-green-s">
            {solved && <SolvedIcon />}
          </td>
          <td className="px-6 py-4  whitespace-nowrap">
            {problem.link ? (
              <Link
                href={problem.link}
                className="hover:text-blue-600 cursor-pointer whitespace-nowrap truncate"
                target="_blank"
              >
                {problem.title}
              </Link>
            ) : (
              <Link
                className="hover:text-blue-600 dark:text-white text-dark cursor-pointer"
                href={`/problems/${problem.id}`}
              >
                {problem.title} 
              </Link>
            )}
          </td>
          <td className={`px-6 py-4 ${difficulyColor}`}>
            {problem.difficulty}
          </td>
          <td className="px-6 py-4 text-dark dark:text-white">{`${randomPercentage}%`}</td>
          <td className="px-6 py-4">
            {hasVideo ? (
              <AiFillYoutube
                fontSize={"28"}
                className="cursor-pointer text-red-500 hover:text-red-600"
                onClick={handleVideoClick}
              />
            ) : (
              <p className="dark:text-gray-400 text-black">Coming...</p>
            )}
          </td>
          <td>
            <div className={`dark:bg-dark-fill-3  rounded-l-lg rounded-r-lg  bg-fill-3 h-2 relative w-4/5 mx-auto`}>
              <div
                className={`h-5 w-6 absolute -top-2.5  left-1/2 transform -translate-x-1/2 ${isEvenRow ? "dark:bg-dark-layer-1 bg-white" : "bg-gray-100 dark:bg-dark"}  `}
              >
                <Padlock />
              </div>
            </div>
          </td>
        </tr>
      );
    });

  return (
    <>
      <div className="overflow-x-auto ">
        <table className="text-sm text-left mb-4 text-gray-500 dark:text-gray-400  w-full max-w-[1200px] mx-auto mt-5 ">
          {loadingProblems ? (
            <span className="max-w-[1200px] mx-auto w-full animate-pulse">
              {[...Array(10)].map((_, idx) => (
                <LoadingSkeleton key={`skeleton__${idx}`} />
              ))}
            </span>
          ) : (
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
          <tbody className="text-white">{tBody()}</tbody>
          {youtubePlayer.isOpen && (
            <tfoot className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center">
              <div
                className="bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute"
                onClick={closeModal}
              ></div>
              <div className="w-full z-50 h-full px-6 relative max-w-4xl">
                <div className="w-full h-full flex items-center justify-center relative">
                  <div className="w-full relative">
                    <IoClose
                      fontSize={"35"}
                      className="cursor-pointer absolute -top-16 right-0"
                      onClick={closeModal}
                    />
                    <YouTube
                      videoId={youtubePlayer.videoId}
                      loading="lazy"
                      iframeClassName="w-full min-h-[500px]"
                    />
                  </div>
                </div>
              </div>
            </tfoot>
          )}
        </table>
      </div>
      <Pagination
        list={problemsObj.problems}
        handleDropdownClose={handleDropDownClose}
      />
    </>
  );
};
export default ProblemsTable;

function useGetSolvedProblems() {
  const [solvedProblems, setSolvedProblems] = useState<string[]>([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const getSolvedProblems = async () => {
      const userRef = doc(firestore, "users", user!.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        setSolvedProblems(userDoc.data().solvedProblems);
      }
    };

    if (user) getSolvedProblems();
    if (!user) setSolvedProblems([]);
  }, [user]);

  return solvedProblems;
}
