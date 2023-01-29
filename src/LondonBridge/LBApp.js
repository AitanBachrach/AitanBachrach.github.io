import React, {useState} from "react"
import { Button } from "react-bootstrap"
import LobbyScreen from "./LobbyScreen"
import WaitingScreen from "./WaitingScreen"
import GameScreen from "./GameScreen"

const baseURL = 'http://localhost:5001'

var lobbyCode = 0
var playerNumber = 0

const LondonBridge = () =>{
  const [game, setGame] = useState(null)

  const prepareCreateLobby = (createCode) => {
    lobbyCode = createCode
    sendMessage(baseURL+'/london-bridge/lobby/'+lobbyCode, 'POST', handleJoin)
    console.log(game)
  }

  const prepareJoinLobby = (joinCode) => {
    lobbyCode = joinCode
    sendMessage(baseURL+'/london-bridge/lobby/'+joinCode, 'PUT', handleJoin)
    console.log(game)
  }

  const prepareUpdate = () => {
    sendMessage(baseURL+'/london-bridge/'+lobbyCode, 'GET', handleUpdate)
  }

  const prepareStateChange = (newState) => {
    sendMessage(baseURL+'/london-bridge/'+lobbyCode, 'GET', (jsonData) => {
      jsonData.data.players[playerNumber].state = newState
      sendMessage(baseURL+'/london-bridge/'+lobbyCode, 'PUT', handleUpdate, jsonData)
    })
  }

  const prepareDiscard = (game) => {
    sendMessage(baseURL+'/london-bridge/'+lobbyCode, 'GET', (jsonData) => {
      jsonData.data = game
      sendMessage(baseURL+'/london-bridge/'+lobbyCode, 'PUT', handleUpdate, jsonData)
    })
  }

  const prepareWin = () => {
    sendMessage(baseURL+'/london-bridge/'+lobbyCode, 'GET', (jsonData) => {
      jsonData.data.phase = 'ending'
      jsonData.data.players[jsonData.data.turnPlayer].hand = []
      sendMessage(baseURL+'/london-bridge/'+lobbyCode, 'PUT', handleUpdate, jsonData)
    })
  }

  const sendMessage = (url, methodType, afterFunction, body) =>{
    var content = JSON.stringify(body)
    fetch(url, {method:methodType, body:content, headers: {"Content-type": "application/json; charset=UTF-8"}}).then((response) =>{
      if (response.status === 200){
        return response.json()
      }
      else {
        throw console.error("HTTP error:" + response.status + ":" +  response.statusText); 
      }
    })
    .then((jsonOutput) => {
      afterFunction(jsonOutput)
    })
    .catch((error) => {console.error(error);})
  }

  const handleJoin = (jsonData) => {
    playerNumber = (jsonData['data']['players'].length-1)
    console.log(playerNumber, typeof playerNumber)
    setGame(jsonData['data'])
  }

  const handleUpdate = (jsonData) =>{
    setGame(jsonData['data'])
    console.log(jsonData['data'])
  }

  const updateWithoutSend = (game) =>{
    if(game.players[game.turnPlayer].hand.length <= 1){
      prepareWin()
    }
    else{
      setGame(game)
    }
  }

  return (
    <>
    <h1>LondonBridge</h1>
    {!game ? <LobbyScreen createLobbyCallback={prepareCreateLobby} joinLobbyCallback={prepareJoinLobby}/> : <></>}
    {(game && game['phase'] === 'starting') ? <WaitingScreen game={game} lobbyCode={lobbyCode}/> : <></>}
    {(game && (game['phase'] === 'drawing' || game['phase'] === 'discarding')) ? 
    <GameScreen playerNumber={playerNumber} game={game} changeStateCallback={prepareStateChange} discardCallback={prepareDiscard} updateWithoutSend={updateWithoutSend}/> : <></>}
    {(game) ? <Button onClick={prepareUpdate}>Refresh Game</Button>: <></>}
    </>
  )
}


  
export default LondonBridge;