import "../styles/History.css"
import Snapshot from "./Snapshot"
import ArrowDown from "../assets/images/ArrowDown"

export default function History({history, ...restProps}){
  return(
    <div className="history">
      <h1 className="title">History</h1>
      <h1>Click to go back <ArrowDown /></h1>
      <h1 className="container">
        {history.map((snap, index) => <Snapshot key={index} {...snap} index={index} {...restProps}/>)}
      </h1>
    </div>
  )
}