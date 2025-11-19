// import { JSX } from "react";
import type { Suggestions } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

type SuggestionsProp = {
  suggestions: Suggestions[];
  isHidden: boolean;
};

const SearchSuggestions = ({ suggestions, isHidden }: SuggestionsProp) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`${
          isHidden
            ? ""
            : "mx-auto bg-gray-800 w-[20rem] sm:w-[40rem] rounded-[1rem]"
        } mt-[1rem] relative`}
      >
        <div className="flex flex-col gap-[1rem] text-gray-300 absolute z-[3] bg-gray-800 w-full sm:w-[40rem]">
          {suggestions.map((suggestion, index) => {
            return (
              <div
                onClick={() => {
                  function handleSuggestionClick() {
                    navigate(`/shows/${suggestion.id}`);
                  }

                  handleSuggestionClick();
                }}
                key={index}
                className="pt-[1rem] pb-[1rem] flex gap-[0.7rem] transition-colors duration-300 hover:bg-gray-700  pl-[1rem] cursor-pointer"
              >
                <div className="w-[2rem] h-[3.2rem] overflow-hidden object-cover">
                  <img src={`${suggestion.image?.medium}`} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[0.9rem] font-[700]">
                    {suggestion.name}
                  </span>
                  <span className="text-[0.8rem] text-gray-400 pl-[0.5rem]">
                    {suggestion.year?.slice(0, 4)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SearchSuggestions;
