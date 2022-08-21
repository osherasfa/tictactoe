import React from 'react';
import './App.css';
import TicTacToe from './components/TicTacToe';
import playerOneImg from './images/player1.png';
import playerTwoImg from './images/player2.png';

export default function App() {
  const [gameBoard, setGameBoard] = React.useState(Array(3).fill(Array(3).fill(0)))
  const [isPlayerOne, setIsPlayerOne] = React.useState(true)
  const [isWon, setIsWon] = React.useState(false)
  const [isDraw, setIsDraw] = React.useState(false)
  const [players, setPlayers] = React.useState([])

  React.useEffect(() => {
    setPlayers([createPlayer('osher', playerOneImg, 1), createPlayer('matan', playerTwoImg, 2)])
  },[])

  React.useEffect(() => {
    if(isPlayerWon()){
      setIsWon(true)
      setIsPlayerOne(oldPlayer => !oldPlayer)
    }
    if(isGameDraw()){
      setIsDraw(true)
      setIsPlayerOne(oldPlayer => !oldPlayer)
    }
  }, [gameBoard])

  function createPlayer(name, img, identifier){
    return {name: name, img: img, identifier: identifier}
  }

  function compareVals(arr){
    return arr.every(item => arr[0] === item && item !== 0)
  }

  function isGameDraw(){
    return gameBoard.every(rows => rows.every(item => item !== 0))
  }

  function isPlayerWon(){
    let isWon = false
    let col1 = [], col2 = [], col3 = []
    let row1 = gameBoard[0], row2 = gameBoard[1], row3 = gameBoard[2]
    let dia1 = [], dia2 = []
    let startCounter = 0, endCounter = 2

    gameBoard.map(rows => {
      col1.push(rows[0]) 
      col2.push(rows[1])
      col3.push(rows[2])
      dia1.push(rows[startCounter])
      dia2.push(rows[endCounter])
      startCounter += 1
      endCounter -= 1
    })

    isWon = compareVals(row1) || compareVals(row2) || compareVals(row3)
        ||  compareVals(col1) || compareVals(col2) || compareVals(col3)
        ||  compareVals(dia1) || compareVals(dia2)

    return isWon
  }

  function playTurn(rowIndx, itemIndx, identifier){
    let isNext = false
    const newBoard = gameBoard.map((rows, rowIndex) =>
      rowIndex === rowIndx 
        ? rows.map((item, itemIndex) => {
          if(item === 0 && itemIndex === itemIndx){
            isNext = true
            return identifier
          }
          return item
        })
        : rows)

    if(isNext){
      setGameBoard(newBoard)
      setIsPlayerOne(oldPlayer => !oldPlayer)
    }
  }

  return (
      <TicTacToe players={players}
                 gameBoard={gameBoard}
                 isWon={isWon} 
                 isDraw={isDraw} 
                 isPlayerOne={isPlayerOne} 
                 playTurn={playTurn}/>
  );
}

