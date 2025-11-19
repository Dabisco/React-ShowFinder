import { useState, useEffect } from "react";
import type { Show } from "@/services/types";
import { getShow } from "@/services/shows";
import Header from "@/components/Header";
import Grid from "@/components/Grid";
import { useNavigate } from "react-router-dom";
import Spinner from "@/components/Spinner";

const Favourites = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [favourites, setFavourites] = useState<number[]>(() => {
    return JSON.parse(localStorage.getItem("favourites") || "[]");
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchFavouriteShows = async () => {
      setLoading(true);
      const results = await Promise.allSettled(
        favourites.map((favID) => {
          return getShow(String(favID));
        })
      );

      const validShows = results
        .filter((result) => result.status === "fulfilled")
        .map((r) => r.value);
      setShows(validShows);
      setLoading(false);
    };

    fetchFavouriteShows();
  }, []);

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
          <div className="container mx-auto px-[1rem] sm:px-[2rem] mt-[1rem] ">
            <h1 className="text-white text-[1.5rem] font-[700] mb-[1rem]">
              My Favourites
            </h1>
            <Grid shows={shows} onCardClick={handleCardClick} className="" />
          </div>
        </>
      )}
    </>
  );
};

export default Favourites;
