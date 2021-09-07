
interface ITextField {
  placeHolder?: string;
  type?: string;
  required?: boolean;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function TextField({
  type,
  onChange,
  required,
  placeHolder,
  className
}: ITextField) {
  return <input
    className={className || "text_field"}
    type={type || "text"}
    onChange={onChange}
    placeholder={placeHolder}
    required={required || false} />;
}