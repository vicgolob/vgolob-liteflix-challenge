import { createContext } from 'react';

import { SidePanelContextProps } from '@interfaces/index';

const SidePanelContext = createContext<SidePanelContextProps>({
  sidePanelIsOpen: false,
  toggleSidePanelIsOpen: () => {},
});

export default SidePanelContext;
