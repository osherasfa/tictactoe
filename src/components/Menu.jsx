import React from "react";
import GameAudio from "../assets/images/GameAudio"
import dinoChill from "../assets/soundEffects/dino_chill.mp3"

const dinoAudio = new Audio(dinoChill)
dinoAudio.loop = true

export default function Menu({ start, theme, picker, music, openTheme, changeTheme, activeMusic }){
  const isDottedTheme = theme.background.includes("url")
  music ? dinoAudio.play() : dinoAudio.pause()

  return (
    <div className="menu">
      <h1 onClick={start} className="button">Play</h1>
      <h1 onClick={openTheme} className="button" style={picker ? {marginBottom: "0"} : null }>Theme</h1>

      { picker ? (
            <div>
              <h5 className={`button${isDottedTheme ? "" : " disabled"}`}><span style={{fontSize: "8px"}}>(under development)</span><br/>dotted</h5>
              <h5 className={`button${isDottedTheme ? " disabled" : ""}`}>8-bit</h5>

              <div id="picker-container">
                <label>color: <input type="color" id="color" className="picker" onChange={changeTheme} value={theme.color}/> &nbsp;</label>
                <label>background: <input type="color" id="background" className="picker" onChange={changeTheme}  value={theme.background}/></label>
              </div>


            </div>
      ) : null }

      <h1 className="button"> <GameAudio onClick={activeMusic}  music={music}/> </h1>
    </div>
  );
}

