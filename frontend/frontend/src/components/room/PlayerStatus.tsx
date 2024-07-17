import React from 'react'


type Props = {
  player: string,
  playerDisconnected: boolean,
}

export default function PlayerStatus({ player, playerDisconnected }: Props) {
  if (playerDisconnected && !player) {
    return (
      <div className="text-red-500">
        player disconnected
      </div>
    )
  }

  if (player) {
    return (
      <div className="text-primary-light">
        player connected
      </div>
    )
  }

  return (
    <div className="text-primary-dark">
      player not connected
    </div>
  )
}
