import { RxCaretDown } from "react-icons/rx";
import { useEffect } from "react";

interface DropdownProps {
  header: string;
  children: JSX.Element;
  activeTopic?: string
}

const Dropdown: React.FC<DropdownProps> = ({ header, children, activeTopic }) => {
//   const handleDropdownClicks = () => {
//     const dropdowns = Array.from(document.querySelectorAll(".dropdown"));
//     const dropdownContents = Array.from(
//       document.querySelectorAll<HTMLElement>(".dropdown-content")
//     );

//     dropdowns.forEach((dropdown, index) => {
//       dropdown.addEventListener("click", (e) => {
//         e.stopPropagation();
//         const dropdownContent = dropdownContents[index];
//         dropdownContent.parentNode?.children[0].children[1]?.classList.toggle(
//           "rotate-180"
//         );
//         dropdownContent.classList.toggle("show");
//       });
//     });
//   };

//   const closeDropDowns = () => {
//     const dropdowns: Element[] = Array.from(
//       document.querySelectorAll(".dropdown")
//     );

//     document.addEventListener("mousedown", (e) => {
//       const dropdownContents = Array.from(
//         document.querySelectorAll<HTMLElement>(".dropdown-content")
//       );

//       dropdownContents.forEach((ddContent, index) => {
//         if (
//           !ddContent.contains(e.target as HTMLElement) &&
//           !dropdowns[index]?.contains(e.target as HTMLElement)
//         ) {
//           ddContent.classList.remove("show");
//           ddContent.parentNode?.children[0].children[1]?.classList.remove(
//             "rotate-180"
//           );
//         }
//       });
//     });
//   };

//   useEffect(() => {
//     handleDropdownClicks();
//   });

//   useEffect(() => {
//     handleDropdownClicks();
//   }, [activeTopic]);

//   useEffect(() => {
//     setTimeout(() => {
//       closeDropDowns();
//     }, 1000);
//   });
  return (
    <>
      <div className="relative">
        <div
          className="dropdown  flex py-1 gap-4 flex-1 justify-between items-center px-3 cursor-pointer  bg-secondary-gray rounded-[5px] relative"
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
