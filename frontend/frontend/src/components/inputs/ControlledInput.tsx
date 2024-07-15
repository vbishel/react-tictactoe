

type Props = {
  value: string,
  onChange: React.ChangeEventHandler<HTMLInputElement>,
  inputError?: string,
  type?: string,
  className?: string,
  maxLength?: number,
}


export default function ControlledInput({ value, onChange, inputError = "", 
type = "text", className = "", maxLength }: Props) {
  return (
    <>
      <input 
      className={`text-background bg-primary mt-4 px-4 py-1
       w-[140px] box-border flex text-center items-center ${className}`}
      type={type}
      value={value}
      onChange={(e) => {
        if (maxLength && e.target.value.length > maxLength) {
          return; 
        }
        onChange(e)
      }}
      />
      { inputError ? (
        <div className="text-red-600 mt-2">
          { inputError }
        </div>
      ) : ""}
    </>
  )
}