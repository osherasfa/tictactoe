import React from "react";
// import dinoChill from "./assets/dino_chill.mp3"

export default function Menu({children}){
  // const audio = new Audio(dinoChill)
  const [ showMenu, setShowMenu ] = React.useState(true)
  return (
    <div className="menu">
      {showMenu ? <h1 onClick={() => setShowMenu(false)}>Menu</h1> : React.Children.map(children, child => React.cloneElement(child, { isHistory: true, isLimited: false }))}
    </div>
  );
}

