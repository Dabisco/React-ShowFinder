import { JSX } from "react";

function Spinner(): JSX.Element {
  return (
    <>
      <div
        id="spinner-container"
        className="flex justify-center items-center mt-[4rem]"
      >
        <div
          id="spinner"
          className="border-2 border-red-500 border-t-4 border-b-4 rounded-full w-[6rem] h-[6rem] animate-spin"
        ></div>
      </div>
    </>
  );
}

export default Spinner;
