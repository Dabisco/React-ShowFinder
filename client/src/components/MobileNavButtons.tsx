import { useState } from "react";
import { Link } from "react-router-dom";

type MobileNavButtonsProps = {
  activeButton: string;
  setActiveButton: React.Dispatch<React.SetStateAction<string>>;
  isVisible: boolean;
};

const MobileNavButtons = ({
  activeButton,
  setActiveButton,
  isVisible,
}: MobileNavButtonsProps) => {
  //   const [activeButton, setActiveButton] = useState("Home");

  return (
    <>
      <div
        id="mobileNavButtons"
        className={`${
          isVisible ? "" : "hidden"
        } px-[0.5rem] mt-[1.8rem] sm:hidden`}
      >
        <ul className="flex flex-col gap-[0.8rem]">
          <Link to="/">
            <li
              className={`${
                activeButton === "Home" ? "bg-red-600" : ""
              } rounded-[0.3rem] pl-[0.8rem] py-[0.28rem] text-gray-300 text-[0.8rem]`}
              onClick={() => {
                setActiveButton("Home");
              }}
            >
              Home
            </li>
          </Link>
          <Link to="/favourites">
            <li
              className={`${
                activeButton === "Favourites" ? "bg-red-600" : ""
              } rounded-[0.3rem] pl-[0.8rem] py-[0.28rem] text-gray-300 text-[0.8rem]`}
              onClick={() => {
                setActiveButton("Favourites");
              }}
            >
              Favourites
            </li>
          </Link>
          <Link to="/about">
            <li
              className={`${
                activeButton === "About" ? "bg-red-600" : ""
              } rounded-[0.3rem] pl-[0.8rem] py-[0.28rem] text-gray-300 text-[0.8rem]`}
              onClick={() => {
                setActiveButton("About");
              }}
            >
              About
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default MobileNavButtons;
