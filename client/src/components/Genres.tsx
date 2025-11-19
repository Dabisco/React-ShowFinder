interface Genre {
  genres: string[] | undefined;
  className?: string;
}
const Genres = (props: Genre) => {
  return (
    <>
      <div
        id="genre-container"
        className={`${props.className} flex flex-wrap `}
      >
        {props.genres?.map((g, index) => {
          return (
            <span
              id={`genre ${index}`}
              className="inline-flex justify-center items-center text-red-400 font-[600] bg-gray-700 text-[0.5rem] sm:text-[0.6rem] p-[0.3rem] rounded-[0.8rem]"
              key={index}
            >
              {g.toUpperCase()}
            </span>
          );
        })}
      </div>
    </>
  );
};

export default Genres;
