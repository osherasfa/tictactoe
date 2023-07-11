import React from "react";
import Game from "./components/Game";
import Menu from "./components/Menu";
import Logo from "./assets/images/Logo";
import Click from "./assets/soundEffects/clickTwo.wav"

const btnClick = new Audio(Click)

function App() {
  const [ showMenu, setShowMenu ] = React.useState(true)
  const [ picker, setPicker ] = React.useState(false)
  const [ theme, setTheme ] = React.useState({ background: "#000000", color: "#00ff00"})
  const [ music, setMusic ] = React.useState(false)

  document.documentElement.style.setProperty('--color', theme.color)
  document.documentElement.style.setProperty('--background', theme.background)

  const btnEls = document.getElementsByClassName("button")
  for (let i = 0; i < btnEls.length; i++)
    btnEls.item(i).addEventListener("click", () => btnClick.play())

  return (
    <div className="App">
        <Logo/>
        {showMenu 
          ? <Menu  
              theme={theme}
              picker={picker}
              music={music}
              openTheme={() => setPicker(prevPicker => !prevPicker)}
              changeTheme={(event) => setTheme(prevTheme => ({...prevTheme, [event.target.id]: event.target.value}))}
              activeMusic={() => setMusic(prevMusic => !prevMusic)}
              start={() => setShowMenu(false)}
            /> 
          : <Game isHistory={true} isLimited={false}/>}
    </div>
  );
}

export default App;

// https://emu.edu/gaming-hub/tic-tac-toe