import "../styles/Menu.css"
import React from "react"
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
      <div>
        <h1 onClick={openTheme} className="button">Theme</h1>

        { picker ? (
              <div>
                <h5 className={`button${isDottedTheme ? "" : " disabled"}`}>
                  <span style={{fontSize: ".5rem"}}>(under development)</span>
                  <br/>
                  dotted
                </h5>

                <h5 className={`button${isDottedTheme ? " disabled" : ""}`}>8-bit</h5>
                <h6 className="color-picker">
                  <label>color: <input type="color" id="color" className="picker" onChange={changeTheme} value={theme.color}/></label>
                  <label>background: <input type="color" id="background" className="picker" onChange={changeTheme}  value={theme.background}/></label>
                </h6>


              </div>
        ) : null }
      </div>

      <h1 className="button"> <GameAudio onClick={activeMusic}  music={music}/> </h1>
    </div>
  );
}
// &nbsp;
