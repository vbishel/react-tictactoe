import Cell from "./Cell";


type Props = {
  disabled?: boolean,
  className?: string,
}

export default function GameGrid({ disabled = false, className = ""}: Props) {

  return (
    <div 
    className={`grid grid-rows-3 grid-cols-3 w-[380px] h-[380px] border-primary-light 
    border-2 box-content ${disabled ? "opacity-5" : ""} ${className}`}>
      {
        Array.from({length: 9}, (_, index) => {
          return <Cell disabled={disabled} key={index} />
        })
      }
    </div>
  )
}