import { GameState, RoomSettings } from "../types";
import { winningCombinations } from "../constants";


export function containsAll(needle: string[], haystack: string[]): boolean {
  for (let i = 0; i < needle.length; i++) {
    if (haystack.indexOf(needle[i]) === -1) {
      return false;
    }
  }
  return true;
}

export function randomElementFromArray<T>(arr: T[]): T {
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


export function getBotMove(state: GameState, settings: RoomSettings) {

  function getAvailableCells(): string[] {
    const availableCells = []
    for (let i = 1; i < 10; i++) {
      const cell = i.toString();
      if (!(state.O.includes(cell) || state.X.includes(cell))) {
        availableCells.push(cell);
      }
    }
    return availableCells;
  }

  function getMissingCombinationElements<T>(combination: T[], elements: T[]): T[] {
    const missingElements: T[] = []
  
    for (let i = 0; i < combination.length; i++) {
      if (!elements.includes(combination[i])) {
        missingElements.push(combination[i])
      }
    }
    
    return missingElements;
  }

  function findWinningCell(cells: string[], availableCells: string[]): string | null {
    let foundCell = null;
    winningCombinations.some((winningCombination) => {

      const isAvailable = winningCombination.every((cell) => {
        return availableCells.includes(cell) || cells.includes(cell);
      })

      if (!isAvailable) {
        return false;
      }

      const missingElements = getMissingCombinationElements(
        winningCombination,
        cells,
      );

      if (missingElements.length > 1) {
        return false;
      }

      foundCell = missingElements[0];
      return true;
    })

    return foundCell;
  }


  let computerOccupiedCells = state[oppositePlayer(settings.hostSymbol)];
  let opponentOccupiedCells = state[settings.hostSymbol];
  let availableCells = getAvailableCells();
  
  if (state.O.length + state.X.length > 1) {
    const winningCell = findWinningCell(
      computerOccupiedCells,
      availableCells
    );
  
    if (winningCell) {
      return winningCell;
    }
  
    const opponentWinningCell = findWinningCell(
      opponentOccupiedCells,
      availableCells
    )
  
    if (opponentWinningCell) {
      return opponentWinningCell;
    }
  }

  if (state.O.length + state.X.length === 0) {
    return "5"
  }

  return randomElementFromArray(availableCells);
}
