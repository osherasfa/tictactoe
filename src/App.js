import "./styles/App.css"
import React from "react"
import Game from "./components/Game"
import Menu from "./components/Menu"
import Logo from "./assets/images/Logo"
import Click from "./assets/soundEffects/clickTwo.wav"

const clickSound = new Audio(Click)

function App() {
  const [ settings, setSettings ] = React.useState({on: false, gameOn: false, game:{versus: "bot", limited: true, history: true}})
  const [ theme, setTheme ] = React.useState({ on: false, background: "#000000", color: "#00ff00"})
  const [ music, setMusic ] = React.useState(false)

  document.documentElement.style.setProperty('--color', theme.color)
  document.documentElement.style.setProperty('--background', theme.background)

  const btnEls = document.getElementsByClassName("button")
  for (let i = 0; i < btnEls.length; i++){
    btnEls.item(i).addEventListener("click", () => clickSound.play())
  }

  const toggleGame = () => setSettings({...settings, gameOn: !settings.gameOn, on: false})
  const toggleSettings = () => setSettings({...settings, on: !settings.on})
  const toggleGameSettings = (type, mode) => setSettings({...settings, game: {...settings.game, [type]: mode}})

  const toggleTheme = () => setTheme({...theme, on: !theme.on})
  const toggleColor = (event) => setTheme({...theme, [event.target.id]: event.target.value})

  const toggleMusic = () => setMusic(!music)

  return (
    <div className="App">
        <Logo/>
        {settings.gameOn 
          ? <Game settings={{...settings.game, return: toggleGame}}/> 
          : <Menu
              theme={{...theme, open: toggleTheme, change: toggleColor}}
              music={{isOn: music, play: toggleMusic}}
              settings={{...settings, start: toggleGame, open: toggleSettings, toggleGameSettings}}
            />
        }
    </div>
  );
}

export default App;

// https://emu.edu/gaming-hub/tic-tac-toe