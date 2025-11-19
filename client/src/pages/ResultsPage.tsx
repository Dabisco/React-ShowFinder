import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSearchResults } from "@/services/shows";
import type { ShowSearchResults } from "@/services/types";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import Grid from "@/components/Grid";
import type { Show } from "@/services/types";

function ResultsPage() {
  const [loading, setLoading] = useState<boolean | null>(null);
  const [searchResults, setSearchResults] = useState<ShowSearchResults[]>([]);
  const [shows, setShows] = useState<Show[]>([]);
  const { showQuery } = useParams();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  console.log("Query: ", showQuery);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);

      try {
        const response = await getSearchResults(showQuery as string);
        setSearchResults(response);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, []);

  useEffect(() => {
    setShows(searchResults.map((result) => result.show));
  }, [searchResults]);

  console.log("shows: ", shows);

  function handleCardClick(showID: number) {
    navigate(`/shows/${showID}`);
  }
  return (
    <>
      <Header />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="container mx-auto px-[1rem] sm:px-[2rem] my-[1rem]">
            <h1 className="text-white text-[1.5rem] font-[700] mb-[1rem]">{`Search Results for "${showQuery}"`}</h1>
            <Grid shows={shows} onCardClick={handleCardClick} className="" />
          </div>
        </>
      )}
    </>
  );
}

export default ResultsPage;
