import React from 'react';
import GameGrid from '../game/GameGrid';
import ButtonSecondary from '../buttons/ButtonSecondary';
import ButtonPrimary from '../buttons/ButtonPrimary';
import { Link } from "react-router-dom";

type State = {
  winsToEnd: string,
  hostSymbol: "O" | "X",
  inputError: string,
}

export default class CreateRoomPage extends React.Component<any, State> {
  constructor(props: any) {
    super(props)

    this.createRoom = this.createRoom.bind(this);
  }
  
  state: State = {
    winsToEnd: "5",
    hostSymbol: "O",
    inputError: "",
  }

  createRoom() {
    const winsToEnd = parseInt(this.state.winsToEnd);
    if (isNaN(winsToEnd) || winsToEnd < 1 || winsToEnd > 100) {
      this.setState({...this.state, inputError: "incorrect input"})
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        wins_to_end: winsToEnd,
        host_symbol: this.state.hostSymbol
      })
    }
    fetch("/api/create-room", requestOptions)
    .then((response) => response.json())
    .then((data) => console.log(data))
  }


  render() {
    console.log(this.state)
    return (
      <>
        <div className="w-[380px] h-[380px] border-primary border-4 flex flex-col justify-center items-center box-content z-10">
          <div>wins to end game</div>
          <div>max - 100</div>
          <input 
          className="mt-4 px-4 py-1 w-[140px] box-border bg-primary text-background flex text-center items-center"
          type="number" 
          value={this.state.winsToEnd}
          onChange={(e) => this.setState({...this.state, winsToEnd: e.target.value, inputError: ""})}
          />
          { this.state.inputError ? (
            <div className="text-red-600 mt-2">
              { this.state.inputError }
            </div>
          ) : ""}
          <div className="mt-4">host symbol</div>
          <div className="w-[140px] mt-4 flex flex-row justify-between">
            <ButtonSecondary
            className={`${this.state.hostSymbol === "X" ? "" : "opacity-30"}`}
            onClick={() => this.setState({...this.state, hostSymbol: "X"})}
            >
              X
            </ButtonSecondary>
            <ButtonSecondary
            className={`${this.state.hostSymbol === "O" ? "" : "opacity-30"}`}
            onClick={() => this.setState({...this.state, hostSymbol: "O"})}
            >
              O
            </ButtonSecondary>
          </div>
          <ButtonPrimary
          className="mt-8 !w-[140px] h-[40px]"
          onClick={this.createRoom}
          >
            CREATE
          </ButtonPrimary>
          <Link to="/" className="mt-2 hover:cursor-pointer">
            BACK
          </Link>
        </div>
        <GameGrid disabled={true} className="absolute left-1/2 translate-x-[-50%] translate-y-[2.5px]" />
      </>
    )
  }
}
