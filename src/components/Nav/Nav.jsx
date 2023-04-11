import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { NavLink } from "react-router-dom";
import "./Nav.css";

const Nav = ({ onSearch, logOut }) => {
  return (
    <nav className="nav-container">
      <div className="search-container">
        <SearchBar onSearch={onSearch} />
        {/* <button>+</button> */}
      </div>

      <div className="nav-links">
        <button>
          <NavLink to="/About">About</NavLink>
        </button>

        <button>
          <NavLink className="btn-home" to="/Home">Home</NavLink>
        </button>

        <button>
          <NavLink to="/" onClick={logOut}>
            Log out
          </NavLink>
        </button>
      </div>

      <hr />
    </nav>
  );
};

export default Nav;
