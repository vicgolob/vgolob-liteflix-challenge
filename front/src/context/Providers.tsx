import { ReactNode, useState } from 'react';

import SidePanelContext from '@context/Context';
import useScreenSize from '@hooks/useScreenSize';

export const SidePanelProvider = ({ children }: { children: ReactNode }) => {
  const { screenIsPhoneSize } = useScreenSize();
  const [sidePanelIsOpen, setSidePanelIsOpen] = useState(false);
  const [sidePanelIsMobile, setSidePanelIsMobile] = useState(
    screenIsPhoneSize(),
  );

  const toggleSidePanelIsOpen = () => {
    setSidePanelIsOpen(!sidePanelIsOpen);
  };

  return (
    <SidePanelContext.Provider
      value={{
        sidePanelIsOpen,
        toggleSidePanelIsOpen,
        sidePanelIsMobile,
        setSidePanelIsMobile,
      }}>
      {children}
    </SidePanelContext.Provider>
  );
};
