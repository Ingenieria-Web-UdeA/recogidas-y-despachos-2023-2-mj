import { Spinner } from '@/components/ui/Spinner';
import { ButtonProps } from './types';

const PrimaryButton = ({
  loading,
  text,
  onClick,
  type = 'button',
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={loading}
      onClick={onClick}
      className='primary'
    >
      {loading ? <Spinner /> : <span>{text}</span>}
    </button>
  );
};

export { PrimaryButton };
