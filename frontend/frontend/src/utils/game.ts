import { GameState } from "../types";


export function containsAll(needle: string[], haystack: string[]): boolean {
  for (let i = 0; i < needle.length; i++) {
    if (haystack.indexOf(needle[i]) === -1) {
      return false;
    }
  }
  return true;
}

export function randomElementFromArray<T>(arr: T[]):T {
  let randNum = Math.floor(Math.random() * arr.length);
  return arr[randNum];
}

export function oppositePlayer(player: "O" | "X"): "O" | "X" {
  if (player === "X") {
    return "O";
  }

  return "X";
}


export function oneTurnWasMade(state: GameState) {
  if (state.X_score + state.O_score > 0) {
    return true;
  }

  if (state.currentTurn === "X") {
    if (state.O.length === 0) {
      return false;
    }
  }

  if (state.currentTurn === "O") {
    if (state.X.length === 0) {
      return false;
    }
  }

  return true;
}