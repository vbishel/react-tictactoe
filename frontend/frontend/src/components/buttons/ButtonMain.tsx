export type Props = {
  children: React.ReactNode,
  href?: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  className?: string,
  disabled?: boolean,
}


export default function ButtonMain({ children, onClick, className = "", disabled = false }: Props) {

  return (
    <button
    disabled={disabled}
    onClick={onClick}
    className={`bg-primary py-4 w-[220px] mb-6 hover:cursor-pointer 
    hover:translate-y-[-3px] hover:shadow-2xl hover:bg-primary-light transition-[2s] active:bg-primary-dark 
    active:translate-y-0 active:transition-none select-none ${className}`}
    >
      { children }
    </button>
  )
}