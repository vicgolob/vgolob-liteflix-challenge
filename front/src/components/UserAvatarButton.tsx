import UserImage from '@assets/user.png';
import CustomButton from '@components/CustomButton';

function UserAvatarButton({ onPress = () => {} }: { onPress?: Function }) {
  return (
    <CustomButton
      testId="user-avatar-button"
      image={UserImage}
      label="go to user's profile"
      onPress={() => onPress()}
    />
  );
}

export default UserAvatarButton;
