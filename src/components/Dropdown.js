import React, { useState } from 'react';

// TODO: pass dynamic list...
const MyDropdown = () => {
  const [selectedOption, setSelectedOption] = useState('Select an Option');
  const [selectedIcon, setSelectedIcon] = useState('fas fa-home');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOptionClick = (optionText, iconClass) => {
    setSelectedOption(optionText);
    setSelectedIcon(iconClass);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={`dropdown ${isDropdownOpen ? 'show' : ''}`}>
      <div className="form-select" onClick={toggleDropdown}>
        <i className={selectedIcon}></i> {selectedOption}
      </div>
      <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
        <div
          className="dropdown-item"
          onClick={() => handleOptionClick('Home', 'fas fa-home')}
        >
          <i className="fas fa-home"></i> Home
        </div>
        <div
          className="dropdown-item"
          onClick={() => handleOptionClick('Profile', 'fas fa-user')}
        >
          <i className="fas fa-user"></i> Profile
        </div>
        <div
          className="dropdown-item"
          onClick={() => handleOptionClick('Settings', 'fas fa-cog')}
        >
          <i className="fas fa-cog"></i> Settings
        </div>
      </div>
    </div>
  );
};

export default MyDropdown;
