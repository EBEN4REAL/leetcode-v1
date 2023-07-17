import { atom } from "recoil";
import {DBProblem} from "@/utils/types/problem"

type ProblemState = {
  problems: DBProblem[];
  paginatedProblems: unknown
};

const initalProblemsState: ProblemState = {
    problems: [],
    paginatedProblems: []
};

export const problemsState = atom<ProblemState>({
  key: "problemsState",
  default: initalProblemsState,
});
