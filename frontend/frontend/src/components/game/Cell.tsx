import React from "react";


type Props = {
  disabled?: boolean
}

export default class Cell extends React.Component<Props> {


  render() {
    const disabled = this.props.disabled || false;

    return (
      <div className="border-primary-light border-2">

      </div>
    )
  }
}