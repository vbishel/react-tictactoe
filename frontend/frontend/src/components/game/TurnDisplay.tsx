import { useContext } from "react";
import { TictactoeContext } from "../../contexts";
import { oppositePlayer } from "../../utils/game";
import { oneTurnWasMade } from "../../utils/game";


type Props = {
  displayFor: "O" | "X"
}


export default function TurnDisplay({ displayFor }: Props) {
  const context = useContext(TictactoeContext)!

  function getAnimation() {
    if (context.state.isRoundEnded 
    || context.state.currentTurn === oppositePlayer(displayFor)) {
      if (oneTurnWasMade(context.state)) {
        return "animate-scaleOutY";
      }
      return "opacity-0";
    }
    return "animate-scaleInY";
  }
  
  return (
    <div
    className={`w-[380px] py-[8px] bg-primary absolute flex justify-center items-center
    ${getAnimation()} right-[-2px] text-background
    ${displayFor === "O" ? "bottom-[-42px] origin-top" : "top-[-42px] origin-bottom"}`} 
    >
      {displayFor} turn!
    </div>
  )
}
