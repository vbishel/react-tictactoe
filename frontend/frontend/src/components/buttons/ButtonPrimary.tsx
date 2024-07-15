export type Props = {
  children: React.ReactNode,
  href?: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  className?: string,
  disabled?: boolean,
}


export default function ButtonPrimary({ children, onClick, className = "", disabled = false }: Props) {

  return (
    <button
    disabled={disabled}
    onClick={onClick}
    className={`flex justify-center items-center bg-primary text-background py-4 w-[220px] enabled:hover:cursor-pointer 
    enabled:hover:translate-y-[-3px] enabled:hover:shadow-2xl enabled:hover:bg-primary-light enabled:transition-[2s] 
  enabled:active:bg-primary-dark enabled:active:translate-y-0 active:transition-none select-none disabled:bg-primary-dark ${className}`}
    >
      { children }
    </button>
  )
}
