import { CustomButton } from '@components/index';
import IconAdd from '@assets/icons/add.svg';

function AddMovieButton({ onPress = () => {} }: { onPress?: Function }) {
  return (
    <CustomButton
      variant="ghost"
      testId="add-movie-button"
      image={IconAdd}
      label="go to user's profile"
      text="agregar película"
      onPress={onPress}
      bgColorOnHover="bg-aqua/80"
    />
  );
}

export default AddMovieButton;
