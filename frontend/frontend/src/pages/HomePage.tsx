import React from "react";
import ButtonPrimaryLink from "../components/buttons/ButtonPrimaryLink";
import Header from "../components/Header";

export default class HomePage extends React.Component {

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
