export default function Snapshot(snapshot){ 
  console.log(snapshot)
  const move = !snapshot.index ? `game start` : `move #${snapshot.index}: ${snapshot.currentPlayer}`
  const disableClass = snapshot.isDisabled ? " disabled" : ""

  return(
    <div className={`snapshot${disableClass}`} id={snapshot.index} onClick={() => snapshot.onRestore(snapshot)}>Go to {move}</div>
  )
}

Snapshot.defaultProps = { playersPositions: { true: [], false: [] },  isDisabled: false }