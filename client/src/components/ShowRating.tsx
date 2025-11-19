import { useState } from "react";
import { MdStar as FullStar } from "react-icons/md";
// import { MdStarHalf as HalfStar } from "react-icons/md";
import { MdStar as EmptyStar } from "react-icons/md";
// import { MdOutlineStarOutline as EmptyStar } from "react-icons/md";
import { Show } from "@/services/types";

type RatingProp = {
  rating: { average: number | null } | undefined;
  className?: string;
};

const ShowRating = (props: RatingProp) => {
  const average = (props?.rating?.average ?? 0) / 2;
  const starArray = [];

  for (let i = 1; i <= 5; i++) {
    if (i < Math.round(average)) {
      starArray.push("f");
    } else if (i === Math.round(average)) {
      if (Math.round(average) === Math.floor(average)) {
        starArray.push("f");
      } else {
        starArray.push("h");
      }
    } else {
      starArray.push("e");
    }
  }
  return (
    <>
      <div
        id="ratings-container"
        className={`${props.className} flex justify-start items-center gap-[0.5rem] mb-[0.3rem] sm:mb-[0.5rem]`}
      >
        <div id="stars" className="flex">
          {starArray.map((s, index) => {
            if (s === "f") {
              return (
                <FullStar
                  key={index}
                  className="h-[1rem] w-[1rem] sm:h-[1.3rem] sm:w-[1.3rem] fill-yellow-500"
                />
              );
            } else if (s === "h") {
              return (
                <div className="relative h-[1rem] sm:h-[1.3rem] w-[1rem] sm:w-[1.3rem]">
                  <div className="absolute top-0 w-[48%] h-full overflow-hidden">
                    <FullStar
                      key={index}
                      className="text-yellow-500 h-[1rem] sm:h-[1.3rem] w-[1rem] sm:w-[1.3rem]"
                    />
                  </div>
                  <EmptyStar className="text-gray-400 h-[1rem] sm:h-[1.3rem] w-[1rem] sm:w-[1.3rem]" />
                </div>
              );
            } else {
              return (
                <EmptyStar
                  key={index}
                  className="h-[1rem] sm:h-[1.3rem] w-[1rem] sm:w-[1.3rem] text-gray-400"
                />
              );
            }
          })}
        </div>

        <div
          id="rating"
          className="text-gray-400 text-[0.8rem] sm:text-[0.85rem]"
        >
          {props?.rating?.average}/10
        </div>
      </div>
    </>
  );
};

export default ShowRating;
