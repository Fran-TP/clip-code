interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <button
      type="button"
      className="hidden md:flex items-center gap-2 px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors duration-200"
    >
      {children}
    </button>
  )
}

export default Button
