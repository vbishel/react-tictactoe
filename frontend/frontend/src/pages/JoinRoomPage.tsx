import PageContainer from "../components/PageContainer";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import ControlledInput from "../components/inputs/ControlledInput";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


export default function JoinRoomPage() {
  const [roomCode, setRoomCode] = useState("");
  const [inputError, setInputError] = useState("");
  const navigate = useNavigate();

  function handleRoomJoin() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }
    fetch(`/api/join-room?code=${roomCode}`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        setInputError(response.statusText);
        return;
      }
      navigate(`/room/${roomCode}`);
    })
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
      inputError={inputError}
      />
      <ButtonPrimary
      className="mt-6 w-[80px] h-[10px]"
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
