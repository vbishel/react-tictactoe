import { createContext } from "react";
import { SingleplayerContext, MultiplayerContext } from "./types";


export const SingleContext = createContext<SingleplayerContext | null>(null);

export const MultiContext = createContext<MultiplayerContext|  null>(null);