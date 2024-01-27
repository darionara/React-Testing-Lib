type ButtonBoxProps = React.ComponentPropsWithoutRef<"div">;

const ButtonBox: React.FC<ButtonBoxProps> = ({ children }) => {
  return <div className='buttonBox'>{children}</div>;
};

export default ButtonBox;
