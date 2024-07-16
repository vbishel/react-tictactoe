import { GameState, Action } from "../types";
import { containsAll } from "../utils/game";
import { winningCombinations, initialState } from "../constants";


export function gameReducer(state: GameState, action: Action): GameState {
  console.log("action dispatched")
  switch (action.type) {
    case "register_turn":
      // Checking who made the turn
      if (state.currentTurn === "X") {
        // Action payload will have a cell, which is added to a list of player's occupied cells.
        return {
          ...state,
          X: [...state.X, action.payload],
          // Passing the turn to the second player
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
        // Check winner will be called after the turn is passed to second player, but we are checking the player who just made the turn
        let player: "O" | "X";
        if (state.currentTurn === "X") {
          player = "O";
        } else {
          player = "X";
        }
        const occupiedCells = state[player];

        // Check if player's occupied cells contain winning combination cells; if so - we have a winner!
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
        // If all cells are filled, but we have no winner - it is a draw
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
      return {
        ...initialState,
        O_score: state.O_score,
        X_score: state.X_score,
        // This line swaps turns between 2 players
        currentTurn: state.currentTurn,
      };
    case "start_game":
      if (action.payload === "bot") {

        let gameFirstTurn: "O" | "X";
        if (state.botPlayingWith === "O") {
          gameFirstTurn = "X";
        } else {
          gameFirstTurn = "O";
        }

        return {
          ...initialState,
          isGameStarted: true,
          playingWithBot: true,
          currentTurn: gameFirstTurn,
        };
      }
      else if (action.payload === "player") {
        return {
          ...initialState,
          isGameStarted: true,
          playingWithBot: false,
          currentTurn: "X",
        };
      }
      throw new Error ("Invalid action payload in start_game action");
    case "hide_entry_screen":
      // Player will always make first turn of the entire game
      return {
        ...initialState,
        hideEntryScreen: true,
      };
    default:
      throw new Error("Didn't find matching action type");
  }
};
