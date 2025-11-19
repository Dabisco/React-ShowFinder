import { IoSearchOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import type { ShowSearchResults } from "@/services/types";
import { getSearchResults } from "@/services/shows";
import SearchSuggestions from "@/components/SearchSuggestions";
import type { ShowImage } from "@/services/types";

export type Suggestions = {
  name: string;
  year: string;
  image: ShowImage | null;
  id: number;
};

const SearchBar = () => {
  const [show, setShow] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestions[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const debounceTimeout = useRef<number | null>(null);
  const searchBarContainer = useRef<HTMLDivElement>(null);
  const [isHidden, setIsHidden] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (show.trim() === "") return;
    navigate(`/results/${show}`);
  };

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = window.setTimeout(() => {
      const trimmedShow = show.trim();
      if (!trimmedShow) {
        setSuggestions([]);
        setIsHidden(true);
        return;
      }

      const fetchSuggestions = async () => {
        try {
          const results = await getSearchResults(trimmedShow);
          let trimmedResults = results.slice(0, 5);
          setSuggestions(
            trimmedResults.map((result) => {
              return {
                name: result.show.name,
                year: result.show.premiered,
                image: result.show.image,
                id: result.show.id,
              };
            })
          );
          if (suggestions) {
            setIsHidden(false);
          }

          console.log("Suggestions set!");
        } catch (error) {
          console.error("Search Failed:", error);
          setSuggestions([]);
          setIsHidden(true);
        }
      };

      fetchSuggestions();
    }, 300);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [show]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarContainer.current &&
        !searchBarContainer.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
        setIsHidden(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleSuggestionClick() {
    setSuggestions([]);
    setShow("");
    // setIsHidden((prev) => !prev);
  }

  return (
    <>
      <div className="mt-[2rem]" ref={searchBarContainer}>
        <form
          method="POST"
          onSubmit={handleSubmit}
          className="relative mx-auto w-[21rem] sm:w-[27rem] md:w-[40rem] focus:outline-red-400"
        >
          <input
            className="text-white bg-gray-800 w-[100%] py-[0.9rem] pl-[1rem] rounded-[1.5rem] focus:border-2 focus:border-red-400 focus:outline-none"
            value={show}
            onChange={(e) => {
              setShow(e.target.value);
            }}
            type="text"
            required
            placeholder="Search for a TV show..."
          />
          <button
            type="submit"
            className="cursor-pointer flex justify-center items-center absolute right-[0.55rem] bottom-[0.4rem] bg-red-600 rounded-[50%] p-[0.7rem]"
          >
            <IoSearchOutline className="h-5 w-5 text-white" />
          </button>
        </form>
        {suggestions && (
          <SearchSuggestions suggestions={suggestions} isHidden={isHidden} />
        )}
      </div>
    </>
  );
};

export default SearchBar;
