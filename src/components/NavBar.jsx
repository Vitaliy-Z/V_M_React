import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const { pathname } = useLocation();

  return (
    <nav className="nav nav-tabs mx-5 my-2">
      <Link to="/" className={"nav-link" + (pathname === "/" ? " active" : "")}>
        Main
      </Link>

      <Link
        to="/login"
        className={"nav-link" + (pathname === "/login" ? " active" : "")}
      >
        Login
      </Link>

      <Link
        to="/users"
        className={"nav-link" + (pathname === "/users" ? " active" : "")}
      >
        Users
      </Link>
    </nav>
  );
}

export default NavBar;
