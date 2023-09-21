function CustomButton({
  testId,
  label,
  onPress,
  image,
  text = '',
}: {
  testId: string;
  label: string;
  onPress: Function;
  image: string;
  text?: string;
}) {
  return (
    <button
      data-testid={testId}
      aria-label={label}
      onClick={() => onPress()}
      className="flex items-center max-w-fit space-x-3">
      <img src={image} alt="" />
      {text.length > 0 && (
        <p className="font-regular text-white mt-1">{text}</p>
      )}
    </button>
  );
}

export default CustomButton;
