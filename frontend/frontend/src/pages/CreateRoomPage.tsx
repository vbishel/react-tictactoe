import ButtonSecondary from '../components/buttons/ButtonSecondary';
import ButtonPrimary from '../components/buttons/ButtonPrimary';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import PageContainer from '../components/PageContainer';
import ControlledInput from '../components/inputs/ControlledInput';

type State = {
  winsToEnd: string,
  hostSymbol: "O" | "X",
  inputError: string,
  roomCode: string,
}

export default function CreateRoomPage() {
  const [state, setState] = useState<State>({
    winsToEnd: "5",
    hostSymbol: "O",
    inputError: "",
    roomCode: "",
  });
  const navigate = useNavigate();

  function createRoom() {
    const winsToEnd = parseInt(state.winsToEnd);
    if (isNaN(winsToEnd) || winsToEnd < 1 || winsToEnd > 100) {
      setState({...state, inputError: "incorrect input"})
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        wins_to_end: winsToEnd,
        host_symbol: state.hostSymbol
      })
    }
    fetch("/api/create-room", requestOptions)
    .then((response) => {
      if (!response.ok) {
        // TODO
      }

      return response.json()
    })
    .then(data => navigate(`/room/${data.code}`));
  }

  return (
    <PageContainer>
      <div>wins to end game</div>
      <div>max - 99</div>
      <ControlledInput
      type="number" 
      value={state.winsToEnd}
      inputError={state.inputError}
      onChange={(e) => setState({...state, winsToEnd: e.target.value, inputError: ""})}
      maxLength={2}
      />
      <div className="mt-4">host symbol</div>
      <div className="w-[140px] mt-4 flex flex-row justify-between">
        <ButtonSecondary
        className={`${state.hostSymbol === "X" ? "" : "opacity-30"}`}
        onClick={() => setState({...state, hostSymbol: "X"})}
        >
          X
        </ButtonSecondary>
        <ButtonSecondary
        className={`${state.hostSymbol === "O" ? "" : "opacity-30"}`}
        onClick={() => setState({...state, hostSymbol: "O"})}
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
