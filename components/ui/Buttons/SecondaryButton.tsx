import { ButtonProps } from './types';

const SecondaryButton = ({ loading, text, onClick }: ButtonProps) => {
  return (
    <button disabled={loading} onClick={onClick} className='secondary'>
      {text}
    </button>
  );
};

export { SecondaryButton };
