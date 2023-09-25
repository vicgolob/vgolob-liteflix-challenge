import { useContext } from 'react';

import { ReactComponent as Logo } from '@assets/logo.svg';
import {
  AddMovieButton,
  UserAvatarButton,
  MenuButton,
  NotificationsButton,
} from '@components/index';
import useScreenSize from '@hooks/useScreenSize';
import SidePanelContext from '@context/Context';

function NavBar() {
  const { screenIsPhoneSize } = useScreenSize();
  const { toggleSidePanelIsOpen } = useContext(SidePanelContext);

  return (
    <nav className="flex justify-between items-center">
      {/* NavBar Mobile */}
      {screenIsPhoneSize() && (
        <>
          <MenuButton onPress={toggleSidePanelIsOpen} />
          <Logo width={113} aria-label="Liteflix logo" />
          <UserAvatarButton />
        </>
      )}

      {/* NavBar Tablet & Above */}
      {!screenIsPhoneSize() && (
        <>
          <div className="flex space-x-10 items-center">
            <Logo width={113} aria-label="Liteflix logo" />
            <AddMovieButton />
          </div>
          <div className="flex space-x-10 items-center">
            <MenuButton onPress={toggleSidePanelIsOpen} />
            <NotificationsButton />
            <UserAvatarButton />
          </div>
        </>
      )}
    </nav>
  );
}

export default NavBar;
