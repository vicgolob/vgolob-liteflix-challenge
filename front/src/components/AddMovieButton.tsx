import IconAdd from '@assets/icons/add.svg';
import CustomButton from '@components/CustomButton';

function AddMovieButton() {
  return (
    <CustomButton
      testId="add-movie-button"
      image={IconAdd}
      label="go to user's profile"
      text="agregar película"
      onPress={() => {}}
    />
  );
}

export default AddMovieButton;
