export const Hamburger: React.FC<{handleNavOpen: () => void}> = ({handleNavOpen}) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="currentColor"
        className="text-label-2 dark:text-dark-label-2 md:hidden lg:hidden"
        onClick={() => handleNavOpen()}
      >
        <path
          fillRule="evenodd"
          d="M5 6a1 1 0 011-1h12a1 1 0 110 2H6a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H6a1 1 0 01-1-1zm1 5a1 1 0 100 2h12a1 1 0 100-2H6z"
          clipRule="evenodd"
        ></path>
      </svg>
    </>
  );
};
