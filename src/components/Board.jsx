import "../styles/Board.css"
import { useEffect } from "react"
import Square from "./Square"

export default function Board({ board, size, drawPlayer }){
  useEffect(() => {
    const rightSquares = document.querySelectorAll(`.square:nth-child(${size}n)`)
    const bottomSquares = document.querySelectorAll(`.square:nth-child(n+${size*size-size+1})`)

    for(const item of rightSquares)
      item.style.borderRight = "none"

    for(const item of bottomSquares)
      item.style.borderBottom = "none"
  }, [size])

  return(
    <div className="board" style={{gridTemplate: `repeat(${size}, 1fr) / repeat(${size}, 1fr)`}}>
      { board.map((symbol, index) => (
      <Square key={index} {...{index, symbol, drawPlayer}}/>
      ))}
    </div>
  )
}

