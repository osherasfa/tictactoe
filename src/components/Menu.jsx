import React from "react";
import Game from "./Game"
// import dinoChill from "./assets/dino_chill.mp3"

function hexToHue(hexColor) {
  hexColor = hexColor.replace('#', '');

  // Convert hexadecimal to RGB values
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  // Normalize RGB values to range [0, 1]
  const normalizedR = r / 255;
  const normalizedG = g / 255;
  const normalizedB = b / 255;

  // Find the maximum and minimum RGB values
  const max = Math.max(normalizedR, normalizedG, normalizedB);
  const min = Math.min(normalizedR, normalizedG, normalizedB);

  // Calculate the hue
  let hue;
  if (max === min)
    hue = 0; // achromatic (gray)
  else {
    var delta = max - min;
    // eslint-disable-next-line
    switch (max) {
      case normalizedR:
        hue = (normalizedG - normalizedB) / delta + (normalizedG < normalizedB ? 6 : 0);
        break;
      case normalizedG:
        hue = (normalizedB - normalizedR) / delta + 2;
        break;
      case normalizedB:
        hue = (normalizedR - normalizedG) / delta + 4;
        break;
    }
    hue /= 6;
  }

  // Convert hue to degrees (0-360)
  hue *= 360;

  // Round hue value to two decimal places
  hue = Math.round(hue * 100) / 100;

  return hue;
}


const theme = { background: "black", color: "#00ff00"}

const hue = hexToHue(theme.color)
theme["secondary"] = `hsl(${hue}, 100%, 30%)`
theme["tertiary"] = `hsl(${hue}, 100%, 80%)`

export default function Menu(){
  const [ showMenu, setShowMenu ] = React.useState(true)
  // const audio = new Audio(dinoChill)
  document.documentElement.style.setProperty('--color', theme.color)
  document.documentElement.style.setProperty('--background', theme.background)
  document.documentElement.style.setProperty('--color-secondary', theme.secondary)
  document.documentElement.style.setProperty('--color-tertiary', theme.tertiary)

  return (
    <div className="menu">
      {showMenu ? <h1 className="button" onClick={() => setShowMenu(false)}>Menu</h1> : <Game isHistory={true} isLimited={false}/>}
    </div>
  );
}

