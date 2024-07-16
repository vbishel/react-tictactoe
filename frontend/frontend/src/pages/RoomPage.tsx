import { Action, GameState, RoomInfo } from "../types";
import { initialState } from "../constants";
import { Location, useLocation, Link } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import { useEffect, useState, useReducer } from "react";
import { MultiContext } from "../contexts";
import { gameReducer } from "../reducers/gameReducer";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import { w3cwebsocket } from "websocket";
import GameGrid from "../components/game/GameGrid";


var socket: w3cwebsocket;
var prevAction: Action;
export default function RoomPage() {
  const location = useLocation();
  const roomCode = getRoomCodeFromLocation(location);
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [roomInfo, setRoomInfo] = useState<RoomInfo | undefined>(undefined);
  const [roomFound, setRoomFound] = useState<boolean | undefined>(undefined);
  const [player, setPlayer] = useState("")

  useEffect(() => {
    fetch(`/api/get-room?code=${roomCode}`)
    .then((response) => {
      if (!response.ok) {
        setRoomFound(false);
        return;
      }
      setRoomFound(true);
      return response.json();
    })
    .then(data => {
      setRoomInfo({
        host: data.host,
        isHost: data.is_host,
        winsToEnd: data.wins_to_end,
        hostSymbol: data.host_symbol,
      });
    })
  }, [])

  useEffect(() => {
    // TODO: при отключении хоста выходить из комнаты
    if (roomInfo) {
      socket = new w3cwebsocket(`ws://127.0.0.1:8000/room/${roomCode}`)
      socket.onopen = () => {
        console.log("client connected");
      }
      socket.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data as string);
        switch (dataFromServer.type) {
          case "player_join":
            const session_id = dataFromServer.data;
            if (session_id !== roomInfo.host) {
              setPlayer(session_id);
            }
            break;

          case "accept_action":
          default:
            const action = dataFromServer.data as Action;
            if (prevAction && prevAction.payload === action.payload && prevAction.type === action.type) {
              return;
            }
            prevAction = action;
            dispatch(action);
            dispatch({
              type: "check_round_winner",
              payload: ""
            })
            break;
        }
      }
    }
  }, [roomInfo])

  function getRoomCodeFromLocation(location: Location<any>) {
    return location.pathname.replace(/[a-z]/g, "").replace(/\/+/g, '');
  }

  function handleGameStart() {
    sendAction({
      type: "start_game",
      payload: "player"
    })
  }

  function sendAction(action: Action) {
    socket.send(JSON.stringify({
      type: "action",
      data: action
    }))
  }

  if (roomFound === false) {
    return (
      <PageContainer>
        Room Not Found
      </PageContainer>
    )
  }

  if (!roomInfo) {
    return null;
  }

  console.log(state)

  if (state.isGameStarted) {
    return (
      <MultiContext.Provider value={{state, dispatch: sendAction, roomInfo}}>
        <GameGrid />
      </MultiContext.Provider>
    )
  }
  return (
    <PageContainer className={`${state.isGameStarted ? "hidden" : ""}`}>
      <div className="text-xl">
        ROOM CODE: {roomCode}
      </div>
      <div>
        wins to end: {roomInfo.winsToEnd}
      </div>
      <div>
        host symbol: {roomInfo.hostSymbol}
      </div>
      <div>
        player: {player ? "connected" : "not connected"}
      </div>
      <ButtonPrimary 
      className="mt-4 w-[200px] py-1" disabled={!(roomInfo.isHost && player)}
      onClick={handleGameStart}
      >
        START
      </ButtonPrimary>
      <Link to="/" className="mt-4 hover:cursor-pointer" onClick={() => {
        
      }}>
        LEAVE
      </Link>
    </PageContainer>
  )
}