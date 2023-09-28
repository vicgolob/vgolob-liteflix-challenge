import { CustomButton } from '@components/index';
import IconAdd from '@assets/icons/add.svg';

function AddMovieButton() {
  return (
    <CustomButton
      variant="ghost"
      testId="add-movie-button"
      image={IconAdd}
      label="go to user's profile"
      text="agregar película"
      onPress={() => {}}
      bgColorOnHover="bg-aqua/80"
    />
  );
}

export default AddMovieButton;
