import "../styles/Menu.css"
import React from "react"
import GameAudio from "../assets/images/GameAudio"
import dinoChill from "../assets/soundEffects/dino_chill.mp3"
import Linkedin from "../assets/images/Linkedin"
import Github from "../assets/images/Github"

const dinoAudio = new Audio(dinoChill)
dinoAudio.loop = true

export default function Menu({ settings, theme, music }){
  const isLimited = settings.game.limited
  const isHistory = settings.game.history
  music.isOn ? dinoAudio.play() : dinoAudio.pause()

  return (
    <div className="menu">
      <h1 onClick={settings.start} className="button">Play</h1>
      <div>
        <h1 onClick={settings.open} className="button">Settings</h1>
        { settings.on ? (
              <div className="game-options">
                <label>Versus: 
                  <h6 className={`button disabled`}>Bot</h6>
                  <h6 className={`button`}>Local</h6>
                </label>
                <label>Mode: 
                  <h6 className={`button${isLimited ? "" : " disabled"}`} onClick={() => settings.toggleGameSettings("limited", true)}>Limited</h6>
                  <h6 className={`button${isLimited ? " disabled" : ""}`} onClick={() => settings.toggleGameSettings("limited", false)}>Free</h6>
                </label>
                <label>History: 
                  <h6 className={`button${isHistory ? "" : " disabled"}`} onClick={() => settings.toggleGameSettings("history", true)}>ON</h6>
                  <h6 className={`button${isHistory ? " disabled" : ""}`} onClick={() => settings.toggleGameSettings("history", false)}>OFF</h6>
                </label>
              </div>
        ) : null }
      </div>

      <div>
        <h1 onClick={theme.open} className="button">Theme</h1>
        { theme.on ? (
              <h6 className="color-picker">
                <label>color: <input type="color" id="color" className="picker" onChange={theme.change} value={theme.color}/></label>
                <label>background: <input type="color" id="background" className="picker" onChange={theme.change}  value={theme.background}/></label>
              </h6>
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
