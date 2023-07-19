import "../styles/Game.css";
import React, { useState, useEffect, useRef, useMemo } from "react"
import Board from "./Board"
import History from "./History"

import playerClick from "../assets/soundEffects/click.wav"
import errorClick from "../assets/soundEffects/error.wav"

const ON_GOING = 0, WIN = 1, DRAW = 2
const EMPTY_BOARD = size => Array(size*size).fill(null)
const EMPTY_MOVES = Array(4).fill(null)
const EMPTY_HISTORY = size => [{board: EMPTY_BOARD(size), currentPlayer: true, isDisabled: false, playersMoves: { true: EMPTY_MOVES, false: EMPTY_MOVES } }]

export default function Game({settings}){
  const { size } = settings
  const disableWinChecker = useRef(true)
  const [ board, setBoard ] = useState(EMPTY_BOARD(size))
  const [ currentPlayer, setCurrentPlayer ] = useState(true)
  const [ gameStatus, setGameStatus ] = useState(ON_GOING)
  const [playersMoves, setPlayersMoves] = useState({ true: EMPTY_MOVES, false: EMPTY_MOVES })
  const [history, setHistory] = useState(EMPTY_HISTORY(size))
  const [ offset, setOffset ] = useState(0)
  const symbol = currentPlayer ? "X" : "O"

  function onRestore(snapshot){
    if(!gameStatus){
      disableWinChecker.current = true
      const newHistory = history.map((snap, index) => ({...snap, isDisabled: index > snapshot.index}))    
      
      setBoard(snapshot.board)
      setCurrentPlayer(snapshot.index === 0 || !snapshot.currentPlayer)
      settings.limited && setPlayersMoves(snapshot.playersMoves)
      if(settings.history){
        setHistory(newHistory)
        setOffset(snapshot.index)
      }
    }
  }

  function drawPlayer(index){
    if(!gameStatus){
      let audio
      if(!board[index]){
        audio = new Audio(playerClick)
        disableWinChecker.current = false
        const newBoard = [...board]
        newBoard[index] = symbol
        
        setBoard(newBoard)
        
        const  currentPlayerMoves = [...playersMoves[currentPlayer]]
        const lastMove = currentPlayerMoves.shift()
        currentPlayerMoves.push(index)
        if(lastMove !== null)
          newBoard[lastMove] = null

        const newPlayersMoves = {...playersMoves, [currentPlayer]: currentPlayerMoves }
        if(settings.limited)
          setPlayersMoves(newPlayersMoves)

        if(settings.history){
          const newHistoryItem = {board: newBoard, currentPlayer, isDisabled: false, position: index }
          if(settings.limited)
            newHistoryItem["playersMoves"] = newPlayersMoves

          const newHistory = [...history.slice(0, offset+1), newHistoryItem]
          setHistory(newHistory)
          setOffset(newHistory.length - 1)
        }
      }
      else
        audio = new Audio(errorClick)
      audio.play()
    }
  }

  function isEqual(testItem, item){
    return !!testItem && testItem === item
  }

  function checkWinner(currentBoard){
    let isRow = true, isColumn = true
    let isDiagnolRight = true, isDiagnolLeft = true
    const size = Math.sqrt(currentBoard.length)
    let line = []
    const vboard = []
    
    for(let i = 0; i < currentBoard.length; i += size){
      isRow = true
      isColumn = true

      for(let j = i; j < i + size; j++){
        if(isRow && !isEqual(currentBoard[i], currentBoard[j]))
          isRow = false
        if(isColumn && !isEqual(currentBoard[i / size], currentBoard[(j-i)*size + i / size]))
          isColumn = false
        if(isDiagnolRight && !(j % (size+1)) && !isEqual(currentBoard[0], currentBoard[j]))
          isDiagnolRight = false
        if(isDiagnolLeft && (j !== 0 && j !== (size*size-1)) && !(j % (size-1)) && !isEqual(currentBoard[size-1], currentBoard[j]))
          isDiagnolLeft = false
        
      }

      if(isRow || isColumn)
        break;
    }

    for(let i = 0; i < currentBoard.length; i += size){
      for(let j = i; j < i + size; j++){
        line.push(currentBoard[j])
      }
      vboard.push(line)
      line = []
    }

    console.log(vboard)
    return isRow || isColumn || isDiagnolRight || isDiagnolLeft
  }

  useMemo(() => {
    function bestMove(){
      const newBoard = [...board]
      const counter = newBoard.filter(square => square === "O").length
      
      return counter > 1 ? minimax(newBoard, 0, true) : Math.floor(Math.random() * newBoard.length)
    }

    // Add trecking to position
    function minimax(currentBoard, depth, isMaximizing){
      if(checkWinner(currentBoard)){
        console.log("WINNER")
        return isMaximizing ? 1 : -1
      }
      else if(!currentBoard.includes(null)){
        console.log("DRAW")
        return 0
      }

      if(isMaximizing){
        let bestScore = -Infinity
        for(let i = 0; i < currentBoard.length; i++){
          if(!currentBoard[i]){
            currentBoard[i] = "O"
            let score = minimax(currentBoard, depth + 1, false)
            currentBoard[i] = null
            bestScore = Math.max(bestScore, score)
          }
        }
        return bestScore
      }
      else{
        let bestScore = Infinity
        for(let i = 0; i < currentBoard.length; i++){
          if(!currentBoard[i]){
            currentBoard[i] = "X"
            let score = minimax(currentBoard, depth + 1, true)
            currentBoard[i] = null
            bestScore = Math.min(bestScore, score)
          }
        }
        return bestScore
      }
    }

    if(!currentPlayer && settings.versus){
      drawPlayer(bestMove())
    }
    // eslint-disable-next-line
  }, [currentPlayer])



  useEffect(() => {
    function changeGameStatus(status){
      if(status === ON_GOING)
        setCurrentPlayer(prevTurn => !prevTurn)
      else{
        setGameStatus(status)

        setTimeout(() => {
          disableWinChecker.current = true
          setBoard(EMPTY_BOARD(size))
          setCurrentPlayer(true)
          setGameStatus(ON_GOING)
          settings.limited && setPlayersMoves({ true: EMPTY_MOVES, false: EMPTY_MOVES })
          if(settings.history){
            setHistory(EMPTY_HISTORY(size))
            setOffset(0)
          }
          
        }, 2000)
      }
    }

    function isWon(){
      if(checkWinner(board))
        changeGameStatus(WIN)
      else if(!board.includes(null))
        changeGameStatus(DRAW)
      else
        changeGameStatus(ON_GOING)
    }

    if(disableWinChecker.current){
      disableWinChecker.current = false
    }
    else
      isWon()
    // eslint-disable-next-line
  },[board, settings])

  const status =  gameStatus === WIN ? `${symbol} is the winner!` :
                  gameStatus === DRAW ? `Draw! there's no winners.` : `${symbol}'s Turn.`
  return(
    <>
      <p className="return button" onClick={settings.return}>Return</p>
      <div className="game">
        <div>
          <h1 className="turn">{status}</h1>
          <Board board={board} size={size} drawPlayer={drawPlayer}/>
        </div>
        {settings.history && <History history={history} onRestore={onRestore}/>}
      </div>
    </>
  )
}