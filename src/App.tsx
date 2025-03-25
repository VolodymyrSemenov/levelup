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
  const [userMove, setUserMove] = React.useState<Move | null>(null);
  const buttonHandler: (userMove: Move) => void = (userMove: Move) => {
    setComputerMove(randomMove);
    setUserMove(userMove);
  };

  return (
    <div className="App">
      <div>
        Select Move:
        <MoveSelectButton
          name="Rock"
          handler={() => {
            buttonHandler("Rock");
          }}
        />
        <MoveSelectButton
          name="Paper"
          handler={() => {
            buttonHandler("Paper");
          }}
        />
        <MoveSelectButton
          name="Scissors"
          handler={() => {
            buttonHandler("Scissors");
          }}
        />
      </div>

      <div>
        {computerMove !== null ? `Computer's Move: ${computerMove}` : ""}
      </div>
      <div>{userMove !== null ? `User's Move: ${userMove}` : ""}</div>
    </div>
  );
}

export default App;
