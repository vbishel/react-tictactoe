import { GameState } from "./types";


export const winningCombinations = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["3", "6", "9"],
  ["1", "5", "9"],
  ["3", "5", "7"],
];

export const initialState: GameState = {
  currentTurn: "X",
  O: [],
  O_score: 0,
  X: [],
  X_score: 0,
  isGameStarted: false,
  isRoundEnded: false,
  winner: null,
  winningCombination: null,
};
