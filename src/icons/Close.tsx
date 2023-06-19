export const Close:React.FC<{handleNavOpen: () => void}> = ({handleNavOpen}) => {
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
          d="M13.414 12L19 17.586A1 1 0 0117.586 19L12 13.414 6.414 19A1 1 0 015 17.586L10.586 12 5 6.414A1 1 0 116.414 5L12 10.586 17.586 5A1 1 0 1119 6.414L13.414 12z"
          clipRule="evenodd"
        ></path>
      </svg>
    </>
  );
};
