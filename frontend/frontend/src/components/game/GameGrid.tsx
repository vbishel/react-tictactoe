import MultiplayerCell from "./MultiplayerCell";
import { useContext } from "react";


export default function GameGrid() {

  return (
    <div 
    className={`grid grid-rows-3 grid-cols-3 w-[380px] h-[380px] border-primary-light 
    border-2 box-content`}>
      {
        Array.from({length: 9}, (_, index) => {
          return <MultiplayerCell idx={(index + 1).toString()} key={index} />
        })
      }
    </div>
  )
}