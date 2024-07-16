import { createContext } from "react";
import { GameContext } from "./types";


export const TictactoeContext = createContext<GameContext|  null>(null);