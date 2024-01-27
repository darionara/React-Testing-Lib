type ScreenProps = {
  value: number | string;
  'data-testid': string
};

const Screen: React.FC<ScreenProps> = ({ value, 'data-testid': testId }) => {
  return <div className='calculator__screen' data-testid={testId}>{value}</div>;
};

export default Screen;
