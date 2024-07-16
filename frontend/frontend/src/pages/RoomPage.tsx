import { Action, RoomInfo } from "../types";
import { initialState } from "../constants";
import { Location, useLocation, Link } from "react-router-dom";
import RoundEndMenu from "../components/room/RoundEndMenu";
import PageContainer from "../components/PageContainer";
import { useEffect, useState, useReducer } from "react";
import { TictactoeContext } from "../contexts";
import { gameReducer } from "../reducers/gameReducer";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import { w3cwebsocket } from "websocket";
import GameGrid from "../components/game/GameGrid";
import RoomError from "../components/room/RoomError";


var socket: w3cwebsocket;
var prevAction: Action;
export default function RoomPage() {
  const location = useLocation();
  const roomCode = getRoomCodeFromLocation(location);
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [roomInfo, setRoomInfo] = useState<RoomInfo | undefined>(undefined);
  const [roomFound, setRoomFound] = useState<boolean | undefined>(undefined);
  const [player, setPlayer] = useState("");
  const [hostDisconnected, setHostDisconnected] = useState(false);

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
    if (roomInfo) {
      socket = new w3cwebsocket(`ws://127.0.0.1:8000/room/${roomCode}`)
      socket.onopen = () => {
        console.log("client connected");
      }
      socket.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data as string);
        console.log(message)
        let session_id: string;
        switch (dataFromServer.type) {
          case "player_connected":
            session_id = dataFromServer.data;

            if (session_id !== roomInfo.host) {
              setPlayer(session_id);
            }
            break;
          
          case "player_disconnected":
            session_id = dataFromServer.data;
            if (session_id === roomInfo.host) {
              socket.send(JSON.stringify({
                type: "host_disconnected",
                data: ""
              }));
            } else {
              setPlayer("");
            }
            break;

          case "host_disconnected":
            setHostDisconnected(true);
            const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
            }
            fetch(`/api/delete-room/${roomCode}`, requestOptions)
            .then(response => console.log(response))
            break;
          
          case "accept_action":
          default:
            const action = dataFromServer.data as Action;
            if (prevAction && prevAction.payload === action.payload && prevAction.type === action.type) {
              return;
            }
            prevAction = action;
            dispatch(action);
            if (action.type === "register_turn") {
              dispatch({
                type: "check_round_winner",
                payload: ""
              });
            }
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
    });
  }

  function sendAction(action: Action) {
    socket.send(JSON.stringify({
      type: "action",
      data: action
    }));
  }

  if (roomFound === false) {
    return (
      <RoomError text="Room not found" />
    )
  }

  if (hostDisconnected) {
    return (
      <RoomError text="Host disconnected" />
    )
  }

  if (!roomInfo) {
    return null;
  }

  console.log(state)

  if (state.isGameStarted) {
    return (
      <TictactoeContext.Provider value={{state, dispatch: sendAction, roomInfo}}>
        { state.isRoundEnded ? <RoundEndMenu /> : null}
        <GameGrid />
      </TictactoeContext.Provider>
    )
  }
  return (
    <PageContainer className={`${state.isGameStarted ? "hidden" : ""}`}>
      <div className="text-xl">
        ROOM CODE: <span className="text-primary-light">{roomCode}</span>
      </div>
      <div>
        wins to end: <span className="text-primary-light">{roomInfo.winsToEnd}</span> 
      </div>
      <div>
        host symbol: <span className="text-primary-light">{roomInfo.hostSymbol}</span>
      </div>
      <div>
        player: {" "}
        <span className={`${player ? "text-primary-light" : "text-primary-dark"}`}>
          {player ? "connected" : "not connected"}
        </span>
      </div>
      <ButtonPrimary 
      className="mt-4 w-[200px] py-1" disabled={!(roomInfo.isHost && player)}
      onClick={handleGameStart}
      >
        START
      </ButtonPrimary>
      <Link to="/" className="mt-4 hover:cursor-pointer" onClick={() => {
        socket.close();
      }}>
        LEAVE
      </Link>
    </PageContainer>
  )
}