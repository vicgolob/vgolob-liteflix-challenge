import {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  Ref,
} from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '@assets/logo.svg';
import { NAV_LINKS } from '@constants/navLinks';
import {
  AddMovieButton,
  CloseButton,
  UserAvatarButton,
  NotificationsButton,
} from '@components/index';
import { SidePanelRefType } from '@interfaces/index';

function SidePanel(
  { isMobile, onClosePanel }: { isMobile: boolean; onClosePanel: Function },
  ref: Ref<SidePanelRefType>,
) {
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
    // Espera a que termine la animación antes de cerrar el panel
    setTimeout(() => onClosePanel(), 1000);
  }

  useImperativeHandle(ref, () => ({
    forceClosePanel: handleClosePanel,
  }));

  return (
    <>
      {/* Backdrop del panel lateral */}
      <div className="fixed inset-0 z-50 hidden md:block bg-black/70"></div>
      <div
        data-testid="side-panel"
        className={`fixed inset-0 z-50 font-regular h-full w-screen md:w-1/2 py-7 px-6 md:px-10 lg:px-20 md:py-7 bg-black md:bg-black/90 overflow-y-auto text-white transition-all ease-in-out duration-1000 transform ${translateClassName}`}>
        <div className="flex justify-between items-center">
          <CloseButton onPress={handleClosePanel} />

          {isMobile && (
            <>
              <Logo width={113} aria-label="Liteflix logo" />
              <UserAvatarButton />
            </>
          )}

          {!isMobile && (
            <div className="flex items-center space-x-10">
              <NotificationsButton />
              <UserAvatarButton />
            </div>
          )}
        </div>

        {/* Contenedor de enlaces */}
        <div className="flex flex-col mt-16 h-100">
          <div className="flex flex-col space-y-10">
            {NAV_LINKS.map((link, index) => (
              <Link key={index} to={link.href}>
                {link.title}
              </Link>
            ))}
          </div>
          <div className="my-16">
            <AddMovieButton />
          </div>
          <button className="max-w-fit">Cerrar sesión</button>
        </div>
      </div>
    </>
  );
}

export default forwardRef(SidePanel);
