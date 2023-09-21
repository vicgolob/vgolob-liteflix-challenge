import IconMenu from '@assets/icons/menu.svg';
import CustomButton from '@components/CustomButton';

function MenuButton({ onPress }: { onPress: Function }) {
  return (
    <CustomButton
      testId="menu-button"
      image={IconMenu}
      label="open menu"
      onPress={() => onPress()}
    />
  );
}

export default MenuButton;
