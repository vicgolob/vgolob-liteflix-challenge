import useSWR from 'swr';

import { IMovie } from '@interfaces/index';

const fetcher = (args: string) => fetch(args).then((res) => res.json());

export function useMovieNowPlaying() {
  const { data, error, isLoading } = useSWR(
    `${process.env.REACT_APP_IMDB_API}/movie/now_playing?api_key=${process.env.REACT_APP_IMDB_KEY}`,
    fetcher,
  );

  return {
    nowPlayingMovies: (data?.results as IMovie[]) || [],
    isLoading,
    isError: error,
  };
}
