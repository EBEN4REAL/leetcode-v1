import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";
import Topbar from "@/components/Topbar/Topbar";
import useHasMounted from "@/hooks/useHasMounted";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";


import { useState } from "react";
import { firestore } from "@/firebase/firebase";

export default function Home() {
  const [loadingProblems, setLoadingProblems] = useState(false);
  const hasMounted = useHasMounted();

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
      console.log("inputs", newInputs);
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
      <main className="bg-dark-layer-2 min-h-screen">
        <Topbar />
        <h1
          className="text-2xl text-center text-gray-700 dark:text-gray-400 font-medium
					uppercase mt-10 mb-5"
        >
          &ldquo; QUALITY OVER QUANTITY &rdquo; 👇
        </h1>
        <div className="relative overflow-x-auto mx-auto px-6 pb-10">
          {loadingProblems && (
            <div className="max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse">
              {[...Array(10)].map((_, idx) => (
                <LoadingSkeleton key={idx} />
              ))}
            </div>
          )}
          <table className="text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto">
            {!loadingProblems && (
              <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b ">
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
      </main>
      {/* <form className="p-6 flex flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={hanldeOnChange}
          placeholder="id"
          name="id"
        />
        <input
          type="text"
          onChange={hanldeOnChange}
          placeholder="title"
          name="title"
        />
        <input
          type="text"
          onChange={hanldeOnChange}
          placeholder="difficulty"
          name="difficulty"
        />
        <input
          type="text"
          onChange={hanldeOnChange}
          placeholder="category"
          name="category"
        />
        <input
          type="text"
          onChange={hanldeOnChange}
          placeholder="order"
          name="order"
        />
        <input
          type="text"
          onChange={hanldeOnChange}
          placeholder="videoId"
          name="videoId"
        />
        <input
          type="text"
          onChange={hanldeOnChange}
          placeholder="link"
          name="link"
        />
        <button type="submit">Send</button>
      </form> */}
    </>
  );
}
