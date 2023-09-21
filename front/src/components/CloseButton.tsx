import IconClose from '@assets/icons/close.svg';
import CustomButton from '@components/CustomButton';

function CloseButton({ onPress = () => {} }: { onPress?: Function }) {
  return (
    <CustomButton image={IconClose} label="close" onPress={() => onPress()} />
  );
}

export default CloseButton;
