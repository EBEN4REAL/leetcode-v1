import { RxCaretDown } from "react-icons/rx";
import { useEffect } from "react";

interface DropdownProps {
  header: string;
  children: JSX.Element;
  activeTopic?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ header, children }) => {
  return (
    <>
      <div className="relative">
        <div
          className="_dropdown  flex py-1 gap-4 flex-1 justify-between items-center px-3 cursor-pointer  dark:bg-secondary-gray bg-gray-100 rounded-[5px] relative"
          id="dropdownDefaultButton"
        >
          <div className="dark:text-light-gray text-dark text-sm label">{header}</div>
          <div className="transition-all ease-in-out duration-300">
            <RxCaretDown className="dark:text-light-gray text-dark text-2xl caret" />
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Dropdown;
