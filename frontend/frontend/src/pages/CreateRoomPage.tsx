import ButtonPrimary from '../components/buttons/ButtonPrimary';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import PageContainer from '../components/PageContainer';
import { MultiplayerRoomSettings } from '../types';
import ChooseSymbol from '../components/inputs/ChooseSymbol';
import ChooseWinsToEnd from '../components/inputs/ChooseWinsToEnd';


export default function CreateRoomPage() {
  const [roomSettings, setRoomSettings] = useState<MultiplayerRoomSettings>({
    winsToEnd: "5",
    hostSymbol: "O",
    inputError: "",
    roomCode: "",
  });
  const navigate = useNavigate();

  function createRoom() {
    const winsToEnd = parseInt(roomSettings.winsToEnd);
    if (isNaN(winsToEnd) || winsToEnd < 1 || winsToEnd > 100) {
      setRoomSettings({...roomSettings, inputError: "incorrect input"})
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        wins_to_end: winsToEnd,
        host_symbol: roomSettings.hostSymbol
      })
    }
    fetch("/api/create-room", requestOptions)
    .then((response) => {
      if (!response.ok) {
        setRoomSettings({...roomSettings, inputError: response.statusText})
        return null;
      }

      return response.json()
    })
    .then((data) => {
      if (!data) {
        return;
      }
      navigate(`/room/${data.code}`)
    });
  }

  return (
    <PageContainer>
      <ChooseWinsToEnd 
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setRoomSettings({...roomSettings, winsToEnd: e.target.value})
      }}
      roomSettings={roomSettings}
      />
      <ChooseSymbol 
      currentSymbol={roomSettings.hostSymbol}
      onChange={
        (symbol: "O" | "X") => setRoomSettings({...roomSettings, hostSymbol: symbol, inputError: ""})
      }
      />
      <ButtonPrimary
      className="mt-8 !w-[140px] h-[40px]"
      onClick={createRoom}
      >
        CREATE
      </ButtonPrimary>
      <Link to="/" className="mt-4 hover:cursor-pointer">
        BACK
      </Link>
    </PageContainer>
  )
}
