import CustomButton from '@components/CustomButton';
import { render, screen } from '@testing-library/react';

describe('CustomButton', () => {
  // Button renders with label, image and text
  it('should render button with label, image and text when all props are provided', () => {
    // Arrange
    const label = 'Button Label';
    const onPress = jest.fn();
    const image = 'button.png';
    const text = 'Button Text';

    // Act
    render(
      <CustomButton
        testId="mock"
        label={label}
        onPress={onPress}
        image={image}
        text={text}
      />,
    );

    // Assert
    expect(screen.getByLabelText(label)).toBeInTheDocument();
    expect(screen.getByAltText('')).toHaveAttribute('src', image);
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
