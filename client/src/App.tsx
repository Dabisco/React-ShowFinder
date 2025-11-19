import ComponentPreview from "./sandbox/ComponentPreview";
import NavBar from "@/components/NavBar";
import HomePageText from "@/components/HomePageText";
import SearchBar from "@/components/SearchBar";
import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import ResultsPage from "@/pages/ResultsPage";
import Grid from "@/components/Grid";
import ShowPage from "@/pages/ShowPage";
import Favourites from "@/pages/Favourites";
import About from "@/pages/About";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results/:showQuery" element={<ResultsPage />} />
        <Route path="/shows/:showId" element={<ShowPage />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/about" element={<About />} />
      </Routes>

      {/* <ComponentPreview /> */}
    </>
  );
}

export default App;
