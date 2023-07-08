import React, { useState, useEffect, useRef } from "react"
import Board from "./Board"
import Snapshot from "./Snapshot"

const ON_GOING = 0, WIN = 1, DRAW = 2
const EMPTY_BOARD = Array(16).fill(null)

export default function Game(){
  const disableWinChecker = useRef(true)
  const [ board, setBoard ] = useState(EMPTY_BOARD)
  const [ currentPlayer, setCurrentPlayer ] = useState(true)
  const [ gameStatus, setGameStatus ] = useState(ON_GOING)
  const [history, setHistory] = useState([{board: EMPTY_BOARD, currentPlayer: true, isDisabled: false}])
  const [ offset, setOffset ] = useState(0)
  

  function onRestore(snapshot){
    disableWinChecker.current = true
    const newHistory = history.map((snap, index) => ({...snap, isDisabled: index > snapshot.index}))    
    
    setHistory(newHistory)
    setCurrentPlayer(snapshot.index === 0 || !snapshot.currentPlayer)
    setOffset(snapshot.index)
    setBoard(snapshot.board)
  
  }

  function drawPlayer(index){
    if(!board[index] && !gameStatus){
      disableWinChecker.current = false
      const symbol = currentPlayer ? "X" : "O"
      const newBoard = [...board]
      newBoard[index] = symbol
      const newHistory = [...history.slice(0, offset+1), {board: newBoard, currentPlayer, isDisabled: false}]

      setHistory(newHistory)
      setOffset(newHistory.length - 1)
      setBoard(newBoard)
    }
  }

  useEffect(() => {
    function changeGameStatus(status){
      if(status === ON_GOING)
        setCurrentPlayer(prevTurn => !prevTurn)
      else{
        console.log(status === WIN ? `WIN!` : `DRAW!`)

        setGameStatus(status)
        setTimeout(() => {
          disableWinChecker.current = true
          setBoard(EMPTY_BOARD)
          setCurrentPlayer(true)
          setGameStatus(ON_GOING)
        }, 2000)
      }
    }

    function isEqual(testItem, item){
      return !!testItem && testItem === item
    }

    function isWon(){
      let isRow = true, isColumn = true
      let isDiagnolRight = true, isDiagnolLeft = true
      
      for(let i = 0; i < board.length; i += 4){
        isRow = true
        isColumn = true

        for(let j = i; j < i + 4; j++){
          if(isRow && !isEqual(board[i], board[j]))
            isRow = false
          if(isColumn && !isEqual(board[i / 4], board[(j-i)*4 + i / 4]))
            isColumn = false
          if(isDiagnolRight && !(j % 5) && !isEqual(board[0], board[j]))
            isDiagnolRight = false
          if(isDiagnolLeft && (j !== 0 && j !== 15) && !(j % 3) && !isEqual(board[3], board[j]))
            isDiagnolLeft = false
        }

        if(isRow || isColumn)
          break;
      }


      if(isRow || isColumn || isDiagnolRight || isDiagnolLeft)
        changeGameStatus(WIN)
      else if(!board.includes(null))
        changeGameStatus(DRAW)
      else
        changeGameStatus(ON_GOING)
    }

    if(disableWinChecker.current){
      console.log("disableWinChecker: True -> False")
      disableWinChecker.current = false
    }
    else
    isWon()

  },[board])

  return(
    <div className="Game">
      <Board board={board} drawPlayer={drawPlayer}/>
      <h1>{`currentPlayer:${currentPlayer} | gameStatus: ${gameStatus}`}</h1>
      <h1>History
          {history.map((snap, index) => <Snapshot key={index} {...snap} index={index} onRestore={onRestore}/>)}</h1>
    </div>
  )
}