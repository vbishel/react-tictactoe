import { TictactoeContext } from "../../contexts";
import { useContext } from "react";
import ButtonPrimary from "../buttons/ButtonPrimary";
import ButtonPrimaryLink from "../buttons/ButtonPrimaryLink";


export default function RoundEndMenu() {
  const context = useContext(TictactoeContext)!;
  
  function gameWinner(): "O" | "X" | "-" | null {
    if (context.state.O_score === context.state.X_score
      && context.state.X_score === context.roomInfo.winsToEnd) {
      return "-"
    }
    
    if (context.state.O_score >= context.roomInfo.winsToEnd) {
      return "O";
    }

    if (context.state.X_score >= context.roomInfo.winsToEnd) {
      return "X";
    }

    return null;
  }

  return (
    <div className={`w-[380px] h-[380px] flex flex-col 
    justify-center items-center box-content z-[100] absolute left-1/2 
    translate-x-[-50%] translate-y-[2px] opacity-0 animate-fadeIn [animation-delay:_0.35s]`}>
      { gameWinner() ? (
        <>
          <div className="text-center text-xl">
            { gameWinner() === "-" ? (
              <span>Draw!</span>
            ) : (
            <span><span className="text-3xl">{ gameWinner() }</span> is the boss of this room!</span>
            )}
          </div>
          <div className="text-primary-dark text-3xl my-3">
            X - <span className="text-primary-light text-4xl">{ context.state.X_score } | {context.state.O_score}</span> - O
          </div>
          <ButtonPrimaryLink className="mt-6" href="/">
            LEAVE
          </ButtonPrimaryLink>
        </>
      ) : (
        <>
          <div className="text-3xl">
            { context.state.winner ? `${context.state.winner} won!` : "Draw!"}
          </div>
          <div className="text-primary-dark text-3xl my-3">
            X - <span className="text-primary-light text-4xl">{ context.state.X_score } | {context.state.O_score}</span> - O
          </div>
          <div>
            Wins to end: { context.roomInfo.winsToEnd }
          </div>
          <ButtonPrimary 
          className="mt-12"
          onClick={() => {
            context.dispatch({
              type: "new_round",
              payload: "" 
            })
          }}
          >
            NEW ROUND
          </ButtonPrimary>
        </>
      )}
    </div>
  )
}
