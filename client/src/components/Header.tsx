import NavBar from "@/components/NavBar";

function Header() {
  return (
    <>
      <header className="sticky z-[4] bg-gray-900 top-0 px-[0.6rem] py-[1rem] sm:px-[2.5rem] sm:py-[1.8rem] shadow-md">
        <NavBar />
      </header>
    </>
  );
}

export default Header;
