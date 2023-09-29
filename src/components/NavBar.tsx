import { ReactComponent as Logo } from '@assets/logo.svg';
import {
  AddMovieButton,
  UserAvatarButton,
  MenuButton,
  NotificationsButton,
} from '@components/index';
import { memo } from 'react';

const NavBar = memo(
  ({
    showPhoneScreenLayout,
    onMenuButtonPress,
    onAddMovieButtonPress,
  }: {
    showPhoneScreenLayout: boolean;
    onMenuButtonPress: Function;
    onAddMovieButtonPress?: Function;
  }) => {
    return (
      <nav className="flex justify-between items-center">
        {/* NavBar Mobile */}
        {showPhoneScreenLayout && (
          <>
            <MenuButton onPress={onMenuButtonPress} />
            <Logo width={113} aria-label="Liteflix logo" />
            <UserAvatarButton />
          </>
        )}

        {/* NavBar Tablet & Above */}
        {!showPhoneScreenLayout && (
          <>
            <div className="flex space-x-10 items-center">
              <Logo width={113} aria-label="Liteflix logo" />
              <AddMovieButton onPress={onAddMovieButtonPress} />
            </div>
            <div className="flex space-x-10 items-center">
              <MenuButton onPress={onMenuButtonPress} />
              <NotificationsButton />
              <UserAvatarButton />
            </div>
          </>
        )}
      </nav>
    );
  },
);

export default NavBar;
