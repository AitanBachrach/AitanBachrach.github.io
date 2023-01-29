import React from 'react';

function WaitingScreen(props){

  return (
    <>
      <h1>{props.lobbyCode}</h1>
      <h1>{props.game['players'].length}/4 players have joined the lobby</h1>
    </>
  )
}

export default WaitingScreen