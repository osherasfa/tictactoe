export default function Square({ index, symbol, drawPlayer}){

  return(
    <div className="square" onClick={() => drawPlayer(index)}>{symbol}</div>
  )
}