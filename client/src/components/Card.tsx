import ShowRating from "@/components/ShowRating";
import Genres from "@/components/Genres";
import type { Show } from "@/services/types";

// interface Show {
//   image: {
//     medium: string | null;
//     original: string | null;
//   } | null;
//   name: string;
//   summary: string | null;
//   rating: {
//     average: number | null;
//   };
//   genres: string[];
// }

type CardProps = {
  show: Show;
  onClick: () => void;
};
const Card = (props: CardProps) => {
  function stripHTML(html: string | null, maxLength: number): string {
    if (html === null) {
      return "";
    }
    const temp = document.createElement("div");
    temp.innerHTML = html;
    const tempText = temp.textContent || temp.innerText;
    if (tempText.length > maxLength) {
      const newTempText = tempText.slice(0, maxLength) + "...";
      return newTempText;
    } else {
      return tempText;
    }
  }

  const summary = stripHTML(props.show.summary, 140);

  return (
    <>
      <div
        onClick={props.onClick}
        id="show-card"
        className="group rounded-[0.5rem] h-[350px] sm:h-[400px] bg-gray-800 overflow-hidden transition-transform hover:scale-[1.05] duration-500 cursor-pointer"
      >
        <div
          id="img-container"
          className="relative h-[200px] w-[100%] overflow-hidden mb-[1rem]"
        >
          <img
            src={`${props.show.image?.medium}`}
            className="h-full w-full object-cover "
          />
          <div
            id="overlay"
            className="absolute top-0 group-hover:bg-[rgba(0,_0,_0,_0.6)] transition-colors duration-300 h-full w-full"
          ></div>

          <div
            id="show-summary"
            className="absolute top-0 opacity-0 text-[0.7rem] pt-[5rem] px-[1rem] text-white group-hover:opacity-100   transition-opacity duration-300"
          >
            {summary}
          </div>
        </div>

        <div id="show-details" className="pl-[0.8rem]">
          <h2 id="show-name" className="text-white mb-[0.5rem]">
            {props.show.name}
          </h2>
          <ShowRating rating={props.show.rating} />
          <Genres
            genres={props.show.genres}
            className="gap-[0.25rem] sm:gap-[0.5rem]"
          />
        </div>
      </div>
    </>
  );
};

export default Card;
