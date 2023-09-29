import { ReactNode, useState } from 'react';

import SidePanelContext from '@context/Context';

export const SidePanelProvider = ({ children }: { children: ReactNode }) => {
  const [sidePanelIsOpen, setSidePanelIsOpen] = useState(false);

  const toggleSidePanelIsOpen = () => {
    setSidePanelIsOpen(!sidePanelIsOpen);
  };

  return (
    <SidePanelContext.Provider
      value={{
        sidePanelIsOpen,
        toggleSidePanelIsOpen,
      }}>
      {children}
    </SidePanelContext.Provider>
  );
};
