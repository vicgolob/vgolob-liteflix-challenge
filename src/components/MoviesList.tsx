import { MovieData } from '@interfaces/index';
import MovieCard from './MovieCard';
import { memo, useEffect, useState } from 'react';
import CustomButton from './CustomButton';

const MoviesList = memo(
  ({
    resetList,
    movies,
    currentPage,
    totalPages,
    loadMoreHandler,
  }: {
    resetList: boolean;
    movies: MovieData[];
    currentPage: number;
    totalPages: number;
    loadMoreHandler: Function;
  }) => {
    const [moviesToDisplay, setMoviesToDisplay] = useState<MovieData[]>([]);
    useEffect(() => {
      if (resetList) {
        setMoviesToDisplay(movies);
      } else {
        const newMoviesToAdd = movies.filter(
          (movie) =>
            !moviesToDisplay.some(
              (existingMovie) => existingMovie.id === movie.id,
            ),
        );
        setMoviesToDisplay((prevMovies) => [...prevMovies, ...newMoviesToAdd]);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movies]);

    return (
      <div className="mt-2 pr-[2px] w-full max-h-[665px] lg:max-h-[665px] overflow-y-auto flex flex-col space-y-5">
        {moviesToDisplay.map((movie, key) => (
          <MovieCard key={key} movie={movie} />
        ))}

        {moviesToDisplay.length > 0 && currentPage < totalPages && (
          <CustomButton
            variant="secondary"
            testId="load-more-button"
            label="cargar más"
            onPress={loadMoreHandler}
            text="cargar más"
          />
        )}
      </div>
    );
  },
);

export default MoviesList;
