import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import LaydownModal from './LaydownModal';
import { Modal } from 'react-bootstrap';

const suits = {'spades' : '\u2660', 'hearts' : '\u2665', 'clubs' : '\u2663', 'diamonds' : '\u2666'}
var discardCard = 0

function GameScreen(props){

  const [showModal, setShow] = useState(false);

  const handleModalToggle = () => setShow(!showModal);

  function otherPlayer(number, player){
    return (
      <>
        <h1>Player {number}</h1><br/>
        <p>{player.hand.length} cards in hand | {player.state} | {player.score}</p>
      </>
    )
  }

  function selfPlayer(player){
    return(
      <>
        <h1>You</h1>
        <p>{player.hand.length} cards in hand | {player.state} | {player.score}</p>
        <p>{makeHand(player.hand)}</p>
      </>
    )
  }

  function makeHand(hand){
    var elements = []
    for (var card of hand){
      elements.push(makeCard(card))
    }
    return elements
  }

  function players(){
    var elements = []
    for (var number in props.game.players){
      if (parseInt(number) === props.playerNumber){
        elements.push(selfPlayer(props.game.players[number]))
      }
      else {
        elements.push(otherPlayer(number, props.game.players[number]))
      }
    }
    return(elements)
  }

  function makeCard(card){
    return (
      <>[{card.number}{suits[card.suit]}]</>
    )
  }

  function deckAndDiscard(){
    return (
      <>
      <p>Deck : []</p>
      {props.game.discard.length>0 ? <p>Discard : {makeCard(props.game.discard.at(-1))}</p> : <p>Discard : []</p>}
      <p>{props.game.phase}</p>
      </>
    )
  }

  function options(){
    var state = props.game.players[props.playerNumber].state
    if (state === "waiting"){
      return (<p>Waiting for other players</p>)
    }
    else if (state === "want"){
      return (<p>Wants, Waiting for other players</p>)
    }
    else if (state === "buying" || state === "pickup"){
      return(
        <>
        <Button onClick={() => props.changeStateCallback("want")}>Want</Button>
        <Button onClick={() => props.changeStateCallback("waiting")}>Don't Want</Button>
        </>
      )
    }
    else if (state === "discarding"){
      return(
        <>
        <select name="Discard Selection" onChange={handleDiscardChange}>
          {discardDropdown(props.game.players[props.playerNumber].hand)}
        </select>
        <Button onClick={() => {
          props.game.discard.push(props.game.players[props.playerNumber].hand.splice(Number(discardCard), 1)[0])
          props.discardCallback(props.game)
        }}>Discard</Button>
        <Button onClick={handleModalToggle}>Laydown</Button>
        </>
      )
    }
  }

  function handleDiscardChange(event){
    discardCard=event.target.value
    console.log(discardCard)
  }

  function discardDropdown(hand){
    var elements = []
    for (var card in hand){
      elements.push(<option value={card}>{makeCard(hand[card])}</option>)
    }
    return elements
  }
  


  return (
    <>
      {deckAndDiscard()}
      {players()}
      {options()}
      <Modal show={showModal} onHide={handleModalToggle}>
        <LaydownModal game={props.game} layDownCallback={props.updateWithoutSend} handleModalToggle={handleModalToggle}/>
      </Modal>
    </>
  )
}

export default GameScreen