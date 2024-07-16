import { TictactoeContext } from "../../contexts";
import MultiplayerCell from "./Cell";
import PageContainer from "../PageContainer";
import { useContext } from "react";
import TurnDisplay from "./TurnDisplay";


export default function GameGrid() {

  const context = useContext(TictactoeContext)!;

  return (
    <>
      <div 
      className={`grid grid-rows-3 grid-cols-3 w-[380px] h-[380px] border-primary-light
      relative border-2 box-border`}>
        <TurnDisplay displayFor="X"/>
        {
          Array.from({length: 9}, (_, index) => {
            return <MultiplayerCell idx={(index + 1).toString()} key={index} />
          })
        }
        <TurnDisplay displayFor="O"/>
      </div>
    </>
  )
}