import { useState } from "react";
import Logo from "@/components/Logo";
import Hamburger from "@/components/HamburgerBtn";
import ThemeIcon from "@/components/ThemeIcon";
import MobileNavButtons from "@/components/MobileNavButtons";
import NavButtons from "@/components/NavButtons";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [activeButton, setActiveButton] = useState("Home");
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <nav className="relative">
        <div id="navFlexGroup" className=" flex justify-between items-center">
          <Logo />
          <NavButtons
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />

          <div
            id="hamburger+themeIcon"
            className="flex items-center gap-[0.8rem]"
          >
            <ThemeIcon />
            <Hamburger setIsVisible={setIsVisible} />
          </div>
        </div>
        <MobileNavButtons
          activeButton={activeButton}
          setActiveButton={setActiveButton}
          isVisible={isVisible}
        />
      </nav>
    </>
  );
};

export default NavBar;
