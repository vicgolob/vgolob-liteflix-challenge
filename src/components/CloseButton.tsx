import { CustomButton } from '@components/index';
import IconClose from '@assets/icons/close.svg';

function CloseButton({ onPress = () => {} }: { onPress?: Function }) {
  return (
    <CustomButton
      variant="ghost"
      testId="close-button"
      image={IconClose}
      label="close"
      onPress={onPress}
    />
  );
}

export default CloseButton;
