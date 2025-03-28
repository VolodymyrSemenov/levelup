import React from "react";
import "./App.css";

const MOVES = ["Rock", "Paper", "Scissors"] as const;
type Move = (typeof MOVES)[number];
const WINNER = ["Player", "Computer", "Tie"] as const;
type Winner = (typeof WINNER)[number];

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

function getWinner(userMove: Move|null, computerMove: Move|null): Winner|null {
  const elementBeats: Map<Move, Move[]> = new Map([
    ["Rock", ["Scissors"]],
    ["Paper", ["Rock"]],
    ["Scissors", ["Paper"]],
  ]);
  if(userMove == null || computerMove == null) {
    return null
  }
  if (elementBeats.get(userMove)?.includes(computerMove)) {
    return "Player";
  }
  if (elementBeats.get(computerMove)?.includes(userMove)) {
    return "Computer";
  }
  return "Tie";
}

function App() {
  const [computerMove, setComputerMove] = React.useState<Move | null>(null);
  const [userMove, setUserMove] = React.useState<Move | null>(null);
  const buttonHandler: (userMove: Move) => () => void = (userMove: Move) => {
    return () => {
      setComputerMove(randomMove);
      setUserMove(userMove);
    };
  };

  return (
    <div className="App">
      <div>
        Select Move:
        <SelectMoveButton name="Rock" onClick={buttonHandler("Rock")} />
        <SelectMoveButton name="Paper" onClick={buttonHandler("Paper")} />
        <SelectMoveButton name="Scissors" onClick={buttonHandler("Scissors")} />
      </div>

      <div>{computerMove != null && `Computer's Move: ${computerMove}`}</div>
      <div>{computerMove != null && `User's Move: ${userMove}`}</div>
      <div>{getWinner(userMove, computerMove) != null && `Winner:  ${getWinner(userMove, computerMove)}`}</div>
    </div>
  );
}

export default App;
