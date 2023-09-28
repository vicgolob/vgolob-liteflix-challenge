import { useState, useEffect, useContext, useRef, useMemo, memo } from 'react';

import { useMovieNowPlaying } from '@api/index';
import { SidePanelRefType } from '@interfaces/index';
import { CustomButton, NavBar, SidePanel } from '@components/index';
import IconPlay from '@assets/icons/play.svg';
import IconAdd from '@assets/icons/add.svg';
import SidePanelContext from '@context/Context';
import useScreenSize from '@hooks/useScreenSize';

const Home = memo(() => {
  const { screenIsPhoneSize } = useScreenSize();
  const isScreenPhone = useMemo(() => screenIsPhoneSize(), [screenIsPhoneSize]);

  const { sidePanelIsOpen, toggleSidePanelIsOpen } =
    useContext(SidePanelContext);
  const sidePanelRef = useRef<SidePanelRefType>(null);
  const { nowPlayingMovies } = useMovieNowPlaying();
  const [currentNowPlayingMovieIndex, setCurrentNowPlayingMovieIndex] =
    useState(0);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    const nextIndex = () => {
      setCurrentNowPlayingMovieIndex((prevIndex) =>
        prevIndex < nowPlayingMovies.length - 1 ? prevIndex + 1 : 0,
      );
    };

    if (nowPlayingMovies.length > 0) {
      intervalRef.current = setInterval(nextIndex, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [nowPlayingMovies]);

  const backgroundImage = nowPlayingMovies.length
    ? `url(${process.env.REACT_APP_IMDB_IMAGE}${nowPlayingMovies[currentNowPlayingMovieIndex]?.backdrop_path}) 50% / cover no-repeat`
    : undefined;

  /* Controla cuando se ejecuta la función para cerrar el SidePanel */
  useEffect(() => {
    sidePanelIsOpen &&
      sidePanelRef.current &&
      sidePanelRef.current.forceClosePanel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScreenPhone]);

  return (
    <div data-testid="home" className="relative">
      {/* Slide con las portadas de las películas */}
      <div
        className="absolute w-full h-[550px] md:h-screen transition-all duration-[2.5s] ease-in-out"
        style={{ background: backgroundImage }}></div>

      <main
        className={`${
          sidePanelIsOpen ? 'fixed' : 'relative'
        } inset-0 h-auto md:min-h-screen px-6 md:px-10 lg:px-20 pt-5 md:pt-7 pb-14`}
        style={{
          background: 'linear-gradient(transparent, rgb(var(--black))',
        }}>
        <NavBar
          showPhoneScreenLayout={isScreenPhone}
          onMenuButtonPress={toggleSidePanelIsOpen}
        />

        {/* SidePanel */}
        {sidePanelIsOpen && (
          <SidePanel
            ref={sidePanelRef}
            showPhoneScreenLayout={isScreenPhone}
            onClosePanel={toggleSidePanelIsOpen}
          />
        )}

        <section className="md:min-h-[800px] relative flex flex-col md:flex-row space-y-16 md:justify-between">
          {/* Seccion 'Now Playing' */}
          <div className="h-[550px] md:h-auto md:w-3/4 flex flex-col justify-end space-y-4 items-center md:items-start">
            <p className="font-light text-white text-xl">
              Original de <span className="font-bold">liteflix</span>
            </p>
            <h1 className="font-bold text-aqua text-7xl tracking-[12px] text-center md:text-start">
              {nowPlayingMovies[currentNowPlayingMovieIndex]?.title}
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
});

export default Home;
