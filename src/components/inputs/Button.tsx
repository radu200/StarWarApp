interface IButton {
  title: string;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  className?: string;
}

export default function Button({
  title,
  type,
  disabled,
  onClick,
  className,
}: IButton) {
  return <button
    className={className || "btn_primary"}
    type={type || "button"}
    disabled={disabled}
    onClick={onClick} >
    {title}
  </button>;
}