import { useState, useEffect } from 'react';

const SCREEN_PHONE_MAX_WIDTH = 767;

function useScreenSize() {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function screenIsPhoneSize() {
    return screenSize.width <= SCREEN_PHONE_MAX_WIDTH;
  }

  return { screenSize, screenIsPhoneSize };
}

export default useScreenSize;
