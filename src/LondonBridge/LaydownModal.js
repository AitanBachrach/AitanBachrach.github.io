import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import LaydownSet from './LaydownSet';
import { Modal } from 'react-bootstrap';

const rounds = [
  {},
  {'runs': 0, 'length': 0,'sets' : 2}, 
  {'runs': 1, 'length': 4,'sets' : 1},
  {'runs': 2, 'length': 4,'sets' : 0},
  {'runs': 0, 'length': 0,'sets' : 3},
  {'runs': 1, 'length': 7,'sets' : 1},
  {'runs': 1, 'length': 5,'sets' : 2},
  {'runs': 3, 'length': 4,'sets' : 0},
  {'runs': 1, 'length': 10,'sets' : 1},
  {'runs': 1, 'length': 5,'sets' : 3},
  {'runs': 3, 'length': 5,'sets' : 0}
]

function LaydownModal(props){
  const [game, modGame] = useState(JSON.parse(JSON.stringify(props.game)))
  const [renderedPlayer, changePlayer] = useState(game.turnPlayer)

  const wasUpdate = () => {
    modGame({...game})
  }

  const layDownWindows = () => {
    if (game.players[renderedPlayer].sets.length === 0 && rounds[game.round].sets>0){
      game.players[renderedPlayer].sets.push([], [])
      modGame(game)
    }
    var elements = []
    for (var x = 0; x<rounds[game.round].sets; x++){
      elements.push(<LaydownSet hand={game.players[game.turnPlayer].hand} set={game.players[renderedPlayer].sets[x]} updateCallback={wasUpdate}/>)
    }
    return elements
  }

  const layDownSave = () => {
    props.layDownCallback(game)
    props.handleModalToggle()
  }

  const playerDropDown = () => {
    var elements = []
    for (var player in game.players){
        elements.push(<option value={player} disabled={!hasLaidDown(game.players[player])}>{player === game.turnPlayer ? <>You</>: <>Player {player}</>}</option>)
    }
    return (
      <select value={renderedPlayer} onChange={(event) => {changePlayer(event.target.value)}}>
        {elements}
      </select>
    )
  }

  const hasLaidDown = (player) => {
    return (player.hand.length < 11)
  }
  
  return (
    <>
    <Modal.Header closeButton>
      <Modal.Title>Hand {game.round} | {rounds[game.round].runs} run(s) of {rounds[game.round].length} | {rounds[game.round].sets} sets of 3</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {playerDropDown()}
      {layDownWindows()}
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={layDownSave}>Save</Button>
    </Modal.Footer>
    </>
  )


}

export default LaydownModal