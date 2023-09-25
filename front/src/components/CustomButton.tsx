function CustomButton({
  variant = 'primary',
  testId,
  label,
  onPress,
  image = '',
  text = '',
  bgColorOnHover = 'bg-aqua',
  disabled = false,
}: {
  variant?: 'primary' | 'secondary' | 'ghost';
  testId: string;
  label: string;
  onPress: Function;
  image?: string;
  text?: string;
  bgColorOnHover?: string;
  disabled?: boolean;
}) {
  const variantClassMap: {
    [key: string]: string;
  } = {
    primary:
      'w-60 h-14 bg-black/80 hover:bg-white/50 disabled:bg-white/50 disabled:hover:bg-white/50',
    secondary:
      'w-60 h-14 border border-white/50 bg-black/50 hover:bg-aqua/80 disabled:border-white/20 disabled:bg-white/10 disabled:hover:bg-white/10',
    ghost: `max-w-fit rounded-full p-2 hover:${bgColorOnHover}/80 transition duration-300`,
  };
  const variantClassName =
    variantClassMap[variant.toLocaleLowerCase()] || 'max-w-fit';

  return (
    <button
      disabled={disabled}
      data-testid={testId}
      aria-label={label}
      onClick={() => onPress()}
      className={`flex justify-center items-center space-x-3 text-white  ${variantClassName}`}>
      {image?.length > 0 && (
        <img
          src={image}
          alt={label}
          className="min-w-[16] max-w-[26px] aspect-square"
        />
      )}
      {text.length > 0 && <p className="font-regular mt-1">{text}</p>}
    </button>
  );
}

export default CustomButton;
