import { getDropDownDirection } from "@/utils/getDropDownDirection";

export const handleDropdownToggle = () => {
  const dropdowns = Array.from(document.querySelectorAll("._dropdown"));
  const dropdownContents = Array.from(
    document.querySelectorAll<HTMLElement>(".dropdown_content")
  );

  dropdowns.forEach((dropdown, index) => {
    dropdown.addEventListener("click", (e) => {
      e.stopPropagation();
      const dropdownContent = dropdownContents[index];
      dropdownContent.parentNode?.children[0].children[1]?.classList.toggle(
        "rotate-180"
      );
      dropdownContent.classList.remove("dropdown-up");
      dropdownContent.classList.toggle("show");
      ``;
      const dropdownDirection = getDropDownDirection(dropdown, dropdownContent);
      const dropdownUpwards =
        dropdownContent.classList.contains("show") &&
        dropdownDirection === "up";

      const dropdownContentHeight = dropdownContent.clientHeight;
      const dropdownHeight = dropdown.clientHeight;
      if (dropdownUpwards) {
        dropdownContent.style.setProperty(
          "top",
          `${-(dropdownContentHeight + dropdownHeight - 27)}px`
        );
      } else {
        dropdownContent.style.setProperty("top", `${2.2}rem`);
      }
    });
  });
};

export const closeDropDowns = () => {
  const dropdowns: Element[] = Array.from(
    document.querySelectorAll("._dropdown")
  );

  document.addEventListener("mousedown", (e) => {
    const dropdownContents = Array.from(
      document.querySelectorAll<HTMLElement>(".dropdown_content")
    );

    dropdownContents.forEach((ddContent, index) => {
      if (
        !ddContent.contains(e.target as HTMLElement) &&
        !dropdowns[index]?.contains(e.target as HTMLElement)
      ) {
        ddContent.classList.remove("show");
        ddContent.parentNode?.children[0].children[1]?.classList.remove(
          "rotate-180"
        );
      }
    });
  });
};
