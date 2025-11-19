import { useState } from "react";
import Card from "@/components/Card";
import { Show } from "@/services/types";

type Shows = {
  shows: Show[];
  onCardClick: (showId: number) => void;
  className?: string;
};

const Grid = (props: Shows) => {
  // const [shows, setShows] = useState<Show[]>(props.shows);

  return (
    <>
      <div id="grid-container" className={`${props.className}`}>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-[1rem] sm:grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))]">
          {props.shows.map((show, index) => {
            return (
              <Card
                key={index}
                show={show}
                onClick={() => {
                  props.onCardClick(show.id);
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Grid;
