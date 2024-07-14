import React from "react";
import ButtonMain from "../buttons/ButtonMain";
import Header from "../Header";

class HomePage extends React.Component {

  handleSingleplayerClick() {

  }

  handleMultiplayerClick() {

  }

  render() {
    return (
      <>
        <Header>Tic Tac Toe</Header>
        <ButtonMain>PLAY VS BOT</ButtonMain>
        <ButtonMain>JOIN ROOM</ButtonMain>
        <ButtonMain>HOST ROOM</ButtonMain>
      </>
    )
  }
}

export default HomePage;