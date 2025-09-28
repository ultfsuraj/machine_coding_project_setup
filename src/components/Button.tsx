import { cva, VariantProps } from 'class-variance-authority';
import { useFormStatus } from 'react-dom';

const buttonStyles = cva(
  'rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2',
  {
    variants: {
      intent: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
        danger: 'bg-red-500 text-white hover:bg-red-600',
      },
      size: {
        small: 'px-3 py-1 text-sm',
        medium: 'px-4 py-2 text-base',
        large: 'px-5 py-3 text-lg',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'medium',
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles>;

const Button = ({ intent, size, className, children, ...props }: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button className={buttonStyles({ intent, size, className })} {...props}>
      {pending ? 'waiting..' : children}
    </button>
  );
};

export default Button;
