import { MultiContext } from "../../contexts";
import { useContext } from "react";


type Props = {
  idx: string,
}


export default function MultiplayerCell({ idx }: Props) {
  const context = useContext(MultiContext)!;
  let symbol = "";
  
  if (context.state.O.indexOf(idx) !== -1) {
    symbol = "O";
  }
  if (context.state.X.indexOf(idx) !== -1) {
    symbol = "X";
  }

  function handleClick() {
    if (symbol) {
      return;
    }

    let currentPlayer: "O" | "X";
    const hostSymbol = context.roomInfo!.hostSymbol;
    if (context.roomInfo!.isHost) {
      currentPlayer = hostSymbol;
    } else if (hostSymbol === "O") {
      currentPlayer = "X"
    } else {
      currentPlayer = "O"
    }

    console.log(context.state.currentTurn)
    console.log(currentPlayer)
    if (context.state.currentTurn === currentPlayer) {
      context.dispatch({
        type: "register_turn",
        payload: idx
      })
    }
  }

  return (
    <div
    className={`${symbol ? "" : "hover:cursor-pointer"} border-primary border-2 
    flex justify-center items-center text-5xl`}
    onClick={handleClick}
    >
      <div className={`${symbol ? "animate-scaleIn" : "hidden"}`}>
        { symbol }
      </div>
    </div>
  )
}