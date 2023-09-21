import { useState, useEffect, Key } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '@assets/logo.svg';
import { INavLink, NAV_LINKS } from '../constants/navLinks';
import AddMovieButton from './AddMovieButton';
import CloseButton from './CloseButton';
import UserAvatarButton from './UserAvatarButton';
import NotificationsButton from './NotificationsButton';

function SidePanel({
  isMobile,
  onClosePanel,
}: {
  isMobile: boolean;
  onClosePanel: Function;
}) {
  const initialPosition = isMobile ? '-translate-x-full' : 'translate-x-[200%]';
  const [translateClassName, setTransalateClassName] =
    useState(initialPosition);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTransalateClassName(isMobile ? 'translate-x-0' : 'translate-x-full');
    }, 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClosePanel() {
    setTransalateClassName(initialPosition);
    // wait for animation to end
    setTimeout(() => onClosePanel(), 1000);
  }

  return (
    <>
      <div
        className={`font-regular fixed z-20 inset-0 p-7 w-screen md:w-1/2 h-screen md:px-20 md:py-7 bg-black md:bg-black/90 text-white transition-all ease-in-out duration-1000 transform ${translateClassName}`}>
        {/* Side panel header for Mobile */}
        <div className="md:hidden flex justify-between items-center">
          <CloseButton onPress={handleClosePanel} />
          <Logo width={113} aria-label="Liteflix logo" />
          <UserAvatarButton />
        </div>
        {/* Side panel header for Tablet & Above */}
        <div className="hidden md:flex justify-between items-center">
          <CloseButton onPress={handleClosePanel} />
          <div className="flex items-center space-x-10">
            <NotificationsButton />
            <UserAvatarButton />
          </div>
        </div>
        {/* Links container */}
        <div className="flex flex-col mt-16">
          <div className="flex flex-col space-y-10">
            {NAV_LINKS.map((link: INavLink, index: Key) => (
              <Link key={index} to={link.href}>
                {link.title}
              </Link>
            ))}
          </div>
          <div className="my-16">
            <AddMovieButton />
          </div>
          <button className="max-w-fit">cerrar sesión</button>
        </div>
      </div>
      {/* Side panel backdrop */}
      <div className="fixed top-0 left-0 z-10 h-screen w-full hidden md:block bg-black/70"></div>
    </>
  );
}

export default SidePanel;
