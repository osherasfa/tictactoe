export default function Snapshot(snapshot){ 
  const { index, currentPlayer, isDisabled, playersMoves, onRestore } = snapshot
  const symbol = currentPlayer ? "X" : "O"
  const move = !index ? `game start` : `${symbol} move [${playersMoves[currentPlayer][3]}]`
  const disableClass = isDisabled ? " disabled" : ""

  // console.log(playersMoves[currentPlayer][3])
  return(
    <div className={`snapshot${disableClass}`} id={index} onClick={() => onRestore(snapshot)}>{`#${index}: ${move}`}</div>
  )
}

Snapshot.defaultProps = { isDisabled: false }