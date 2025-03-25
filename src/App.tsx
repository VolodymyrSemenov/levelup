import React from "react";
import "./App.css";

type Move = "Rock" | "Paper" | "Scissors";

const moveOptions: Move[] = ["Rock", "Paper", "Scissors"];

function randomMove(): Move {
  return moveOptions[Math.floor(Math.random() * 3)];
}

function MoveSelectButton({
  name,
  handler,
}: {
  name: string;
  handler: () => void;
}) {
  return <button onClick={handler}>{name}</button>;
}

function App() {
  const [computerMove, setComputerMove] = React.useState<Move | null>(null);

  const buttonHandler: () => void = () => {
    setComputerMove(randomMove);
  };

  return (
    <div className="App">
      <div>
        Select Move:
        <MoveSelectButton name="Rock" handler={buttonHandler} />
        <MoveSelectButton name="Paper" handler={buttonHandler} />
        <MoveSelectButton name="Scissors" handler={buttonHandler} />
      </div>

      <div>{computerMove !== null ? `Computer Move: ${computerMove}` : ""}</div>
      <div>User Move:   </div>
    </div>
  );
}

export default App;
