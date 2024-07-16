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
  playingWithBot: boolean;
  botPlayingWith: "O"|"X";
  hideEntryScreen: boolean;
  winner: "O" | "X" | null;
  winningCombination: string[] | null;
}

export type RoomInfo = {
  host: string,
  isHost: boolean,
  winsToEnd: number,
  hostSymbol: "O" | "X",
}

export type SingleplayerContext = {
  state: GameState,
  dispatch: Function,
}

export type MultiplayerContext = SingleplayerContext & { roomInfo: RoomInfo }