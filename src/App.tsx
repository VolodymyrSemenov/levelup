import React from "react";
import "./App.css";

type Move = "Rock" | "Paper" | "Scissors";

const moveOptions: Move[] = ["Rock", "Paper", "Scissors"];

function randomMove(): Move {
  return moveOptions[Math.floor(Math.random() * 3)];
}

function MoveSelectButton({name}: { name: string }) {
  return <button>{name}</button>;
}

function App() {
  const [computerMove, setComputerMove] = React.useState<Move>(randomMove);

  return (
    <div className="App">
      <div>Computer Move: {computerMove}</div>
      <div>
        Select Move:
        <MoveSelectButton name="Rock" />
        <MoveSelectButton name="Paper" />
        <MoveSelectButton name="Scissors" />
      </div>
    </div>
  );
}

export default App;
