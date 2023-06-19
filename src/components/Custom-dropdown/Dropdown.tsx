import React, { useState } from 'react';

interface DropdownProps {
  toggleElement: React.ReactNode;
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ toggleElement, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown">
      <div className="dropdown-toggle" onClick={handleToggle}>
        {toggleElement}
      </div>
      {isOpen && (
        <div className="dropdown-content">
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
