import { BrowserRouter as Router } from 'react-router-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { SidePanel } from '@components/index';

describe('SidePanel', () => {
  it('should open side panel with non-mobile styles', () => {
    const onClosePanel = jest.fn();

    render(
      <Router>
        <SidePanel showPhoneScreenLayout={false} onClosePanel={onClosePanel} />
      </Router>,
    );
    expect(screen.getByTestId('side-panel')).toHaveClass('translate-x-[200%]');
    expect(screen.getByTestId('notifications-button')).toBeInTheDocument();
  });

  it('should open side panel correctly on phone devices', () => {
    const onClosePanel = jest.fn();

    render(
      <Router>
        <SidePanel showPhoneScreenLayout={true} onClosePanel={onClosePanel} />
      </Router>,
    );

    expect(screen.getByTestId('side-panel')).toHaveClass('-translate-x-full');
    expect(screen.getByLabelText('Liteflix logo')).toBeInTheDocument();
  });

  it('should close side panel when close button is pressed', async () => {
    const onClosePanel = jest.fn();
    render(
      <Router>
        <SidePanel showPhoneScreenLayout={false} onClosePanel={onClosePanel} />
      </Router>,
    );

    fireEvent.click(screen.getByTestId('close-button'));
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
    expect(onClosePanel).toHaveBeenCalled();
  });
});
