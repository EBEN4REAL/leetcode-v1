export const getDropDownDirection = (
  triggerElement: Element,
  dropdownElement: HTMLElement
) => {
  const triggerRect = triggerElement.getBoundingClientRect();
  const dropdownHeight = dropdownElement.clientHeight;
  const spaceBelow = window.innerHeight - triggerRect.bottom; 
  const spaceAbove = triggerRect.top; 

  let direction = "down";
  
  if (spaceBelow < dropdownHeight && spaceAbove >= dropdownHeight) {
    direction = "up";
  }

  return direction;
};
