

type Props = {
  children: React.ReactNode,
  className?: string,
}


export default function Header({ children, className = "" }: Props) {
  return (
    <div 
    className={`text-[56px] mb-4 text-primary [text-shadow:_0_4px_0_rgb(0_0_0_/_70%)] select-none ${className}`}
    >
        { children }
    </div>
  )
}