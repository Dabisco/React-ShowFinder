import { Link } from "react-router-dom";

interface NavButtonsProp {
  activeButton: string;
  setActiveButton: (button: string) => void;
}

import { useState } from "react";

const NavButtons = ({ activeButton, setActiveButton }: NavButtonsProp) => {
  return (
    <div className="absolute left-[12rem]">
      <ul className="hidden sm:flex gap-[1.5rem]">
        <Link to="/">
          <li
            className={` ${
              activeButton === "Home" ? "bg-red-600" : " hover:bg-gray-700"
            } text-gray-300 sm:text-[0.9rem] rounded-[0.3rem] py-[0.3rem] px-[0.5rem] transition-none cursor-pointer`}
            onClick={() => {
              setActiveButton("Home");
            }}
          >
            Home
          </li>
        </Link>
        <Link to="/favourites">
          <li
            className={` ${
              activeButton === "Favourites"
                ? "bg-red-600"
                : " hover:bg-gray-700"
            } text-gray-300 sm:text-[0.9rem] rounded-[0.3rem] py-[0.3rem] px-[0.5rem] transition-none cursor-pointer`}
            onClick={() => {
              setActiveButton("Favourites");
            }}
          >
            Favourites
          </li>
        </Link>
        <Link to="/about">
          <li
            className={` ${
              activeButton === "About" ? "bg-red-600" : " hover:bg-gray-700"
            } text-gray-300 sm:text-[0.9rem]  rounded-[0.3rem] py-[0.3rem] px-[0.5rem] transition-none duration-100 cursor-pointer`}
            onClick={() => {
              setActiveButton("About");
            }}
          >
            About
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default NavButtons;
