export default function Square({ index, symbol, drawPlayer, color}){
  return <div className="square" style={{color}} onClick={() => drawPlayer(index)}>{symbol}</div>
}