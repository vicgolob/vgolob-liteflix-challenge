import { useEffect, useState } from 'react';

import { DropdownMenuOption } from '@interfaces/index';
import IconArrowDown from '@assets/icons/arrow-down.svg';
import { CloseButton, DropdownTongue } from '@components/index';
import IconCheck from '@assets/icons/check.svg';

function DropdownMenu({
  options,
  initialSelectedOption = null,
  showPhoneScreenLayout,
  onSelectedOption,
}: {
  options: DropdownMenuOption[];
  initialSelectedOption?: DropdownMenuOption | null;
  showPhoneScreenLayout?: boolean;
  onSelectedOption: Function;
}) {
  const [selectedOption, setSelectedOption] = useState(initialSelectedOption);
  const [showDropdown, setShowDropdown] = useState(false);

  const DROPDOWN_POSITION = {
    onScreen: 'bottom-0',
    offScreen: 'bottom-[-100%]',
  };
  const [bottomPositionClassName, setBottomPositionClassName] = useState(
    showPhoneScreenLayout
      ? DROPDOWN_POSITION.offScreen
      : DROPDOWN_POSITION.onScreen,
  );

  useEffect(() => {
    setSelectedOption(initialSelectedOption);
  }, [initialSelectedOption]);

  function handleOptionClick(option: DropdownMenuOption) {
    if (selectedOption?.value !== option.value) {
      onSelectedOption(option.value);
      setSelectedOption(option);
    }
    handleToggleMenuDropdown();
  }

  function handleToggleMenuDropdown() {
    if (showPhoneScreenLayout) {
      if (!showDropdown) {
        setShowDropdown(true);
        setTimeout(
          () => setBottomPositionClassName(DROPDOWN_POSITION.onScreen),
          0,
        );
      } else {
        setBottomPositionClassName(DROPDOWN_POSITION.offScreen);
        // wait for animation to end to hide dropdown menu
        setTimeout(() => {
          setShowDropdown(false);
        }, 500);
      }
    } else {
      setShowDropdown(!showDropdown);
    }
  }

  return (
    <>
      <button
        data-testid="menu-dropdown-toggler"
        className="flex justify-between h-10 py-2 w-full font-regular text-white text-lg"
        onClick={handleToggleMenuDropdown}>
        <>
          {selectedOption ? (
            <div>
              <span className="font-light mr-2">ver:</span>
              <span className="font-bold">{selectedOption.label}</span>
            </div>
          ) : (
            <span>Selecciona categoría</span>
          )}
          <img
            src={IconArrowDown}
            alt="abrir menu de categorías"
            className="self-center"
            width={14}
            height="auto"
          />
        </>
      </button>
      {showDropdown && (
        <div
          className={`fixed md:absolute md:top-10 z-20 ${
            showPhoneScreenLayout
              ? bottomPositionClassName
              : DROPDOWN_POSITION.onScreen
          } mt-2 w-full md:w-80 transition-bottom duration-500 ease-in-out`}>
          <DropdownTongue />
          <div className={`md:static bg-black p-6 md:px-0`}>
            <div className="flex justify-end md:hidden mb-3">
              <CloseButton onPress={handleToggleMenuDropdown} />
            </div>
            <ul className={`space-y-4  font-regular text-white`}>
              {options.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleOptionClick(option)}
                  className={`px-5 py-4 w-full cursor-pointer hover:bg-white/50 ${
                    option.value === selectedOption?.value
                      ? 'font-bold'
                      : 'font-regular'
                  }`}>
                  <div className="flex justify-between">
                    {option.label}
                    {option.value === selectedOption?.value && (
                      <img src={IconCheck} alt="" />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default DropdownMenu;
