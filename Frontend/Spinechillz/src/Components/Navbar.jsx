import React, { useState, useCallback } from "react";
import Logout from "./logout";
import "./Navbar.css";

const Navbar = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Handle search input changes
  const handleSearchInputChange = useCallback(
    (event) => {
      const { value } = event.target;
      setSearchTerm(value);
      onSearchChange(value);
    },
    [onSearchChange]
  );

  return (
    <>
      <div className="navbardiv">
        <h1>Spinechillz</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchInputChange}
          placeholder="Search games"
          aria-label="Search games"
        />
        <Logout />
      </div>
    </>
  );
};

export default Navbar;
