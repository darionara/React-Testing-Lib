type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  value: number | string;
  onClick: (e: number | string) => void;
  className: string;
};

const Button: React.FC<ButtonProps> = ({ onClick, value, className }) => {
  return (
    <button className={`calculator__button ${className}`} onClick={onClick} >
      {value}
    </button>
  );
};

export default Button;
