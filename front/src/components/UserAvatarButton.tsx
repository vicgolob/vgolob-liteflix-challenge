import { CustomButton } from '@components/index';
import UserImage from '@assets/user.png';

function UserAvatarButton({ onPress = () => {} }: { onPress?: Function }) {
  return (
    <CustomButton
      variant="ghost"
      testId="user-avatar-button"
      image={UserImage}
      label="go to user's profile"
      onPress={onPress}
    />
  );
}

export default UserAvatarButton;
