import PageContainer from "../components/PageContainer";
import ChooseSymbol from "../components/inputs/ChooseSymbol";
import { useState, useReducer, useEffect } from "react";
import { RoomSettings } from "../types";
import { Link } from "react-router-dom";
import ChooseWinsToEnd from "../components/inputs/ChooseWinsToEnd";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import RoundEndMenu from "../components/room/RoundEndMenu";
import GameGrid from "../components/game/GameGrid";
import { gameReducer } from "../reducers/gameReducer";
import { initialState } from "../constants";
import { TictactoeContext } from "../contexts";
import { getBotMove, oppositePlayer } from "../utils/game";


export default function SingleplayerPage() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [roomSettings, setRoomSettings] = useState<RoomSettings>({
    hostSymbol: "X",
    winsToEnd: "5",
    inputError: ""
  });

  useEffect(() => {
    if (state.currentTurn === oppositePlayer(roomSettings.hostSymbol)) {
      setTimeout(() => {
        const pickedCell = getBotMove(
          state, roomSettings
        )

        dispatch({ type: "register_turn", payload: pickedCell });
        dispatch({ type: "check_round_winner", payload: "" });
      }, 500)
    }
  }, [state.currentTurn, state.isRoundEnded, state.isGameStarted])

  if (state.isGameStarted) {
    return (
      <TictactoeContext.Provider value={{state, dispatch, roomInfo: {
        hostSymbol: roomSettings.hostSymbol,
        winsToEnd: Number(roomSettings.winsToEnd),
        isHost: true,
        host: "default"
      }, singleplayer: true}}>
        { state.isRoundEnded ? <RoundEndMenu /> : null}
        <GameGrid />
      </TictactoeContext.Provider>
    )
  }

  return (
    <PageContainer>
      <ChooseWinsToEnd
      roomSettings={roomSettings}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setRoomSettings({
          ...roomSettings, 
          winsToEnd: e.target.value,
          inputError: ""
        })
      }}
      />
      <ChooseSymbol
      currentSymbol={roomSettings.hostSymbol}
      onChange={(symbol: "O" | "X") => {
        setRoomSettings({
          ...roomSettings,
          hostSymbol: symbol
        })
      }}
      />
      <ButtonPrimary 
      className="mt-8 !w-[140px] h-[40px]"
      onClick={() => dispatch({
        type: "start_game",
        payload: ""
      })}
      >
        START GAME
      </ButtonPrimary>
      <Link to="/" className="mt-4 hover:cursor-pointer">
        BACK
      </Link>
    </PageContainer>
  );
}