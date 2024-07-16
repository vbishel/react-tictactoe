import { GameState, Action } from "../types";
import { containsAll } from "../utils/game";
import { winningCombinations, initialState } from "../constants";


export function gameReducer(state: GameState, action: Action): GameState {
  console.log("action dispatched")
  switch (action.type) {
    case "register_turn":
      if (state.currentTurn === "X") {
        return {
          ...state,
          X: [...state.X, action.payload],
          currentTurn: "O",
        };
      } else {
        return {
          ...state,
          O: [...state.O, action.payload],
          currentTurn: "X",
        };
      }
    case "check_round_winner":
      if (state.isRoundEnded === false) {
        let player: "O" | "X";
        if (state.currentTurn === "X") {
          player = "O";
        } else {
          player = "X";
        }
        const occupiedCells = state[player];

        for (let i = 0; i < winningCombinations.length; i++) {
          if (containsAll(winningCombinations[i], occupiedCells)) {
            if (player === "O") {
              return {
                ...state,
                O_score: state.O_score + 1,
                isRoundEnded: true,
                winner: "O",
                winningCombination: winningCombinations[i],
              };
            } else {
              return {
                ...state,
                X_score: state.X_score + 1,
                isRoundEnded: true,
                winner: "X",
                winningCombination: winningCombinations[i],
              };
            }
          }
        }
        if (state.X.length + state.O.length === 9) {
          return {
            ...state,
            isRoundEnded: true,
            O_score: state.O_score + 0.5,
            X_score: state.X_score + 0.5,
            winner: null,
          };
        }
      }
      return state;
    case "new_round":
      const firstTurn = (state.O_score + state.X_score) % 2 == 0 ? "X" : "O"
      console.log("SCORE:")
      console.log(state.O_score + state.X_score)
      console.log(firstTurn)
      return {
        ...initialState,
        isGameStarted: true,
        O_score: state.O_score,
        X_score: state.X_score,
        currentTurn: firstTurn,
      };
    case "start_game":
      return {
        ...initialState,
        isGameStarted: true,
        currentTurn: "X",
      };
  }
  return state;
}
