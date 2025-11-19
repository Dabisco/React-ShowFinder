import Header from "@/components/Header";

const About = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-[1rem] sm:px-[15rem] mt-[3rem]">
        <div className="px-[0.5rem] py-[0.5rem] bg-gray-800">
          <h1 className="text-white text-[2rem] text-center font-[600] border-b-2 border-b-red-500 mb-[1rem]">
            About Show Finder
          </h1>
          <p className="text-gray-300 text-[0.9rem] mb-[2rem]">
            Welcome to TV Show Finder, your go-to destination for discovering
            and organizing your favorite television shows. Our mission is to
            provide a clean, fast, and user-friendly interface to help you
            explore the vast world of TV.
          </p>
          <div className="text-gray-300  mb-[2rem]">
            <h2 className="text-[1.3rem] font-[700]">Features</h2>
            <h3 className="text-[0.9rem]">
              <span className="font-[700]">Powerful Search:</span> Quickly find
              any TV show by its name.
            </h3>
            <h3 className="text-[0.9rem]">
              <span className="font-[700]">Detailed Information:</span> Get
              comprehensive details including summaries, schedules, cast, and
              episode lists.
            </h3>
            <h3 className="text-[0.9rem]">
              <span className="font-[700]">Personalized Favorites:</span> Keep
              track of shows you love by adding them to your personal favorites
              list, stored conveniently in your browser.
            </h3>
            <h3 className="text-[0.9rem]">
              <span className="font-[700]">Sleek, Modern UI:</span> Enjoy a
              beautiful, responsive design that works great on any device.
            </h3>
            <h3 className="text-[0.9rem]">
              <span className="font-[700]">Dark Mode:</span> Switch to a dark
              theme for comfortable viewing, especially at night.
            </h3>
          </div>

          <div className=" text-gray-300">
            <h2 className="font-[700] text-[1.3rem]">Data Source</h2>
            <p className="text-[0.9rem]">
              All the TV show data, including images, summaries, and scheduling
              information, is graciously provided by the{" "}
              <span className="text-red-500 cursor-pointer">
                <a href="https://api.tvmaze.com">TVmaze API</a>
              </span>
              . We are not affiliated with TVmaze, but we are incredibly
              grateful for their excellent and free service that powers this
              application.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
