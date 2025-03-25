import React from "react";
import "./App.css";

type Move = "Rock" | "Paper" | "Scissors";

const moveOptions: Move[] = ["Rock", "Paper", "Scissors"];

function randomMove(): Move {
  return moveOptions[Math.floor(Math.random() * 3)];
}

function App() {
  const [computerMove, setComputerMove] = React.useState<Move>(randomMove);

  return <div className="App">{computerMove}</div>;
}

export default App;
