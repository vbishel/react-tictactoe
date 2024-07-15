import PageContainer from "../components/PageContainer";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import ControlledInput from "../components/inputs/ControlledInput";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


export default function JoinRoomPage() {
  const [roomCode, setRoomCode] = useState("");
  const [roomJoined, setRoomJoined] = useState(false);
  const navigate = useNavigate();

  function handleRoomJoin() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }
    fetch(`/api/join-room?code=${roomCode}`, requestOptions)
    .then((response) => {
      if (response.ok) {
        setRoomJoined(true);
      }

      return response.json()
    })
    .then((data) => {
      console.log(data);
    })
  }

  if (roomJoined) {
    navigate(`/room/${roomCode}`);
  }

  return (
    <PageContainer>
      <div>
        Enter Room Code
      </div>
      <ControlledInput
      value={roomCode}
      onChange={(e) => {
        setRoomCode(e.target.value.toUpperCase())
      }}
      maxLength={6}
      />
      <ButtonPrimary
      className="mt-6 w-[100px] h-[10px]"
      onClick={handleRoomJoin}
      >
        JOIN
      </ButtonPrimary>
      <Link to="/" className="mt-4 hover:cursor-pointer">
        BACK
      </Link>
    </PageContainer>
  )
}
