export type GameState = {
  currentTurn: "O" | "X";
  O: string[];
  O_score: number;
  X: string[];
  X_score: number;
  isGameStarted: boolean;
  isRoundEnded: boolean;
  hostPlayingWith: "O" | "X";
  winner: "O" | "X" | null;
  winningCombination: string[] | null;
}

export type GameMultiplayerState = GameState & { isHost: boolean }

export const initialState: GameState = {
  currentTurn: "X",
  O: [],
  O_score: 0,
  X: [],
  X_score: 0,
  isGameStarted: false,
  isRoundEnded: false,
  hostPlayingWith: "X",
  winner: null,
  winningCombination: null,
};
