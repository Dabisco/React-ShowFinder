import { useState, useEffect, useRef } from "react";
import NavBar from "@/components/NavBar";
import HomePageText from "@/components/HomePageText";
import SearchBar from "@/components/SearchBar";
import Grid from "@/components/Grid";
import { getPopularShows } from "@/services/shows";
import { Show } from "@/services/types";
import Spinner from "@/components/Spinner";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

function HomePage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [shows, setShows] = useState<Show[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const loadBtnRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShows = async (): Promise<undefined> => {
      try {
        setLoading(true);
        const initialShows = await getPopularShows(String(page));
        console.log("Fetched shows:", initialShows);
        setShows(initialShows);
        setHasMore(initialShows.length > 0);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An error occurred!");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  async function handleLoadMore() {
    try {
      if (loadingMore || !hasMore) return; // check for existing remaining shows
      setLoadingMore(true);
      const nextPage = page + 1;

      const newShows = await getPopularShows(String(nextPage));

      if (newShows.length > 0) {
        // check that shows are not exhausted
        setShows((prevShows) => [...prevShows, ...newShows]);
        setPage((prev) => prev + 1);
        setHasMore(newShows.length > 0);
      } else {
        setHasMore(false); // no more pages!
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Failed to load more shows:", error.message);
      }
    } finally {
      setLoadingMore(false);
    }
  }

  function handleOnCardClick(showId: number): void {
    navigate(`/shows/${showId}`);
  }

  return (
    <>
      <Header />
      <HomePageText />
      <SearchBar />
      <div className="container mx-auto px-4 mt-[4rem] mb-[2rem]">
        <h1 className="text-white text-[1.4rem] font-[700] border-l-[4px] border-red-500 pl-[0.7rem]">
          Popular Shows
        </h1>
      </div>
      {error ? "An error occurred!" : ""}
      {loading ? (
        <Spinner />
      ) : (
        <Grid
          shows={shows}
          onCardClick={handleOnCardClick}
          className="container px-4 mx-auto"
        />
      )}
      {loading ? null : (
        <button
          disabled={loadingMore}
          onClick={handleLoadMore}
          ref={loadBtnRef}
          className="flex items-center gap-[0.7rem] text-white  mx-auto mt-[2rem] mb-[1rem] py-[1rem] px-[2.5rem] rounded-[5rem] bg-red-600 hover:bg-red-700 cursor-pointer font-[700]"
        >
          {loadingMore && (
            <span className="block border-4 border-white border-t-gray-400 rounded-[50%] w-[1.5rem] h-[1.5rem] animate-spin"></span>
          )}
          {loadingMore ? "Loading..." : "Load more"}
        </button>
      )}
      {/* <Grid shows={shows} /> */}
    </>
  );
}

export default HomePage;
