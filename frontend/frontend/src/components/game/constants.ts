export interface GameState {
  currentTurn: "O" | "X";
  O: string[];
  O_score: number;
  X: string[];
  X_score: number;
  isGameStarted: boolean;
  isRoundEnded: boolean;
  hostPlayingWith: "O" | "X"
  winner: "O" | "X" | null;
  winningCombination: string[] | null;
}

type Action = {
  type: string;
  payload: string;
};

type Context = {
  state: GameState;
  dispatch: Function;
};


const winningCombinations = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["3", "6", "9"],
  ["1", "5", "9"],
  ["3", "5", "7"],
];

var initialState: GameState = {
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