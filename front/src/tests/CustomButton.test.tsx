import { render, screen } from '@testing-library/react';

import { CustomButton } from '@components/index';

describe('CustomButton', () => {
  it('should render a button with default primary variant', () => {
    const variant = 'primary';
    const testId = 'primary-button';
    const label = 'Button Label';
    const onPress = jest.fn();
    const image = 'button-image.png';

    render(
      <CustomButton
        variant={variant}
        testId={testId}
        label={label}
        onPress={onPress}
        image={image}
      />,
    );

    const button = screen.getByTestId(testId);
    expect(button).toBeInTheDocument();
    expect(screen.getByAltText(label)).toBeInTheDocument();
  });

  it('should render a button with secondary variant', () => {
    const variant = 'secondary';
    const testId = 'secondary-button';
    const label = 'Button Label';
    const onPress = jest.fn();
    const image = 'button-image.png';

    render(
      <CustomButton
        variant={variant}
        testId={testId}
        label={label}
        onPress={onPress}
        image={image}
      />,
    );

    const button = screen.getByTestId(testId);
    expect(button).toBeInTheDocument();
    expect(screen.getByAltText(label)).toBeInTheDocument();
  });

  it('should render a button with ghost variant', () => {
    const variant = 'ghost';
    const testId = 'primary-button';
    const label = 'Button Label';
    const onPress = jest.fn();
    const image = 'button-image.png';

    render(
      <CustomButton
        variant={variant}
        testId={testId}
        label={label}
        onPress={onPress}
        image={image}
      />,
    );

    const button = screen.getByTestId(testId);
    expect(button).toBeInTheDocument();
    expect(screen.getByAltText(label)).toBeInTheDocument();
  });

  it('should render a button with empty text', () => {
    const variant = 'primary';
    const testId = 'test-id';
    const label = 'Button Label';
    const onPress = jest.fn();
    const image = 'button-image.png';

    render(
      <CustomButton
        variant={variant}
        testId={testId}
        label={label}
        onPress={onPress}
        image={image}
      />,
    );

    const button = screen.getByTestId(testId);
    expect(button).toBeInTheDocument();
    expect(screen.getByAltText(label)).toBeInTheDocument();
  });

  it('should render a button with text', () => {
    const variant = 'primary';
    const testId = 'test-id';
    const label = 'Button Label';
    const onPress = jest.fn();
    const image = 'button-image.png';
    const text = 'test text';

    render(
      <CustomButton
        variant={variant}
        testId={testId}
        label={label}
        onPress={onPress}
        image={image}
        text={text}
      />,
    );

    const button = screen.getByTestId(testId);
    expect(button).toBeInTheDocument();
  });
});
