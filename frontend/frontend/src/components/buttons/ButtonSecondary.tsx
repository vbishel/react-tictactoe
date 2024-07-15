type Props = {
  children: React.ReactNode,
  className?: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
}

export default function ButtonSecondary({ children, className, onClick }: Props) {
  return (
    <button 
    className={`border-2 px-6 py-1 border-primary flex justify-center items-center 
    transition select-none ${className}`}
    onClick={onClick}
    >
      { children }
    </button>
  )
}