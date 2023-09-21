import { render, screen } from '@testing-library/react';
import NavBar from '@components/NavBar';

describe('NavBar', () => {
  it('should render NavBar', () => {
    render(<NavBar />);
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });
});
