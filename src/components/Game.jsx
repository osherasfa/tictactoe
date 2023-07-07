import React, { useState, useEffect, useRef } from "react"
import Board from "./Board"
import Snapshot from "./Snapshot"

const ON_GOING = 0, WIN = 1, DRAW = 2
const EMPTY_BOARD = Array(16).fill(null)

function makeSnapshot(index, board, currentPlayer, onRestore){
  const snapshot = { index, board, currentPlayer, onRestore }        

  return <Snapshot key={index} {...snapshot}/>
}

export default function Game(){
  const disableWinChecker = useRef(true)
  const [ board, setBoard ] = useState(EMPTY_BOARD)
  const [ currentPlayer, setCurrentPlayer ] = useState(true)
  const [ gameStatus, setGameStatus ] = useState(ON_GOING)
  const [ history, setHistory ] = useState([makeSnapshot(0, EMPTY_BOARD, true, onRestore)])
  const [ offset, setOffset ] = useState(0)

  //React.cloneElement(snapItem, { isDisabled: index > snapshot.index})

  function onRestore(snapshot){
    setHistory(prevHistory => prevHistory.map((snapItem, index) =>  {
        let isDisabled = false
        disableWinChecker.current = true

        if(index > snapshot.index){
          isDisabled = true
        }
        else{
          if(index === snapshot.index){
            setCurrentPlayer(snapshot.currentPlayer)
          }
          setBoard(snapshot.board)
        }

        return React.cloneElement(snapItem, { isDisabled})
    }))
  }

  function drawPlayer(index){
    if(!board[index] && !gameStatus){
      const symbol = currentPlayer ? "X" : "O"
      const newBoard = Object.assign([...board], {[index]: symbol})
      const nextMove = makeSnapshot(history.length, newBoard, currentPlayer, onRestore)

      setHistory(prevHistory => ([...prevHistory, nextMove]))
      setOffset(history.length + 1)
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
          // setHistory([makeSnapshot(0, EMPTY_BOARD, true, onRestore)])
          // setHistoryOffset(1)
        }, 2000)
      }
    }

    function isEqual(testItem, item){
      if(!!testItem && testItem === item)
        return true
      return false
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

    if(disableWinChecker.current)
      disableWinChecker.current = false
    else
      isWon()

  },[board])

  return(
    <div className="Game">
      <Board board={board} drawPlayer={drawPlayer}/>
      <h1>{`currentPlayer:${currentPlayer} | gameStatus: ${gameStatus}`}</h1>
      <h1>History: { history.map(snapshot => snapshot) } </h1>
    </div>
  )
}