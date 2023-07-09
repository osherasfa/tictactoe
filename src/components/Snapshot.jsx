export default function Snapshot(snapshot){ 
  const { index, currentPlayer, isDisabled, position, onRestore } = snapshot
  const symbol = currentPlayer ? "X" : "O"
  const move = !index ? `game start` : `${symbol} move ${convert2D(position)}`
  const disableClass = isDisabled ? " disabled" : ""

  function convert2D(position){
    const x = position%4
    const y = (position - x) / 4
    return `[${x + 1}, ${y + 1}]`
  }

  return(
    <div className={`snapshot${disableClass}`} id={index} onClick={() => onRestore(snapshot)}>{`#${index}: ${move}`}</div>
  )
}

Snapshot.defaultProps = { isDisabled: false }