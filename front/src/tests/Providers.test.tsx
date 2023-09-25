import { render, screen } from '@testing-library/react';

import { SidePanelProvider } from '@context/Providers';

describe('SidePanelProvider', () => {
  it('should render children when children are provided', () => {
    const children = <div>Test Children</div>;

    render(<SidePanelProvider>{children}</SidePanelProvider>);

    expect(screen.getByText('Test Children')).toBeInTheDocument();
  });
});
