import {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  Ref,
  memo,
} from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '@assets/logo.svg';
import { NAV_LINKS } from '@constants/navLinks';
import {
  AddMovieButton,
  CloseButton,
  UserAvatarButton,
  NotificationsButton,
  CustomButton,
} from '@components/index';
import { SidePanelRefType } from '@interfaces/index';

function SidePanel(
  {
    showPhoneScreenLayout,
    onClosePanel,
  }: { showPhoneScreenLayout: boolean; onClosePanel: Function },
  ref: Ref<SidePanelRefType>,
) {
  const initialPosition = showPhoneScreenLayout
    ? '-translate-x-full'
    : 'translate-x-[200%]';
  const reversePosition = !showPhoneScreenLayout
    ? '-translate-x-full'
    : 'translate-x-[200%]';
  const [translateClassName, setTransalateClassName] =
    useState(initialPosition);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTransalateClassName(
        showPhoneScreenLayout ? 'translate-x-0' : 'translate-x-full',
      );
    }, 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClosePanel({
    revertCollapse = false,
  }: {
    revertCollapse?: boolean;
  }) {
    setTransalateClassName(revertCollapse ? reversePosition : initialPosition);
    // wait for animation to end to hide panel
    setTimeout(() => onClosePanel(), 1000);
  }

  useImperativeHandle(ref, () => ({
    forceClosePanel: () => handleClosePanel({ revertCollapse: true }),
  }));

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 hidden md:block bg-black/70"></div>
      <div
        data-testid="side-panel"
        className={`fixed inset-0 z-50 font-regular h-full w-screen md:w-1/2 py-7 px-6 md:px-10 lg:px-20 md:py-7 bg-black md:bg-black/90 overflow-y-auto text-white transition-all ease-in-out duration-1000 transform ${translateClassName}`}>
        <div className="flex justify-between items-center">
          <CloseButton onPress={() => handleClosePanel({})} />

          {showPhoneScreenLayout && (
            <>
              <Logo width={113} aria-label="Liteflix logo" />
              <UserAvatarButton />
            </>
          )}

          {!showPhoneScreenLayout && (
            <div className="flex items-center space-x-10">
              <NotificationsButton />
              <UserAvatarButton />
            </div>
          )}
        </div>

        <div className="flex flex-col mt-16 h-100">
          <div className="flex flex-col space-y-10">
            {NAV_LINKS.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="w-fit border-b-2 border-transparent hover:mx-2 hover:border-white/50 transition-all duration-300">
                {link.title}
              </Link>
            ))}
          </div>
          <div className="my-16 relative right-[4px]">
            <AddMovieButton />
          </div>
          <CustomButton
            testId="end-sesion-button"
            variant="ghost"
            text="cerrar sesión"
            label="cerrar sesión"
            bgColorOnHover="bg-rose-600/80"
            onPress={() => {}}
          />
        </div>
      </div>
    </>
  );
}

export default memo(forwardRef(SidePanel));
