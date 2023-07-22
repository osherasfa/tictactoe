import "../styles/Menu.css"
import React from "react"
import GameAudio from "../assets/images/GameAudio"
import dinoChill from "../assets/soundEffects/dino_chill.mp3"
import Linkedin from "../assets/images/Linkedin"
import GithubLogo from "../assets/images/GithubLogo"

const dinoAudio = new Audio(dinoChill)
dinoAudio.loop = true

export default function Menu({ settings, theme, music }){
  music.isOn ? dinoAudio.play() : dinoAudio.pause()
  const hashNames = { isBot: ["Versus", "Bot", "Local"], is4x4: ["Size", "4x4", "3x3"], isLimited: ["Mode", "Limited", "Free"], isHistory: ["History", "ON", "OFF"] }

  let gameSettingsHTML = []
  for (const [key, value] of Object.entries(settings.game)) {
    gameSettingsHTML.push(
      <label key={key}>{`${hashNames[key][0]}:`} 
        <h6 className={`button${value ? "" : " disabled"}`} onClick={() => settings.toggleGameSettings(key, true)}>{hashNames[key][1]}</h6>
        <h6 className={`button${value ? " disabled" : ""}`} onClick={() => settings.toggleGameSettings(key, false)}>{hashNames[key][2]}</h6>
      </label>
    )
  }

  return (
    <div className="menu">
      <h1 onClick={settings.start} className="button">Play</h1>

      <h1 onClick={settings.open} className="button">Settings</h1>
      { settings.on ? <div className="game-options">{ gameSettingsHTML }</div> : null }

      <h1 onClick={theme.open} className="button">Theme</h1>
      {theme.on 
        ? <h6 className="color-picker">
            <label>color: <input type="color" id="color" className="picker" onChange={theme.change} value={theme.color}/></label>
            <label>background: <input type="color" id="background" className="picker" onChange={theme.change}  value={theme.background}/></label>
          </h6>
        : null 
      }

      <GameAudio className="button" onClick={music.play}  music={music.isOn}/>
      
      <div className="links">
        <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/osher-asefa-b919b020b/"><Linkedin className="button"/></a>
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/osherasfa"><GithubLogo className="button"/></a>
      </div>
    </div>
  )
}