import { createContext } from 'react';

import { SidePanelContextProps } from '@interfaces/index';

const SidePanelContext = createContext<SidePanelContextProps>({
  sidePanelIsOpen: false,
  toggleSidePanelIsOpen: () => {},
  sidePanelIsMobile: false,
  setSidePanelIsMobile: () => {},
});

export default SidePanelContext;
