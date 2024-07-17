import ButtonSecondary from "../buttons/ButtonSecondary"


type Props = {
  currentSymbol: "O" | "X",
  onChange: Function,
}

export default function ChooseSymbol({ currentSymbol, onChange }: Props) {
  return (
    <>
      <div className="mt-4">host symbol</div>
      <div className="w-[140px] mt-4 flex flex-row justify-between">
        <ButtonSecondary
        className={`${currentSymbol === "X" ? "" : "opacity-30"}`}
        onClick={() => onChange("X")}
        >
          X
        </ButtonSecondary>
        <ButtonSecondary
        className={`${currentSymbol === "O" ? "" : "opacity-30"}`}
        onClick={() => onChange("O")}
        >
          O
        </ButtonSecondary>
      </div>
    </>
  )
}
