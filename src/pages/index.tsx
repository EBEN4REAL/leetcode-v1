import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";
import Topbar from "@/components/Topbar/Topbar";
import useHasMounted from "@/hooks/useHasMounted";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

import { useState } from "react";
import { firestore } from "@/firebase/firebase";
import { clipText } from "@/utils/clipText";

export default function Home() {
  const [loadingProblems, setLoadingProblems] = useState(false);
  const hasMounted = useHasMounted();
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
      count: 1381
    },
    {
      name: "String", 
      count: 615
    },
    {
      name: "Hash table", 
      count: 475
    },
    {
      name: "Dynamic Programming", 
      count: 431
    },
    {
      name: "Math", 
      count: 430
    },
    {
      name: "Sorting", 
      count: 318
    },
    {
      name: "Greedy", 
      count: 309
    },
    {
      name: "Depth-First Search ", 
      count: 274
    },
    {
      name: "Database", 
      count: 226
    }
  ])

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

  if (!hasMounted) return null;

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

  return (
    <>
      <main className="bg-dark-layer-2 min-h-screen ">
        <Topbar />
        <div className="max-w-[1150px] mx-auto mt-[67px]">
          <div className="flex">
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

                <div className="grid grid-cols-3 gap-5 mt-5">
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
                          <p className="text-white font-bold text-sm	pb-3 ">
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

                <div>
                  
                </div>

                <table className="text-sm text-left text-gray-500 dark:text-gray-400  w-full max-w-[1200px] mx-auto mt-10">
                  {!loadingProblems && (
                    <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b border-light-border ">
                      <tr>
                        <th scope="col" className="px-1 py-3 w-0 font-medium">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 w-0 font-medium">
                          Title
                        </th>
                        <th scope="col" className="px-6 py-3 w-0 font-medium">
                          Difficulty
                        </th>

                        <th scope="col" className="px-6 py-3 w-0 font-medium">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3 w-0 font-medium">
                          Solution
                        </th>
                      </tr>
                    </thead>
                  )}
                  <ProblemsTable setLoadingProblems={setLoadingProblems} />
                </table>
              </div>
            </div>
            <div className="w-3/12">Rbrn</div>
          </div>
        </div>
      </main>
    </>
  );
}
