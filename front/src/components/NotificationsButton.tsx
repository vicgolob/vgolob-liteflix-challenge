import { CustomButton } from '@components/index';
import IconNotification from '@assets/icons/notification.svg';

function NotificationsButton({ onPress = () => {} }: { onPress?: Function }) {
  return (
    <CustomButton
      variant="ghost"
      testId="notifications-button"
      image={IconNotification}
      label="check notifications"
      onPress={onPress}
    />
  );
}

export default NotificationsButton;
