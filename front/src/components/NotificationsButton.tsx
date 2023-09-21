import IconNotification from '@assets/icons/notification.svg';
import CustomButton from '@components/CustomButton';

function NotificationsButton({ onPress = () => {} }: { onPress?: Function }) {
  return (
    <CustomButton
      testId="notifications-button"
      image={IconNotification}
      label="check notifications"
      onPress={() => onPress()}
    />
  );
}

export default NotificationsButton;
