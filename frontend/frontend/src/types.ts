import { w3cwebsocket } from "websocket";


export type Action = {
  type: string;
  payload: string;
};

export type GameState = {
  currentTurn: "O" | "X";
  O: string[];
  O_score: number;
  X: string[];
  X_score: number;
  isGameStarted: boolean;
  isRoundEnded: boolean;
  winner: "O" | "X" | null;
  winningCombination: string[] | null;
}

export type RoomInfo = {
  host: string,
  hostSymbol: "O" | "X",
  isHost: boolean,
  winsToEnd: number,
}


export type RoomSettings = {
  winsToEnd: string,
  hostSymbol: "O" | "X",
  inputError: string,
  roomCode: string,
}


export type GameContext = {
  state: GameState,
  dispatch: Function,
  roomInfo: RoomInfo
}
