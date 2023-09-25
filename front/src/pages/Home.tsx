import { useState, useEffect, useContext, useRef } from 'react';

import { useMovieNowPlaying } from '@api/index';
import { IMovie, SidePanelRefType } from '@interfaces/index';
import { CustomButton, NavBar, SidePanel } from '@components/index';
import IconPlay from '@assets/icons/play.svg';
import IconAdd from '@assets/icons/add.svg';
import SidePanelContext from '@context/Context';
import useScreenSize from '@hooks/useScreenSize';

function Home() {
  const { screenSize, screenIsPhoneSize } = useScreenSize();
  const {
    sidePanelIsOpen,
    toggleSidePanelIsOpen,
    sidePanelIsMobile,
    setSidePanelIsMobile,
  } = useContext(SidePanelContext);
  const sidePanelRef = useRef<SidePanelRefType>(null);
  const { nowPlayingMovies, isLoading } = useMovieNowPlaying();
  const [nowPlayingMovie, setNowPlayingMovie] = useState<IMovie>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentNowPlayingMovieIndex, setCurrentNowPlayingMovieIndex] =
    useState(0);

  const updateNowPlayingMovieIndex = () => {
    setCurrentNowPlayingMovieIndex((prevIndex) =>
      prevIndex < nowPlayingMovies.length ? prevIndex + 1 : 0,
    );
  };

  useEffect(() => {
    if (!isLoading && nowPlayingMovies.length) {
      // first load
      setNowPlayingMovie(nowPlayingMovies[0]);

      // schedule update
      const intervalId = setInterval(() => {
        updateNowPlayingMovieIndex();
      }, 5000);

      return () => clearInterval(intervalId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    setNowPlayingMovie(nowPlayingMovies[currentNowPlayingMovieIndex]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNowPlayingMovieIndex]);

  useEffect(() => {
    const isScreenPhone = screenIsPhoneSize();

    if (sidePanelIsMobile !== isScreenPhone) {
      sidePanelRef.current && sidePanelRef.current.forceClosePanel();
      setSidePanelIsMobile(isScreenPhone);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenSize.width]);

  return (
    <div data-testid="home" className="relative">
      <div
        className="absolute w-full h-[550px] md:h-screen transition-all duration-[2.5s] ease-in-out"
        style={{
          background: nowPlayingMovie
            ? `url(${process.env.REACT_APP_IMDB_IMAGE}${
                nowPlayingMovie!.backdrop_path
              }) 50% / cover no-repeat`
            : undefined,
        }}></div>
      <main
        className={`${
          sidePanelIsOpen ? 'fixed' : 'relative'
        } inset-0 h-auto px-6 md:px-10 lg:px-20 pt-5 md:pt-7 pb-14`}
        style={{
          background: 'linear-gradient(transparent, rgb(var(--black))',
        }}>
        <NavBar />

        {/* SidePanel */}
        {sidePanelIsOpen && (
          <SidePanel
            ref={sidePanelRef}
            isMobile={sidePanelIsMobile}
            onClosePanel={toggleSidePanelIsOpen}
          />
        )}

        <section className="relative flex flex-col md:flex-row space-y-16 md:justify-between">
          {/* Now playing movie section */}
          <div className="h-[550px] md:h-auto md:w-3/4 flex flex-col justify-end space-y-4 items-center md:items-start">
            <p className="font-light text-white text-xl">
              Original de <span className="font-bold">liteflix</span>
            </p>
            <h1 className="font-bold text-aqua text-7xl tracking-[12px] text-center md:text-start">
              {nowPlayingMovie?.title}
            </h1>
            <div className="flex flex-col items-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-6">
              <CustomButton
                testId="play-button"
                label="reproducir película"
                text="reproducir"
                image={IconPlay}
                onPress={() => {}}
              />
              <CustomButton
                variant="secondary"
                testId="add-movie-button"
                label="agregar película a mi lista"
                text="mi lista"
                image={IconAdd}
                onPress={() => {}}
              />
            </div>
          </div>

          {/* Popular movies section */}
          <div className="flex flex-col items-center">
            <div className="w-[150px] h-[18px] bg-sky-200 mb-6"></div>
            <div className="bg-red-400 h-[665px] lg:h-[665px] overflow-y-auto flex flex-col space-y-5">
              <div className="border border-white w-[220px] h-[146px] flex-shrink-0"></div>
              <div className="border border-white w-[220px] h-[146px] flex-shrink-0"></div>
              <div className="border border-white w-[220px] h-[146px] flex-shrink-0"></div>
              <div className="border border-white w-[220px] h-[146px] flex-shrink-0"></div>
              <div className="bg-white/40 border border-white w-[220px] h-[146px] flex-shrink-0"></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
