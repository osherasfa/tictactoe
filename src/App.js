import Game from "./components/Game";
import logo from "./assets/logo.png"

function App() {
  return (
    <div className="App">
      <img className="logo" src={logo} alt="tictactoe_logo"/>
      <Game/>
    </div>
  );
}

export default App;

// https://emu.edu/gaming-hub/tic-tac-toe