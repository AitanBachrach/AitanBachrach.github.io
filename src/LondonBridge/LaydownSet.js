import React from 'react';


const suits = {'spades' : '\u2660', 'hearts' : '\u2665', 'clubs' : '\u2663', 'diamonds' : '\u2666'}

function LaydownSet(props){

  function makeCard(card){
    return (
      <>[{card.number}{suits[card.suit]}]</>
    )
  }

  const makeCardsInSet = () => {
    var elements = []
    for (var card of props.set){
      elements.push(makeCard(card))
    }
    return(<p>{elements}</p>)
  }

  function handleSetLaydown(event){
    props.set.push(props.hand.splice(event.target.value, 1)[0])
    props.updateCallback(props.hand)
  }

  const makeDropDown = () => {
    var elements = []
    elements.push(<option value='base'>Select to lay down</option>)
    for (var card in props.hand){
      //if there are no card in the set and the card isnt a wild
      if (props.set.length === 0 && props.hand[card].number >= 3){
        elements.push(<option value={card}>{makeCard(props.hand[card])}</option>)
      }
      //if the first card in the set and the analyzed card have matching numbers
      else if (props.set.length>0 && props.set[0].number === props.hand[card].number){
        elements.push(<option value={card}>{makeCard(props.hand[card])}</option>)
      }
      //if the card is a wild and wouldnt make the set more then half wild
      else if (props.hand[card].number <= 2 && props.set.length > 0){
        var count = 0
        for (var setCard of props.set){
          count = (setCard.number<=2) ? count+1: count
        }
        if (count<=(props.set.length+1)/2){
          elements.push(<option value={card}>{makeCard(props.hand[card])}</option>)
        }
      }
    }
    return (
    <select name="Discard Selection" onChange={handleSetLaydown} defaultValue='base'>
      {elements}
    </select>
    )
  }

  return (
    <>
    <p>Set of 3</p>
    {props.set.length>=3 ?  <></> : <p>Is not a valid set</p>}
    {makeCardsInSet()}
    {makeDropDown()}
    </>
  )


}

export default LaydownSet

//
//
//