import { GameMultiplayerState, initialState } from "../types";
import { Location, useLocation, Link } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import { useEffect, useState } from "react";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import { w3cwebsocket } from "websocket";


type RoomInfo = {
  host: string,
  isHost: boolean,
  winsToEnd: number,
  hostSymbol: "O" | "X",
}

var socket: w3cwebsocket;
export default function RoomPage() {
  const location = useLocation();
  const roomCode = getRoomCodeFromLocation(location);
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
    if (roomInfo) {
      socket = new w3cwebsocket(`ws://127.0.0.1:8000/room/${roomCode}`)
      socket.onopen = () => {
        console.log("client connected")
      }
      socket.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data as string)
        if (dataFromServer.type === 'player_join' && dataFromServer.session_id !== roomInfo?.host) {
          setPlayer(dataFromServer.session_id)
        }
      }
    }
  }, [roomInfo])

  function getRoomCodeFromLocation(location: Location<any>) {
    return location.pathname.replace(/[a-z]/g, "").replace(/\/+/g, '');
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

  return (
    <PageContainer>
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
      <ButtonPrimary className="mt-4 w-[200px] py-1" disabled={!(roomInfo.isHost && player)}>
        START
      </ButtonPrimary>
      <Link to="/" className="mt-4 hover:cursor-pointer" onClick={() => {
        
      }}>
        LEAVE
      </Link>
    </PageContainer>
  )
}