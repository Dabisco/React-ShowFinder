import { LogoIcon } from "@/assets";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <>
      <Link to="/">
        <div className="inline-flex  items-center ">
          <LogoIcon
            className="h-[2rem] w-[2rem] mr-[0.3rem] text-red-600 text-[3rem]"
            style={{ fill: "currentColor", display: "inline-block" }}
          />
          <span className="inline-block text-[1.2rem] text-white font-[600]">
            ShowFinder
          </span>
        </div>
      </Link>
    </>
  );
}

export default Logo;
