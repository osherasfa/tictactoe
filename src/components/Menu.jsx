import "../styles/Menu.css"
import React from "react"
import GameAudio from "../assets/images/GameAudio"
import dinoChill from "../assets/soundEffects/dino_chill.mp3"
import Linkedin from "../assets/images/Linkedin"
import Github from "../assets/images/Github"

const dinoAudio = new Audio(dinoChill)
dinoAudio.loop = true

export default function Menu({ settings, theme, music }){
  const isDottedTheme = theme.background.includes("url")
  const isLimited = settings.game.limited
  music.isOn ? dinoAudio.play() : dinoAudio.pause()

  return (
    <div className="menu">
      <h1 onClick={settings.start} className="button">Play</h1>
      <div>
        <h1 onClick={settings.open} className="button">Settings</h1>

        { settings.on ? (
              <div className="game-options">
                <label>Mode: 
                  <h6 className={`button${isLimited ? "" : " disabled"}`} onClick={() => settings.toggleLimited(true)}>4-limit</h6>
                  <h6 className={`button${isLimited ? " disabled" : ""}`} onClick={() => settings.toggleLimited(false)}>Free-style</h6>
                </label>
              </div>
        ) : null }

      </div>

      <div>
        <h1 onClick={theme.open} className="button">Theme</h1>
        { theme.on ? (
              <div>
                <h5 className={`button${isDottedTheme ? "" : " disabled"}`}>
                  <span style={{fontSize: ".5rem"}}>(under development)</span>
                  <br/>
                  dotted
                </h5>

                <h5 className={`button${isDottedTheme ? " disabled" : ""}`}>8-bit</h5>
                <h6 className="color-picker">
                  <label>color: <input type="color" id="color" className="picker" onChange={theme.change} value={theme.color}/></label>
                  <label>background: <input type="color" id="background" className="picker" onChange={theme.change}  value={theme.background}/></label>
                </h6>
              </div>
        ) : null }
      </div>

      <GameAudio className="button" onClick={music.play}  music={music.isOn}/>
      <div className="links">
        <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/osher-asefa-b919b020b/"><Linkedin className="button"/></a>
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/osherasfa"><Github className="button"/></a>
      </div>
    </div>
  );
}
