import React, { useState, useEffect, useRef } from "react"
import Board from "./Board"
import History from "./History"
import playerClick from "../assets/soundEffects/click.wav"
import errorClick from "../assets/soundEffects/error.wav"

const ON_GOING = 0, WIN = 1, DRAW = 2
const EMPTY_BOARD = Array(16).fill(null)
const EMPTY_MOVES = Array(4).fill(null)
const EMPTY_HISTORY = [{board: EMPTY_BOARD, currentPlayer: true, isDisabled: false, playersMoves: { true: EMPTY_MOVES, false: EMPTY_MOVES } }]

export default function Game(settings){
  const disableWinChecker = useRef(true)
  const [ board, setBoard ] = useState(EMPTY_BOARD)
  const [ currentPlayer, setCurrentPlayer ] = useState(true)
  const [ gameStatus, setGameStatus ] = useState(ON_GOING)
  const [playersMoves, setPlayersMoves] = useState({ true: EMPTY_MOVES, false: EMPTY_MOVES })
  const [history, setHistory] = useState(EMPTY_HISTORY)
  const [ offset, setOffset ] = useState(0)
  const symbol = currentPlayer ? "X" : "O"

  function onRestore(snapshot){
    if(!gameStatus){
      disableWinChecker.current = true
      const newHistory = history.map((snap, index) => ({...snap, isDisabled: index > snapshot.index}))    
      
      setBoard(snapshot.board)
      setCurrentPlayer(snapshot.index === 0 || !snapshot.currentPlayer)
      settings.isLimited && setPlayersMoves(snapshot.playersMoves)
      if(settings.isHistory){
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
        if(settings.isLimited)
          setPlayersMoves(newPlayersMoves)

        if(settings.isHistory){
          const newHistoryItem = {board: newBoard, currentPlayer, isDisabled: false, position: index }
          if(settings.isLimited)
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

  useEffect(() => {
    function changeGameStatus(status){
      if(status === ON_GOING)
        setCurrentPlayer(prevTurn => !prevTurn)
      else{
        setGameStatus(status)

        setTimeout(() => {
          disableWinChecker.current = true
          setBoard(EMPTY_BOARD)
          setCurrentPlayer(true)
          setGameStatus(ON_GOING)
          settings.isLimited && setPlayersMoves({ true: EMPTY_MOVES, false: EMPTY_MOVES })
          if(settings.isHistory){
            setHistory(EMPTY_HISTORY)
            setOffset(0)
          }
          
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
      disableWinChecker.current = false
    }
    else
    isWon()

  },[board, settings])

  const status =  gameStatus === WIN ? `${symbol} is the winner!` :
                  gameStatus === DRAW ? `Draw! there's no winners :(` : `${symbol}'s Turn`
  return(
    <div className="game">
      <div>
        <h1 className="turn">{status}</h1>
        <Board board={board} drawPlayer={drawPlayer}/>
      </div>
      {settings.isHistory && <History history={history} onRestore={onRestore}/>}
    </div>
  )
}