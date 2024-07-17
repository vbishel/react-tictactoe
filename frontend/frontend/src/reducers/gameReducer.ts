import { GameState, Action } from "../types";
import { containsAll } from "../utils/game";
import { winningCombinations, initialState } from "../constants";
import { oppositePlayer } from "../utils/game";

export function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {

    case "register_turn":
      if (state.currentTurn === "X") {
        return {
          ...state,
          X: [...state.X, action.payload],
          currentTurn: "O",
        }
      } 

      return {
        ...state,
        O: [...state.O, action.payload],
        currentTurn: "X",
      }

    case "check_round_winner":
      if (state.isRoundEnded === true) {
        return state;
      }

      let player: "O" | "X" = oppositePlayer(state.currentTurn);

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
            }
          }

          return {
            ...state,
            X_score: state.X_score + 1,
            isRoundEnded: true,
            winner: "X",
            winningCombination: winningCombinations[i],
          }
        }
      }

      if ((state.O.length + state.X.length) === 9) {
        return {
          ...state,
          isRoundEnded: true,
          O_score: state.O_score + 0.5,
          X_score: state.X_score + 0.5,
          winner: null,
        }
      }
      console.log("ROUND NOT ENDED")
      return state;

    case "new_round":
      const firstTurn = (state.O_score + state.X_score) % 2 == 0 ? "X" : "O"
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

    case "force_reset":
      return initialState;
  }

  return state;
}
