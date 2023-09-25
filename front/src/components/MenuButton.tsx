import { CustomButton } from '@components/index';
import IconMenu from '@assets/icons/menu.svg';

function MenuButton({ onPress }: { onPress: Function }) {
  return (
    <CustomButton
      variant="ghost"
      testId="menu-button"
      image={IconMenu}
      label="open menu"
      onPress={onPress}
    />
  );
}

export default MenuButton;
