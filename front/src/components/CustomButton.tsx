function CustomButton({
  variant = 'primary',
  testId,
  label,
  onPress,
  image,
  text = '',
}: {
  variant?: 'primary' | 'secondary' | 'ghost';
  testId: string;
  label: string;
  onPress: Function;
  image: string;
  text?: string;
}) {
  const variantClassMap: {
    [key: string]: string;
  } = {
    primary: 'w-60 h-14 bg-black',
    secondary: 'w-60 h-14 border border-white/50 bg-black/50',
  };
  const variantClassName =
    variantClassMap[variant.toLocaleLowerCase()] || 'max-w-fit';

  return (
    <button
      data-testid={testId}
      aria-label={label}
      onClick={() => onPress()}
      className={`flex justify-center items-center space-x-3 ${variantClassName}`}>
      <img src={image} alt={label} />
      {text.length > 0 && (
        <p className="font-regular text-white mt-1">{text}</p>
      )}
    </button>
  );
}

export default CustomButton;
