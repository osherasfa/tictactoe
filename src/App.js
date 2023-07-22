import "./styles/App.css"
import React from "react"
import Game from "./components/Game"
import Menu from "./components/Menu"
import Logo from "./assets/images/Logo"
import Click from "./assets/soundEffects/clickTwo.wav"
import GithubRepo from "./assets/images/GithubRepo"

const clickSound = new Audio(Click)

const setLocalItem = (item, data) => localStorage.setItem(item, JSON.stringify(data))
function getLocalStorage(item, defaultData){
  const isValidItem = localStorage.getItem(item)
  if(!isValidItem){
    setLocalItem(item, defaultData)
    return defaultData
  }

  return JSON.parse(isValidItem)
}

const localSettings = getLocalStorage('settings', {isBot: false, is4x4: true, isLimited: true, isHistory: false})
const localTheme = getLocalStorage('theme', {background: "#000000", color: "#00ff00"})

function App() {
  const [ settings, setSettings ] = React.useState({isSettings: false, isGame: false, game: localSettings})
  const [ theme, setTheme ] = React.useState({ on: false, ...localTheme})
  const [ music, setMusic ] = React.useState(false)

  document.documentElement.style.setProperty('--color', theme.color)
  document.documentElement.style.setProperty('--background', theme.background)

  const btnEls = document.getElementsByClassName("button")
  for (let i = 0; i < btnEls.length; i++){
    btnEls.item(i).addEventListener("click", () => clickSound.play())
  }

  const toggleGame = () => {
    const localTheme = {...theme}

    setSettings({...settings, isGame: !settings.isGame, on: false})
    setTheme({...theme, on:false})
    
    delete localTheme.on
    setLocalItem('theme', localTheme)
    setLocalItem('settings', settings.game)
  }
  const toggleSettings = () => setSettings({...settings, on: !settings.on})
  const toggleGameSettings = (type, mode) => setSettings({...settings, game: {...settings.game, [type]: mode}})

  const toggleTheme = () => setTheme({...theme, on: !theme.on})
  const toggleColor = (event) => setTheme({...theme, [event.target.id]: event.target.value})

  const toggleMusic = () => setMusic(!music)

  return (
    <div className="App">
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/osherasfa" className="github-corner"><GithubRepo/></a>
        <Logo className="logo button" onClick={() => settings.isGame && setSettings({...settings, isGame: false})}/>
        {settings.isGame 
          ? <Game settings={{...settings.game, size: settings.game.is4x4 ? 4 : 3, return: toggleGame, color: theme.color}}/> 
          : <Menu
              theme={{...theme, open: toggleTheme, change: toggleColor}}
              music={{isOn: music, play: toggleMusic}}
              settings={{...settings, start: toggleGame, open: toggleSettings, toggleGameSettings}}
            />
        }
    </div>
  )
}

export default App;