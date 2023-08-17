import { render, screen, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Topbar from "@/components/Topbar/Topbar";
import dotenv from "dotenv";
import { useRouter } from "next/router";
import { MdArrowDropDown } from "react-icons/md";
import { useAuthState, useSignOut, useUpdateProfile } from 'react-firebase-hooks/auth';
import { JSX } from "react";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-firebase-hooks/auth');
const mockUseAuthState = useAuthState as jest.Mock;
const mockUseSignOut = useSignOut as jest.Mock;
const mockUseUpdateProfile = useUpdateProfile as jest.Mock
const signOut = jest.fn()

beforeEach(() => {
  (useRouter as jest.Mock).mockReset();
});

interface NavTab {
  name: string;
  hasDropdown: boolean;
}

interface NavigationTabsProps {
  activeTab: string;
}

const navTabs: NavTab[] = [
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
];

const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab }) => {
  const setActiveTab = jest.fn();

  const handleClick = (name: string) => () => {
    setActiveTab(name);
  };

  const navigationTabs = navTabs.map((nav) => {
    const isActive = nav.name === activeTab;

    return (
      <li
        key={nav.name}
        className={`flex dark:text-light-gray text-dark ${isActive ? "border-b-2 dark:border-white border-dark pb-[9px]" : ""
          }`}
        onClick={handleClick(nav.name)}
      >
        {nav.name} {nav.hasDropdown && <MdArrowDropDown className="mt-1" />}
      </li>
    );
  });

  return <ul>{navigationTabs}</ul>;
};

async function renderAuthenticatedComponents(component: JSX.Element, authenticated = false) {
  const updateProfile = jest.fn()
  const mockUser = authenticated ? { displayName: 'John Doe', email: "jdoe@email.com" } : null;
  mockUseAuthState.mockReturnValue([mockUser]);
  mockUseSignOut.mockReturnValue([signOut, false, ""]);
  mockUseUpdateProfile.mockReturnValue([updateProfile, false, ""])

  await act(async () => {
    render(component);
  });
}

describe("Renders the  top bar succesfully", () => {
  test("renders image correctly", async () => {
    await renderAuthenticatedComponents(<Topbar />)
    const imageElement = screen.getByAltText("leetcode_logo");
    expect(imageElement).toBeInTheDocument();
  });

  test("renders navigation items", async () => {
    const setActiveTab = jest.fn();
    const activeTab = "Problems";
    await renderAuthenticatedComponents(<Topbar />)
    const explore = screen.getByText("Explore");
    const problems = screen.getByText("Problems");
    const contest = screen.getByText("Contest");
    const discuss = screen.getByText("Discuss");
    const interviews = screen.getByText("Interviews");

    expect(explore).toBeInTheDocument();
    expect(problems).toBeInTheDocument();
    expect(contest).toBeInTheDocument();
    expect(discuss).toBeInTheDocument();
    expect(interviews).toBeInTheDocument();

    expect(problems).toHaveClass(
      "border-b-2 dark:border-white border-dark pb-[9px]"
    );

    fireEvent.click(explore);

    setActiveTab("Explore");

    expect(setActiveTab).toHaveBeenCalledWith("Explore");

    expect(explore).toHaveClass(
      "border-b-2 dark:border-white border-dark pb-[9px]"
    );

    expect(problems).not.toHaveClass(
      "border-b-2 dark:border-white border-dark pb-[9px]"
    );

    expect(contest).not.toHaveClass(
      "border-b-2 dark:border-white border-dark pb-[9px]"
    );

    expect(discuss).not.toHaveClass(
      "border-b-2 dark:border-white border-dark pb-[9px]"
    );

    expect(interviews).not.toHaveClass(
      "border-b-2 dark:border-white border-dark pb-[9px]"
    );

    const premiumTab = screen.getByTestId("premium_tab");
    expect(premiumTab).toBeInTheDocument();

    const signInButton = screen.getByTestId("sign-in");
    expect(signInButton).toBeInTheDocument();
  });

  test("renders correctly based on user authentication state", async () => {
    await renderAuthenticatedComponents(<Topbar />, true)
    const desktopNotification = screen.getByTestId('desk-noti');
    expect(desktopNotification).toBeInTheDocument();
    const userDp = screen.getByTestId("user-dp")
    expect(userDp).toBeInTheDocument();
    const userEmail = screen.getByTestId("user_email")
    expect(userEmail).toBeInTheDocument();
    const deskSignout = screen.getByTestId("desk-signout")
    expect(deskSignout).toBeInTheDocument();
    await renderAuthenticatedComponents(<Topbar />, true)
  });

  test("user can logout successfully", async () => {
    await renderAuthenticatedComponents(<Topbar />, true)
    const deskSignout = screen.getByTestId("desk-signout")
    fireEvent.click(deskSignout);
    expect(signOut).toHaveBeenCalled()
  })
});


