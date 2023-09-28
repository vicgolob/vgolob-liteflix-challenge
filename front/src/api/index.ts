import useSWR, { SWRResponse } from 'swr';

import { FetchMoviesResponse, MovieData } from '@interfaces/index';

const fetcher = (args: string) => fetch(args).then((res) => res.json());

export function useMovieNowPlaying() {
  const { data, error, isLoading } = useSWR(
    `${process.env.REACT_APP_IMDB_API}/movie/now_playing?api_key=${process.env.REACT_APP_IMDB_KEY}`,
    fetcher,
  );

  return {
    nowPlayingMovies: (data?.results as MovieData[]) || [],
    isLoading,
    isError: error,
  };
}

function fetchMoviesSelectorCategories() {
  return Promise.resolve([
    {
      label: 'populares',
      value: 'idbm_popular',
    },
    {
      label: 'mis películas',
      value: 'my_movies',
    },
  ]);
}

export function myMoviesMock() {
  return Promise.resolve({
    page: 1,
    results: [
      {
        backdrop_path: 'https://fakeimg.pl/600x400',
        title: 'my movie mock 01',
      },
      {
        backdrop_path: 'https://fakeimg.pl/600x400',
        title: 'my movie mock 02',
      },
    ],
    total_pages: 1,
    total_results: 2,
  });
}

function transformData(response: FetchMoviesResponse) {
  return {
    ...response,
    results: response.results.map((movieData: MovieData) => ({
      ...movieData,
      backdrop_path: `${process.env.REACT_APP_IMDB_IMAGE_RESIZE}${movieData.backdrop_path}`,
    })),
  };
}

export function useGetMoviesSelectorCategories() {
  const { data } = useSWR('moviesCategories', fetchMoviesSelectorCategories);
  return { categories: data ?? [] };
}

export function useFetchMoviesList(category: string, page: number = 1) {
  let url = 'getMyMovies';
  let _fetcher: any = myMoviesMock;
  const fetchFromImdb = category === 'idbm_popular';
  if (fetchFromImdb) {
    url = `${process.env.REACT_APP_IMDB_API}/movie/popular?api_key=${process.env.REACT_APP_IMDB_KEY}&page=${page}`;
    _fetcher = fetcher;
  }

  let { data, error, isLoading } = useSWR(url, _fetcher) as SWRResponse<
    FetchMoviesResponse,
    any,
    any
  >;

  if (data && fetchFromImdb) {
    data = transformData(data);
  }
  return { moviesPaginationResponse: data, isLoading, isError: error };
}
