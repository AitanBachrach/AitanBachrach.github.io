import React from 'react';
import Button from 'react-bootstrap/Button';

var createCode = 0
var joinCode = 0

function LobbyScreen(props){

  return (
    <>
      <label>Lobby Create Code:<input type='number' onChange={(e) => {createCode = e.target.value}}></input></label>
      <Button onClick={() => props.createLobbyCallback(createCode)}>Create Lobby</Button>
      <label>Lobby Join Code:<input type='number' onChange={(e) => {joinCode = e.target.value}}></input></label>
      <Button onClick={() => props.joinLobbyCallback(joinCode)}>Join Lobby</Button>
    </>
  )
}

export default LobbyScreen