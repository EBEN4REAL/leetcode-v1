export const closeDropDowns = () => {
  const dropdowns: Element[] = Array.from(
    document.querySelectorAll("._dropdown")
  );

  document.addEventListener("mousedown", (e) => {
    const dropdownContents = Array.from(
      document.querySelectorAll<HTMLElement>(".dropdown_content")
    );

    dropdownContents.forEach((ddContent, index) => {
    //   const element = e.target as HTMLElement;
    //   const parentElement = ddContent as HTMLElement;
    //   const distanceFromLeftEdge = element.offsetLeft;
    //   const distanceFromTopEdge = element.offsetTop;
     
    //   if(ddContent.contains(e.target as HTMLElement)) {
    //     console.log("parentElement", parentElement)
    //   }

    //   console.log("distanceFromTopEdge", distanceFromTopEdge)
    //   console.log("distanceFromTopEdge", distanceFromTopEdge)
    //   const distanceFromBottomEdge = parentElement.offsetHeight - (element.offsetTop + element.offsetHeight);
    //   const distanceFromRightEdge = parentElement.offsetWidth - (element.offsetLeft + element.offsetWidth);

    //   if(ddContent.contains(e.target as HTMLElement) && (distanceFromLeftEdge > 12 || distanceFromTopEdge > 12 || distanceFromBottomEdge > 12 || distanceFromRightEdge > 12)) {
    //     ddContent.classList.remove("show");
    //     ddContent.parentNode?.children[0].children[1]?.classList.remove(
    //       "rotate-180"
    //     );
    //     return
    //   }
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


