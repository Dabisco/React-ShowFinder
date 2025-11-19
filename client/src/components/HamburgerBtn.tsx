type HamburgerProps = {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const Hamburger = ({ setIsVisible }: HamburgerProps) => {
  function toggleVisibility() {
    setIsVisible((prevState) => {
      return !prevState;
    });
  }
  return (
    <>
      <div
        className={`sm:hidden inline-flex flex-col gap-[0.2rem] p-[0.3rem]`}
        onClick={toggleVisibility}
      >
        <span className="inline-block h-[2.5px] w-[1.6rem] bg-gray-400"></span>
        <span className="inline-block h-[2.5px] w-[1.6rem] bg-gray-400"></span>
        <span className="inline-block h-[2.5px] w-[1.6rem] bg-gray-400"></span>
      </div>
    </>
  );
};

export default Hamburger;
