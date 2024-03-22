import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { STRING } from "../../assets/String";

const Navbar = () => {
  const handleBars = () => {
    document.querySelector("body").classList.toggle("open-bars");
  };

  return (
    <nav>
      <div className="nav__container">
        <div className="nav__content">
          <ul className="nav__list">
            <li className="active">
              <NavLink to={""}>{STRING.route.home}</NavLink>
            </li>

            <li>
              <Link to="/list">{STRING.route.combo}</Link>
            </li>
            <li>
              <Link to="/list">{STRING.product.costume}</Link>
            </li>
            <li>
              <Link to="/list">{STRING.product.accessory}</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
