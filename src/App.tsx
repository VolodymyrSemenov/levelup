import React from "react";
import "./App.css";

const MOVES = ["Rock", "Paper", "Scissors"] as const;
type Move = (typeof MOVES)[number];

function randomMove(): Move {
  return MOVES[Math.floor(Math.random() * MOVES.length)];
}

function SelectMoveButton({
  name,
  onClick,
}: {
  name: Move;
  onClick: () => void;
}) {
  return <button onClick={onClick}>{name}</button>;
}

function App() {
  const [computerMove, setComputerMove] = React.useState<Move | null>(null);
  const [userMove, setUserMove] = React.useState<Move | null>(null);
  const buttonHandler: (userMove: Move) => ()=>void = (userMove: Move) => {
    return () => {
      setComputerMove(randomMove);
      setUserMove(userMove);
    }
  };

  return (
    <div className="App">
      <div>
        Select Move:
        <SelectMoveButton
          name="Rock"
          onClick={buttonHandler("Rock")}
        />
        <SelectMoveButton
          name="Paper"
          onClick={buttonHandler("Paper")}
        />
        <SelectMoveButton
          name="Scissors"
          onClick={buttonHandler("Scissors")}
        />
      </div>

      <div>{computerMove != null && `Computer's Move: ${computerMove}`}</div>
      <div>{computerMove != null && `User's Move: ${userMove}`}</div>
    </div>
  );
}

export default App;
