import { TictactoeContext } from "../../contexts";
import { useContext } from "react";


type Props = {
  idx: string,
}


export default function Cell({ idx }: Props) {
  const context = useContext(TictactoeContext)!;
  let symbol = "";
  
  if (context.state.O.includes(idx)) {
    symbol = "O";
  }
  if (context.state.X.includes(idx)) {
    symbol = "X";
  }

  function isMyTurn() {
    let currentPlayer: "O" | "X";
    const hostSymbol = context.roomInfo!.hostSymbol;
    if (context.roomInfo!.isHost) {
      currentPlayer = hostSymbol;
    } else if (hostSymbol === "O") {
      currentPlayer = "X";
    } else {
      currentPlayer = "O";
    }

    return context.state.currentTurn === currentPlayer;
  }

  function handleClick() {
    if (symbol || context.state.isRoundEnded) {
      return;
    }

    if (isMyTurn()) {
      context.dispatch({
        type: "register_turn",
        payload: idx
      })
    }
    if (context.singleplayer) {
      context.dispatch({ 
        type: "check_round_winner", 
        payload: "" 
      });
    }
  }

  return (
    <div
    className={`${symbol || !isMyTurn() || context.state.isRoundEnded ? ""
    : "hover:cursor-pointer"} ${context.state.isRoundEnded ? "animate-fadePartial" : ""}
    border-primary border-2 flex justify-center items-center text-5xl`}
    onClick={handleClick}
    >
      <div className={`${symbol ? "animate-scaleIn" : "hidden"}`}>
        { symbol }
      </div>
    </div>
  )
}