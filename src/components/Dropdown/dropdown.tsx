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
          className="_dropdown  flex py-1 gap-4 flex-1 justify-between items-center px-3 cursor-pointer  bg-secondary-gray rounded-[5px] relative"
          id="dropdownDefaultButton"
        >
          <div className="text-light-gray text-sm label">{header}</div>
          <div className="transition-all ease-in-out duration-300">
            <RxCaretDown className="text-light-gray text-2xl caret" />
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Dropdown;
