import React from "react";
import ButtonPrimaryLink from "../buttons/ButtonPrimaryLink";
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
        <ButtonPrimaryLink href="/singleplayer" className="mb-6">PLAY VS BOT</ButtonPrimaryLink>
        <ButtonPrimaryLink href="/join-room" className="mb-6">JOIN ROOM</ButtonPrimaryLink>
        <ButtonPrimaryLink href="/create-room" className="mb-6">CREATE ROOM</ButtonPrimaryLink>
      </>
    )
  }
}

export default HomePage;