import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('should render main component and navigation bar', () => {
    render(<App />);
    const mainComponent = screen.getByRole('main');
    const navigationBar = screen.getByTestId('navbar');

    expect(mainComponent).toBeInTheDocument();
    expect(navigationBar).toBeInTheDocument();
  });
});
