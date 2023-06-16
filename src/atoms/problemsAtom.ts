import { atom } from "recoil";
import {DBProblem} from "@/utils/types/problem"

type ProblemsState = {
  problems: DBProblem[];
  paginatedProblems: unknown
};

const initalProblemsState: ProblemsState = {
    problems: [],
    paginatedProblems: []
};

export const problemsState = atom<ProblemsState>({
  key: "problemsState",
  default: initalProblemsState,
});
