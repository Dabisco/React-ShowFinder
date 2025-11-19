import NavBar from "@/components/NavBar";
import MobileNavButtons from "@/components/MobileNavButtons";
import HomePageText from "@/components/HomePageText";
import SearchBar from "@/components/SearchBar";
import Card from "@/components/Card";
import Grid from "@/components/Grid";
import Spinner from "@/components/Spinner";
import SearchSuggestions from "@/components/SearchSuggestions";

function ComponentPreview() {
  return (
    <>
      <div style={{ padding: "2rem 0rem" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", color: "green" }}>
          Preview Mode
        </h1>
        {/* <Spinner /> */}
        <SearchBar />
      </div>
    </>
  );
}

export default ComponentPreview;
