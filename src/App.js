import Game from "./components/Game";
import Menu from "./components/Menu";
import logo from "./assets/images/logo.png";


function App() {
  return (
    <div className="App">
      <img className="logo" src={logo} alt="tictactoe_logo"/>
      <Menu>
        <Game/>
      </Menu>
    </div>
  );
}

export default App;

// https://emu.edu/gaming-hub/tic-tac-toe