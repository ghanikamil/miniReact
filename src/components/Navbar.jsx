import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Profile">Cart</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
