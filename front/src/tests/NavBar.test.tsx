import { render, screen } from '@testing-library/react';

import { NavBar } from '@components/index';

describe('NavBar', () => {
  it('should render phone-sized NavBar', () => {
    jest.mock('@hooks/useScreenSize', () => {
      function useScreenSize() {
        return {
          screenIsPhoneSize: () => true,
        };
      }

      return useScreenSize;
    });

    render(<NavBar />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('menu-button')).toBeInTheDocument();
    expect(screen.getByLabelText('Liteflix logo')).toBeInTheDocument();
    expect(screen.getByTestId('user-avatar-button')).toBeInTheDocument();
  });

  it('should render non-phone-sized NavBar', () => {
    jest.mock('@hooks/useScreenSize', () => {
      function useScreenSize() {
        return {
          screenIsPhoneSize: () => false,
        };
      }

      return useScreenSize;
    });

    render(<NavBar />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByLabelText('Liteflix logo')).toBeInTheDocument();
    expect(screen.getByTestId('add-movie-button')).toBeInTheDocument();
    expect(screen.getByTestId('menu-button')).toBeInTheDocument();
    expect(screen.getByTestId('notifications-button')).toBeInTheDocument();
    expect(screen.getByTestId('user-avatar-button')).toBeInTheDocument();
  });
});
