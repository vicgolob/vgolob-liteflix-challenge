import { render, screen } from '@testing-library/react';

import Home from '@pages/Home';
import * as api from '@api/index';

describe('Home', () => {
  it('should render the component', () => {
    render(<Home />);
    expect(screen.getByTestId('home')).toBeInTheDocument();
  });

  it('should display the current now playing movie', () => {
    const nowPlayingMovieMock = {
      id: 2341,
      backdrop_path: 'path/to/image',
      title: 'Movie Title',
      vote_average: 7.5,
      release_date: '2022-01-01',
    };
    jest.spyOn(api, 'useMovieNowPlaying').mockReturnValue({
      nowPlayingMovies: [nowPlayingMovieMock],
      isLoading: false,
      isError: false,
    });
    render(<Home />);
    expect(screen.getByText(nowPlayingMovieMock.title)).toBeInTheDocument();
  });
});
