

type Props = {
  children: React.ReactNode,
  className?: string,
}

export default function PageContainer({ children, className}: Props) {
  return (
    <>
      <div className={`w-[380px] h-[380px] border-primary border-4 flex flex-col 
      max-[320px]:w-[300px]
      justify-center items-center box-content z-10 ${className}`}>
        { children }
      </div>
      <div
      className={`grid grid-rows-3 grid-cols-3 w-[380px] h-[380px] max-[320px]:w-[300px] 
      border-2 box-content "opacity-5 absolute left-1/2 
      translate-x-[-50%] translate-y-[2px]`}
      >
        {
          Array.from({length: 9}, (_, index) => {
            return <div key={index} className="border-primary border-2 opacity-5"/>
          })
        }
      </div>
    </>
  )
}
