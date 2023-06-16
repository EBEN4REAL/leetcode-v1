import { DBProblem } from "@/utils/types/problem";
import { useState, useEffect } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, firestore } from "@/firebase/firebase";
import {useSetRecoilState} from "recoil"
import {problemsState} from "@/atoms/problemsAtom"

function useGetProblems(
  setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>
) {
  const [problems, setProblems] = useState<DBProblem[]>([]);
  const setProblemsState = useSetRecoilState(problemsState);

  useEffect(() => {
    const getProblems = async () => {
      setLoadingProblems(true);
      const q = query(
        collection(firestore, "problems"),
        orderBy("order", "asc")
      );
      const querySnapshot = await getDocs(q);
      const _problems: DBProblem[] = [];
      querySnapshot.forEach((doc) => {
        _problems.push({ id: doc.id, ...doc.data() } as DBProblem);
      });
      
      setProblemsState((prev) => ({...prev, problems: _problems }));
      setProblems(_problems);
      setLoadingProblems(false);
    };

    getProblems();
  }, [setLoadingProblems, setProblemsState]);
  
  return problems;
}

export default useGetProblems;
