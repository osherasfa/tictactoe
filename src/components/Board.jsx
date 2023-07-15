import "../styles/Board.css"
import React from "react"
import Square from "./Square"

export default function Board({ board, drawPlayer }){
  return(
    <div className="board">
      { board.map((symbol, index) => (
      <Square key={index} {...{index, symbol, drawPlayer}}/>
      ))}
    </div>
  )
}

