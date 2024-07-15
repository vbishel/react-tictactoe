import React from "react";
import Cell from "./Cell";


type Props = {
  disabled?: boolean,
  className?: string,
}

export default class GameGrid extends React.Component<Props> {


  render() {
    const disabled = this.props.disabled || false;

    return (
      <div 
      className={`grid grid-rows-3 grid-cols-3 w-[380px] h-[380px] border-primary-light 
      border-2 box-content ${disabled ? "opacity-5" : ""} ${this.props.className}`}>
        {
          Array.from({length: 9}, (_, index) => {
            return <Cell disabled={disabled} key={index} />
          })
        }
      </div>
    )
  }
}