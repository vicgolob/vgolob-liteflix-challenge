import DropdownMenu from '@components/DropdownMenu';
import { fireEvent, screen, render } from '@testing-library/react';

describe('DropdownMenu', () => {
  const optionsMock = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];
  const onSelectedOption = jest.fn();

  it('should display dropdown menu when button is clicked', () => {
    render(
      <DropdownMenu
        options={optionsMock}
        onSelectedOption={onSelectedOption}
      />,
    );

    fireEvent.click(screen.getByTestId('menu-dropdown-toggler'));

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
    expect(screen.getByText('Selecciona categoría')).toBeInTheDocument();
  });

  it('should display new selected option when user selects a different option from the dropdown menu', () => {
    render(
      <DropdownMenu
        options={optionsMock}
        initialSelectedOption={optionsMock[0]}
        onSelectedOption={onSelectedOption}
      />,
    );

    fireEvent.click(screen.getByTestId('menu-dropdown-toggler'));
    fireEvent.click(screen.getByText('Option 3'));

    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });
});
