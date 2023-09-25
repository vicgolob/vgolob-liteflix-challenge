import { render, screen } from '@testing-library/react';

import App from '../App';

describe('App', () => {
  it('should render Home component', () => {
    render(<App />);
    expect(screen.getByTestId('home')).toBeInTheDocument();
  });
});
