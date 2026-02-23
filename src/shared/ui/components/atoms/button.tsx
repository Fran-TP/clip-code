import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      type="button"
      className={clsx(
        'button-raised cursor-pointer rounded-xl bg-accent text-text-inverse outline-2 outline-transparent outline-offset-3 transition-all duration-200 hover:bg-accent-hover focus-visible:outline-focus-ring',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
