import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getShow } from "@/services/shows";
import type { Show } from "@/services/types";
import Spinner from "@/components/Spinner";
import Header from "@/components/Header";
import ShowRating from "@/components/ShowRating";
import Genres from "@/components/Genres";
import { IoHeart } from "react-icons/io5";
import type { Episode } from "@/services/types";
import { getShowEpisodes } from "@/services/shows";
import type { CastMember } from "@/services/types";
import { getShowCast } from "@/services/shows";

const ShowPage = () => {
  const { showId } = useParams();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState<Show | null>(null);
  const [error, setError] = useState<string>("");
  let trimmedShowName: string | undefined = trimShowName();
  const favBtn = useRef<HTMLDivElement>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [activeBtn, setActiveBtn] = useState("overview");
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [cast, setCast] = useState<CastMember[]>([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favourites") || "[]");
    console.log("favs:", favs);
    if (show) {
      if (favs.includes(show.id)) {
        setIsFavorited(true);
      }
    }
  }, [show]);

  useEffect(() => {
    const updateLocalStorage = () => {
      if (!show) return;

      const id = show.id;
      const stored = JSON.parse(
        localStorage.getItem("favourites") || "[]"
      ) as number[];

      let updatedFavourites: number[];

      if (isFavorited) {
        updatedFavourites = stored.includes(show.id)
          ? stored
          : [...stored, show.id];
      } else {
        updatedFavourites = stored.filter((favID) => favID !== show.id);
      }

      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    };

    updateLocalStorage();
    console.log("localStorage: ", localStorage.getItem("favourites"));
  }, [isFavorited, show]);

  function handleFavBtnClick() {
    setIsFavorited((prev) => !prev);
  }

  useEffect(() => {
    const fetchShow = async (): Promise<undefined> => {
      try {
        const showData = await getShow(showId);
        console.log(showData);
        setShow(showData);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          setLoading(false);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchShow();
  }, []);

  useEffect(() => {
    const fetchShowEpisodes = async () => {
      console.log(show?.id);
      try {
        const response = await getShowEpisodes(String(show?.id));
        setEpisodes(response);
        console.log(episodes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchShowEpisodes();
  }, [show]);

  useEffect(() => {
    const fetchShowCast = async () => {
      console.log(show?.id);
      try {
        const response = await getShowCast(String(show?.id));
        setCast(response);
      } catch {
        console.log(error);
      }
    };
    fetchShowCast();
  }, [show]);

  function trimShowName() {
    let trimmedShowName: string | undefined;
    if ((show?.name?.length ?? 0) > 20) {
      trimmedShowName = show?.name.slice(0, 20) + "...";
    } else {
      trimmedShowName = show?.name;
    }
    return trimmedShowName;
  }

  function stripHTML(html: string | null | undefined) {
    if (html === null) return "";
    const temp = document.createElement("div");
    if (html !== undefined) {
      temp.innerHTML = html;
    }
    const tempText = temp.textContent || temp.innerText;
    return tempText;
  }
  const strippedSummary = stripHTML(show?.summary);

  function getSeasons(episodesArray: Episode[]): number[] {
    let check: number;
    let newEpisodesArray: Episode[] = episodesArray.slice().reverse();
    let seasonArray: number[] = [];

    newEpisodesArray.forEach((episode, index) => {
      if (index === 0) {
        check = episode.season;
        seasonArray.push(check);
      } else {
        if (check !== episode.season) {
          check = episode.season;
          seasonArray.push(check);
        }
      }
    });
    return seasonArray;
  }

  const showSeasonArray = getSeasons(episodes);

  return (
    <>
      <Header />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="container mx-auto px-[1rem] sm:px-[2rem]">
            <div
              className="relative mt-[2rem]  h-[12rem] sm:h-[18rem] bg-cover bg-[position:50%_50%] w-full rounded-[0.7rem] overflow-hidden"
              // style={{ backgroundImage: `url(${show?.image?.original})` }}
            >
              <div
                id="background-image"
                className="absolute z-[-1] overflow-hidden w-full h-full"
              >
                <img
                  src={`${show?.image?.original}`}
                  className="w-full h-full  object-cover object-[50%_30%] sm:object-[10%_48%]"
                />
              </div>

              <div className="absolute flex gap-[1rem] sm:gap-[2rem] border-red-400  z-[3] w-full h-full">
                <div
                  id="thumbnail-image"
                  className=" mt-[5rem] sm:mt-[6rem] ml-[0.7rem] sm:ml-[1.5rem] border-4 border-gray-800 w-[6rem] sm:w-[10rem] h-[8rem] sm:h-[13rem] overflow-hidden"
                >
                  <img
                    src={`${show?.image?.medium}`}
                    className="h-full w-full"
                  />
                </div>

                <div
                  id="show-details"
                  className="sm:mt-[6rem] pt-[5rem] sm:pt-[4.5rem]"
                >
                  <span
                    id="show-name"
                    className="inline-block text-white text-[2rem] sm:text-[2.5rem] font-[700] sm:mb-[0.1rem] leading-[1.3]"
                  >
                    {trimmedShowName}
                  </span>
                  <div
                    id="show-rating"
                    className="flex gap-[1rem] pt-[0.2rem] "
                  >
                    <span className="text-gray-300 text-[0.8rem] sm:pt-[0.1rem] ">
                      {show?.premiered?.slice(0, 4)}
                    </span>
                    <ShowRating rating={show?.rating} className="" />
                  </div>
                </div>
              </div>

              <div
                id="overlay"
                className="absolute z-[1] inset-0 bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.9)] pointer-events-none"
              ></div>
            </div>
          </div>

          <div className="flex justify-between items-center container mx-auto mt-[3rem] sm:mt-[5rem] px-[1rem] sm:px-[2rem]">
            <div className="w-[7rem] sm:w-[15rem]">
              <Genres
                genres={show?.genres}
                className="gap-[0.25rem] sm:gap-[1rem]"
              />
            </div>
            <div
              onClick={handleFavBtnClick}
              className={`${
                isFavorited
                  ? "flex items-center bg-red-700 py-[0.5rem] px-[1rem] rounded-[2rem]"
                  : "flex flex-col sm:flex-row sm:items-center bg-gray-700 hover:bg-gray-600 px-[1rem] py-[0.5rem] rounded-[3rem]"
              }  text-white text-[0.8rem] sm:text-[0.9rem] gap-[0.3rem] font-[700] cursor-pointer`}
              ref={favBtn}
            >
              {isFavorited ? "Favourited" : "Add to favourites"}
              <IoHeart
                className={`${
                  isFavorited
                    ? "w-[1.5rem] h-[1.1rem] sm:h-[1.1rem]"
                    : "mx-auto w-[1.5rem] sm:w-[1.5rem] h-[1.1rem] sm:h-[1.1rem]"
                } `}
              />
            </div>
          </div>

          <div className="container mx-auto px-[1rem] sm:px-[2rem] mt-[5rem]">
            <div className="flex gap-[3.5rem] border-b border-b-gray-700">
              <span
                onClick={() => {
                  setActiveBtn("overview");
                }}
                className={`${
                  activeBtn === "overview"
                    ? "border-b-2 border-b-red-500 text-red-500"
                    : "hover:text-gray-200 hover:border-b hover:border-b-gray-200"
                } text-gray-400 text-[0.8rem] pb-[0.7rem] cursor-pointer `}
              >
                Overview
              </span>
              <span
                className={`${
                  activeBtn === "episodes"
                    ? "border-b-2 border-b-red-500 text-red-500"
                    : "hover:text-gray-200 hover:border-b hover:border-b-gray-200"
                } text-gray-400  text-[0.8rem] pb-[0.7rem] cursor-pointer`}
                onClick={() => {
                  setActiveBtn("episodes");
                }}
              >
                Episodes
              </span>
              <span
                className={`${
                  activeBtn === "cast"
                    ? "border-b-2 border-b-red-500 text-red-500"
                    : "hover:text-gray-200 hover:border-b hover:border-b-gray-200"
                } text-gray-400 text-[0.8rem] pb-[0.7rem] cursor-pointer `}
                onClick={() => {
                  setActiveBtn("cast");
                }}
              >
                Cast
              </span>
            </div>
          </div>
          {activeBtn === "overview" && (
            <section
              id="overview"
              className="container mx-auto px-[1rem] sm:px-[2rem] mt-[2.5rem]"
            >
              <div className="">
                <h1 className="font-[700] text-[1.1rem] text-white mb-[0.5rem]">
                  Summary
                </h1>
                <div
                  id="summary"
                  className="text-gray-300 text-[0.85rem] mb-[1rem]"
                >
                  {strippedSummary}
                </div>
                <h2 className="text-white text-[1.2rem] font-[700] mb-[0.5rem]">
                  Show Info
                </h2>
                <h3 className=" text-gray-300 text-[0.9rem] font-[700]">
                  Network:{" "}
                  <span className="text-gray-300 text-[0.9rem] font-[500]">
                    {show?.network?.name}
                  </span>
                </h3>

                <h3 className=" text-gray-300 text-[0.9rem] font-[700]">
                  Schedule:{" "}
                  <span className="text-gray-300 text-[0.9rem] font-[500]">
                    {show?.schedule.days + " at " + show?.schedule.time}
                  </span>
                </h3>

                <h3 className=" text-gray-300 text-[0.9rem] font-[700]">
                  Status:{" "}
                  <span className="text-gray-300 text-[0.9rem] font-[500]">
                    {show?.status}
                  </span>
                </h3>
              </div>
            </section>
          )}
          {activeBtn === "episodes" && (
            <section
              id="episodes"
              className="container mx-auto px-[1rem] sm:px-[2rem] mt-[2.5rem]"
            >
              <div className="">
                {showSeasonArray.map((season, index) => {
                  return (
                    <div className="">
                      <h2
                        className="text-white text-[1.3rem] font-[700] mb-[0.8rem]"
                        key={index}
                      >
                        {`Season ${season}`}
                      </h2>
                      {episodes.map((episode, index) => {
                        if (episode.season === season) {
                          return (
                            <div
                              id="episode-container"
                              className="flex gap-[0.9rem] px-[1rem] py-[1rem] bg-gray-800 rounded-[0.5rem] mb-[1rem]"
                              key={index}
                            >
                              <div className="w-[7rem] h-[4rem] rounded-[0.4rem] overflow-hidden flex-shrink-0">
                                <img
                                  className="w-full h-full"
                                  src={`${episode.image?.medium}`}
                                />
                              </div>
                              <div>
                                <span className="block text-white font-[700]">{`${episode.number}. Episode ${episode.number}`}</span>
                                <span className="block text-gray-400 text-[0.8rem] mb-[0.8rem]">
                                  {episode.airdate}
                                </span>
                                <div className="text-gray-300 text-[0.8rem]">
                                  {stripHTML(episode.summary)}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {activeBtn === "cast" && (
            <section
              id="cast"
              className="container mx-auto px-[1rem] sm:px-[2rem] mt-[2.5rem]"
            >
              <div className="pb-[2rem] grid grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] sm:grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] gap-[1rem]">
                {cast.map((castMember, index) => {
                  return (
                    <div
                      id="cast-member"
                      className="flex flex-col gap-[0.7rem]"
                    >
                      <div
                        id="image"
                        className="overflow-hidden rounded-[0.3rem]"
                      >
                        <img
                          src={`${castMember.person.image?.medium}`}
                          className="w-full h-full"
                        />
                      </div>

                      <div id="cast-member-details" className="">
                        <span className="block text-white text-[0.9rem] mb-[0.1rem] text-center">
                          {castMember.person.name}
                        </span>
                        <span className="block text-gray-400 text-[0.75rem] text-center">
                          {castMember.character.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default ShowPage;
