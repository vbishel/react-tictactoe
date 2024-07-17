import ButtonSecondary from '../components/buttons/ButtonSecondary';
import ButtonPrimary from '../components/buttons/ButtonPrimary';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import PageContainer from '../components/PageContainer';
import ControlledInput from '../components/inputs/ControlledInput';
import { RoomSettings } from '../types';


export default function CreateRoomPage() {
  const [roomSettings, setRoomSettings] = useState<RoomSettings>({
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
      <div>wins to end game</div>
      <div>max - 99</div>
      <ControlledInput
      type="number" 
      value={roomSettings.winsToEnd}
      inputError={roomSettings.inputError}
      onChange={(e) => setRoomSettings({...roomSettings, winsToEnd: e.target.value, inputError: ""})}
      maxLength={2}
      />
      <div className="mt-4">host symbol</div>
      <div className="w-[140px] mt-4 flex flex-row justify-between">
        <ButtonSecondary
        className={`${roomSettings.hostSymbol === "X" ? "" : "opacity-30"}`}
        onClick={() => setRoomSettings({...roomSettings, hostSymbol: "X"})}
        >
          X
        </ButtonSecondary>
        <ButtonSecondary
        className={`${roomSettings.hostSymbol === "O" ? "" : "opacity-30"}`}
        onClick={() => setRoomSettings({...roomSettings, hostSymbol: "O"})}
        >
          O
        </ButtonSecondary>
      </div>
      <ButtonPrimary
      className="mt-8 !w-[140px] h-[40px]"
      onClick={createRoom}
      >
        CREATE
      </ButtonPrimary>
      <Link to="/" className="mt-2 hover:cursor-pointer">
        BACK
      </Link>
    </PageContainer>
  )
}
