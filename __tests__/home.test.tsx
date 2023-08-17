import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "@/pages/index";
import { Swiper } from "swiper/react";
import {
  useAuthState,
  useSignOut,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { JSX } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import * as RecoilModule from "recoil";

const useRecoilValueMock = jest.fn();

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("recoil");

jest.mock("react-firebase-hooks/auth");
const mockUseAuthState = useAuthState as jest.Mock;
const mockUseSignOut = useSignOut as jest.Mock;
const mockUseUpdateProfile = useUpdateProfile as jest.Mock;
const signOut = jest.fn();

beforeEach(() => {
  (useRouter as jest.Mock).mockReset();
});

describe("CompanyTags component", () => {
  it("handles pagination correctly", () => {
    const updateProfile = jest.fn();
    const mockUser = true
      ? { displayName: "John Doe", email: "jdoe@email.com" }
      : null;
    mockUseAuthState.mockReturnValue([mockUser]);
    mockUseSignOut.mockReturnValue([signOut, false, ""]);
    mockUseUpdateProfile.mockReturnValue([updateProfile, false, ""]);

    const useRecoilValueMock = jest.spyOn(RecoilModule, "useRecoilValue");
    useRecoilValueMock.mockReturnValue({
      isOpen: false,
      type: "login",
    });

    const problemsToRender = [
        {
            "id": "two-sum",
            "order": 1,
            "dislikes": 0,
            "likes": 1,
            "link": "",
            "title": "Two Sum",
            "category": "Array",
            "videoId": "8-k1C6ehKuw",
            "difficulty": "Easy"
        },
        {
            "id": "reverse-linked-list",
            "difficulty": "Hard",
            "link": "",
            "category": "Linked List",
            "dislikes": 0,
            "title": "Reverse Linked List",
            "videoId": "",
            "order": 2,
            "likes": 0
        },
        {
            "id": "jump-game",
            "difficulty": "Medium",
            "title": "Jump Game",
            "category": "Dynamic Programming",
            "link": "",
            "order": 3,
            "videoId": "",
            "likes": 0,
            "dislikes": 0
        },
        {
            "id": "valid-parentheses",
            "difficulty": "Easy",
            "order": 4,
            "videoId": "xty7fr-k0TU",
            "link": "",
            "dislikes": 0,
            "title": "Valid Parentheses",
            "category": "Stack",
            "likes": 1
        },
        {
            "id": "search-a-2d-matrix",
            "difficulty": "Medium",
            "title": "Search a 2D Matrix",
            "category": "Binary Search",
            "likes": 0,
            "videoId": "ZfFl4torNg4",
            "order": 5,
            "dislikes": 0,
            "link": ""
        },
        {
            "id": "container-with-most-water",
            "dislikes": 0,
            "title": "Container With Most Water",
            "videoId": "",
            "link": "",
            "likes": 0,
            "category": "Two Pointers",
            "order": 6,
            "difficulty": "Medium"
        },
        {
            "id": "merge-intervals",
            "title": "Merge Intervals",
            "dislikes": 0,
            "order": 7,
            "videoId": "",
            "likes": 0,
            "difficulty": "Medium",
            "link": "",
            "category": "intervals"
        },
        {
            "id": "maximum-depth-of-binary-tree",
            "videoId": "4qYTqOiRMoM",
            "difficulty": "Easy",
            "likes": 0,
            "title": "Maximum Depth of Binary Tree",
            "category": "Tree",
            "order": 8,
            "link": "",
            "dislikes": 0
        },
        {
            "id": "best-time-to-buy-and-sell-stock",
            "likes": 0,
            "difficulty": "Easy",
            "videoId": "",
            "dislikes": 0,
            "category": "Array",
            "link": "",
            "order": 9,
            "title": "Best Time to Buy and Sell Stock"
        },
        {
            "id": "subsets",
            "category": "Backtracking",
            "link": "",
            "likes": 0,
            "title": "Subsets",
            "order": 10,
            "difficulty": "Medium",
            "videoId": "",
            "dislikes": 0
        }
    ]

    // const nextButton = screen.getByLabe

    // expect(screen.getByText("Company C")).toBeInTheDocument();
    // expect(screen.queryByText("Company A")).not.toBeInTheDocument();
    // expect(screen.queryByText("Company B")).not.toBeInTheDocument();

    // const prevButton = screen.getByLabelText("Previous");
    // userEvent.click(prevButton);

    // expect(screen.getByText("Company A")).toBeInTheDocument();
    // expect(screen.queryByText("Company C")).not.toBeInTheDocument();
    // expect(screen.queryByText("Company B")).not.toBeInTheDocument();
  });
});
