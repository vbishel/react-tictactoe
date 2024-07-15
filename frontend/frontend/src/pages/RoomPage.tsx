import { GameMultiplayerState, initialState } from "../types";
import { Location, useLocation, Link } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import { useEffect, useState } from "react";
import ButtonPrimary from "../components/buttons/ButtonPrimary";


type RoomInfo = {
  isHost: boolean,
  winsToEnd: number,
  hostSymbol: "O" | "X",
  player: string,
}

export default function RoomPage() {
  const location = useLocation();
  const roomCode = getRoomCodeFromLocation(location);
  const [roomInfo, setRoomInfo] = useState<RoomInfo | undefined>(undefined);
  const [roomFound, setRoomFound] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    fetch(`/api/get-room?code=${roomCode}`)
    .then((response) => {
      if (!response.ok) {
        setRoomFound(false);
        return;
      }
      setRoomFound(true);
      return response.json()
    })
    .then(data => {
      setRoomInfo({
        isHost: data.is_host,
        winsToEnd: data.wins_to_end,
        hostSymbol: data.host_symbol,
        player: data.player
      });
    })
  }, [])

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
        player: {roomInfo.player ? "connected" : "not connected"}
      </div>
      <ButtonPrimary className="mt-4 w-[200px] py-1" disabled={!roomInfo.player}>
        START
      </ButtonPrimary>
      <Link to="/" className="mt-4 hover:cursor-pointer">
        LEAVE
      </Link>
    </PageContainer>
  )
}