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


