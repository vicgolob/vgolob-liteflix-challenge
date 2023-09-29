import { useState, useEffect, useContext, useRef, useMemo, memo } from 'react';

import {
  useFetchMoviesList,
  useGetMoviesSelectorCategories,
  useMovieNowPlaying,
} from '@api/index';
import { SidePanelRefType } from '@interfaces/index';
import {
  CustomButton,
  DropdownMenu,
  MoviesList,
  NavBar,
  SidePanel,
} from '@components/index';
import IconPlay from '@assets/icons/play.svg';
import IconAdd from '@assets/icons/add.svg';
import SidePanelContext from '@context/Context';
import useScreenSize from '@hooks/useScreenSize';
import AddMovieModal from '@components/AddMovieModal';

const Home = memo(() => {
  console.log('>>>>', process.env.REACT_APP_LITEFLIX_API);

  const { screenIsPhoneSize } = useScreenSize();
  const isScreenPhone = useMemo(() => screenIsPhoneSize(), [screenIsPhoneSize]);

  const { sidePanelIsOpen, toggleSidePanelIsOpen } =
    useContext(SidePanelContext);
  const sidePanelRef = useRef<SidePanelRefType>(null);

  // Now Playing movies
  const { nowPlayingMovies } = useMovieNowPlaying();
  const [currentNowPlayingMovieIndex, setCurrentNowPlayingMovieIndex] =
    useState(0);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  // Categories dropdown menu
  const { categories } = useGetMoviesSelectorCategories();
  const [selectedMovieCategory, setSelectedMovieCategory] =
    useState('idbm_popular');
  const [resetMoviesList, setResetMoviesList] = useState(false);
  // Movies
  const [currentPage, setCurrentPage] = useState(1);

  // Movies List
  const { moviesPaginationResponse } = useFetchMoviesList(
    selectedMovieCategory,
    currentPage,
  );

  // Upload file Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  /* Control when to call function to close Side Panel */
  useEffect(() => {
    sidePanelIsOpen &&
      sidePanelRef.current &&
      sidePanelRef.current.forceClosePanel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScreenPhone]);

  // When a category selection changes, we want to reset the movies list
  function handleOptionSelection(category: string) {
    setCurrentPage(1);
    setResetMoviesList(true);
    setSelectedMovieCategory(category);
  }

  function loadNextPage() {
    setResetMoviesList(false);
    setCurrentPage(currentPage + 1);
  }

  return (
    <div data-testid="home" className="relative">
      {/* Movies cover as background */}
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
          onAddMovieButtonPress={() => setIsModalOpen(true)}
        />

        {/* SidePanel */}
        {sidePanelIsOpen && (
          <SidePanel
            ref={sidePanelRef}
            showPhoneScreenLayout={isScreenPhone}
            onClosePanel={toggleSidePanelIsOpen}
            onAddMovieButtonPress={() => setIsModalOpen(true)}
          />
        )}

        <section className="md:min-h-[800px] relative flex flex-col md:flex-row space-y-16 md:justify-between">
          {/* Now Playing Section */}
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

          <div className="flex flex-col items-center relative">
            {/* Movies category selector */}
            <DropdownMenu
              options={categories ?? []}
              initialSelectedOption={categories[0]}
              showPhoneScreenLayout={isScreenPhone}
              onSelectedOption={handleOptionSelection}
            />
            {/* Movies liest according to category selection */}
            <MoviesList
              movies={moviesPaginationResponse?.results || []}
              currentPage={currentPage}
              totalPages={moviesPaginationResponse?.total_pages || 1}
              loadMoreHandler={loadNextPage}
              resetList={resetMoviesList}
            />
          </div>
        </section>
      </main>

      {isModalOpen && (
        <AddMovieModal
          showPhoneScreenLayout={isScreenPhone}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
});

export default Home;
