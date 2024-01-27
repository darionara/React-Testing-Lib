type CalculatorProps = React.ComponentPropsWithoutRef<"div">;

const Calculator: React.FC<CalculatorProps> = ({ children }) => {
  return <div className='calculator'>{children}</div>;
};

export default Calculator;
