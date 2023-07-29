import playerClick from "../assets/soundEffects/click.wav"
import errorClick from "../assets/soundEffects/error.wav"
import Board from "./Board"
import History from "./History"
import "../styles/Game.css"
import chroma from "chroma-js"
import React, { useState, useEffect, useRef } from "react"


// eslint-disable-next-line
const EMPTY_TRACKER = (size, palette) => [...Array(size)].reduce((moves, _, i) => (moves[` ${-(i+1)}`] = palette[i], moves), {});
const EMPTY_BOARD = size => Array(size*size).fill(null)
const ON_GOING = 0, WIN = 1, DRAW = 2

const errorSound = new Audio(errorClick), clickSound = new Audio(playerClick)

export default function Game({settings}){ 
  const { isBot, size, isLimited, isHistory, color } = settings
  const colorPalette = chroma.scale([color, chroma(color).brighten(2)]).colors(size)

  const checkWin = useRef(true)
  const [ board, setBoard ] = useState(EMPTY_BOARD(size))
  const [ currentPlayer, setCurrentPlayer ] = useState(true)
  const [ gameStatus, setGameStatus ] = useState(ON_GOING)
  const [tracker, setTacker] = useState({ true: EMPTY_TRACKER(size, colorPalette), false: EMPTY_TRACKER(size, colorPalette) })

  const [history, setHistory] = useState([{board, currentPlayer, isDisabled: false, tracker}])
  const [ offset, setOffset ] = useState(0)
  const symbol = currentPlayer ? "X" : "O"

  function onRestore(snapshot){
    if(!gameStatus){
      checkWin.current = true
      const newHistory = history.map((snap, index) => ({...snap, isDisabled: index > snapshot.index}))
      
      setBoard(snapshot.board)
      setCurrentPlayer(snapshot.index === 0 || !snapshot.currentPlayer)
      isLimited && setTacker(snapshot.tracker)
      if(isHistory){
        setHistory(newHistory)
        setOffset(snapshot.index)
      }
    }
  }

  function drawPlayer(index){
    if(!gameStatus){
      if(!board[index]){
        checkWin.current = false
        const newBoard = [...board]
        newBoard[index] = symbol
        
        setBoard(newBoard)
        
        const playerTracker = {...tracker[currentPlayer]}
        let oldestIndx = Object.keys(playerTracker)[0]

        playerTracker[` ${index}`] = playerTracker[oldestIndx]
        delete playerTracker[oldestIndx]

        oldestIndx = parseInt(oldestIndx) // ' oldestIndx' str -> oldestIndx int

        if(oldestIndx > -1)
          newBoard[oldestIndx] = null

        const newtracker = {...tracker, [currentPlayer]: playerTracker }
        if(isLimited)
          setTacker(newtracker)

        if(isHistory){
          const newHistoryItem = {board: newBoard, currentPlayer, isDisabled: false, position: index }
          if(isLimited)
            newHistoryItem["tracker"] = newtracker

          const newHistory = [...history.slice(0, offset+1), newHistoryItem]
          setHistory(newHistory)
          setOffset(newHistory.length - 1)
        }
        clickSound.play()
      }
      else
        errorSound.play()
    }
  }

  function checkWinner(currentBoard) {
    const size = Math.sqrt(currentBoard.length)
    let isRow = true, isColumn = true
    let isDiagonalRight = true, isDiagonalLeft = true
    const isEqual = (itemOne, itemTwo) => !!itemOne && itemOne === itemTwo
  
    for (let i = 0; i < size; i++) {
      isRow = true
      isColumn = true
  
      for (let j = 0; j < size; j++) {
        if (isRow && !isEqual(currentBoard[i * size], currentBoard[i * size + j]))
          isRow = false
        
        if (isColumn && !isEqual(currentBoard[i], currentBoard[j * size + i]))
          isColumn = false
      }
  
      if (isRow || isColumn)
        return true
  
      if (isDiagonalRight && !isEqual(currentBoard[0], currentBoard[i * size + i]))
        isDiagonalRight = false
  
      if (isDiagonalLeft && !isEqual(currentBoard[size - 1], currentBoard[(i + 1) * size - 1 - i])) 
        isDiagonalLeft = false
    }
  
    return isDiagonalRight || isDiagonalLeft
  }
  

  useEffect(() => {
    function compPlay(){
      const newBoard = [...board]
      let bestScore = -Infinity, bestMove = null
      let alpha = -Infinity, beta = Infinity

      for(let i = 0; i < newBoard.length; i++){
        if(!newBoard[i]){
          newBoard[i] = "O"
          let score = minimax(newBoard, 2, alpha, beta, false)[0]
          newBoard[i] = null
          if (score > bestScore) {
            bestScore = score
            bestMove = i
          }
          alpha = Math.max(alpha, score)
          if(beta <= alpha)
            break
        }
      }
      
      return bestMove
    }

    function minimax(currentBoard, depth, alpha, beta, isMaximizing){
      if(checkWinner(currentBoard) || depth === 0)
        return isMaximizing ? [-1, null] : [1, null]

      if(!currentBoard.includes(null))
        return [0, null]

      if(isMaximizing){
        let bestScore = -Infinity
        let bestMove = null

        for(let i = 0; i < currentBoard.length; i++){
          if(!currentBoard[i]){
            currentBoard[i] = "O"
            let score = minimax(currentBoard, depth - 1, alpha, beta, false)[0]
            currentBoard[i] = null
            if (score > bestScore) {
              bestScore = score
              bestMove = i
            }
            alpha = Math.max(alpha, score)
            if(beta <= alpha)
              break
          }
        }
        return [bestScore, bestMove]
      }
      else{
        let bestScore = Infinity
        let bestMove = null

        for(let i = 0; i < currentBoard.length; i++){
          if(!currentBoard[i]){
            currentBoard[i] = "X"
            let score = minimax(currentBoard, depth - 1, alpha, beta, true)[0]
            currentBoard[i] = null
            if (score < bestScore) {
              bestScore = score
              bestMove = i
            }
            beta = Math.min(beta, score)
            if(beta <= alpha)
              break
          }
        }
        return [bestScore, bestMove]
      }
    }

    if(!currentPlayer && isBot){
      let index
      if(!board.includes('O')){
        do {
          console.log(board.length)
          index = Math.floor(Math.random() * board.length)
        } while (board[index] !== null)
      }
      else
        index = compPlay()

      drawPlayer(index)
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
          checkWin.current = true
          setBoard(EMPTY_BOARD(size))
          setCurrentPlayer(true)
          setGameStatus(ON_GOING)
          isLimited && setTacker({ true: EMPTY_TRACKER(size, colorPalette), false: EMPTY_TRACKER(size, colorPalette) })
          if(isHistory){
            setHistory([history[0]])
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

    if(checkWin.current){
      checkWin.current = false
    }
    else
      isWon()
    // eslint-disable-next-line
  },[board])

  const status =  gameStatus === WIN ? `${symbol} is the winner!` :
                  gameStatus === DRAW ? `Draw! there's no winners.` : `${symbol}'s Turn.`
  return(
    <>
      <p className="return button" onClick={settings.return}>Return</p>
      <div className="game">
        <div>
          <h1 className="turn">{status}</h1>
          <Board board={board} size={size} drawPlayer={drawPlayer} tracker={isLimited ? tracker : null}/>
        </div>
        {isHistory && <History history={history} onRestore={onRestore} isBot={isBot}/>}
      </div>
    </>
  )
}