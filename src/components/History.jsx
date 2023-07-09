import Snapshot from "./Snapshot"
import arrowDown from "../assets/arrow_down.png"

export default function History({history, onRestore}){
  return(
    <div className="history">
      <h1 className="title">History</h1>
      <h2>Click to go back <img src={arrowDown} alt="arrow down" /></h2>
      <h1 className="container">
        {history.map((snap, index) => <Snapshot key={index} {...snap} index={index} onRestore={onRestore}/>)}
      </h1>
    </div>
  )
}