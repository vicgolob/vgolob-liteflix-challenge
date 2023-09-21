import { useState } from 'react';

import { ReactComponent as Logo } from '@assets/logo.svg';
import SidePanel from './SidePanel';
import AddMovieButton from './AddMovieButton';
import UserAvatarButton from './UserAvatarButton';
import MenuButton from './MenuButton';
import NotificationsButton from './NotificationsButton';

function NavBar() {
  const [isSidePanelOpened, setIsSidePanelOpened] = useState(false);
  const [isMobileSidePanel, setIsMobileSidePanel] = useState(false);

  function openSideMenu({ menuType }: { menuType: string }) {
    setIsMobileSidePanel(menuType.toLowerCase() === 'mobile');
    setIsSidePanelOpened(true);
  }

  return (
    <>
      {/* NavBar Mobile */}
      <div
        data-testid="navbar"
        className="md:hidden flex justify-between items-center">
        <MenuButton
          onPress={() => {
            openSideMenu({ menuType: 'mobile' });
          }}
        />
        <Logo width={113} aria-label="Liteflix logo" />
        <UserAvatarButton />
      </div>
      {/* NavBar Tablet & Above */}
      <div className="hidden md:flex justify-between items-center">
        <div className="flex space-x-10 items-center">
          <Logo width={113} aria-label="Liteflix logo" />
          <AddMovieButton />
        </div>
        <div className="flex space-x-10 items-center">
          <MenuButton
            onPress={() => {
              openSideMenu({ menuType: 'not-mobile' });
            }}
          />

          <NotificationsButton />
          <UserAvatarButton />
        </div>
      </div>
      {/* SidePanel */}
      {isSidePanelOpened && (
        <SidePanel
          isMobile={isMobileSidePanel}
          onClosePanel={() => setIsSidePanelOpened(false)}
        />
      )}
    </>
  );
}

export default NavBar;
