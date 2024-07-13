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
      < >
        <Header>Tic Tac Toe</Header>
        <ButtonMain onClick={this.handleSingleplayerClick}>PLAY VS BOT</ButtonMain>
        <ButtonMain onClick={this.handleMultiplayerClick}>JOIN ROOM</ButtonMain>
        <ButtonMain onClick={this.handleMultiplayerClick}>HOST ROOM</ButtonMain>
      </>
    )
  }
}

export default HomePage;