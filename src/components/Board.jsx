import "../styles/Board.css"
import { useEffect } from "react"
import Square from "./Square"

export default function Board({ board, size, drawPlayer, tracker }){
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
      { board.map((symbol, index) => {
        const currentSymbol = symbol === 'X'
        const color = (!!tracker && ` ${index}` in tracker[currentSymbol] && symbol) ? tracker[currentSymbol][` ${index}`] : null

        return <Square key={index} {...{index, symbol, drawPlayer, color}}/>
      }) }
    </div>
  )
}