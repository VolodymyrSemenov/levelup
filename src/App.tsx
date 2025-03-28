import React from "react";
import "./App.css";

const PAGESTATE = ["SelectMove", "Results"] as const;
type PageState = (typeof PAGESTATE)[number];
const MOVES = ["Rock", "Paper", "Scissors"] as const;
type Move = (typeof MOVES)[number];
const WINNER = ["Player", "Computer", "Tie"] as const;
type Winner = (typeof WINNER)[number];

function randomMove(): Move {
  return MOVES[Math.floor(Math.random() * MOVES.length)];
}

function RestartButton({ onClick }: { onClick: () => void }) {
  return <button onClick={onClick}>Restart</button>;
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

function getWinner(
  userMove: Move | null,
  computerMove: Move | null,
): Winner | null {
  const elementBeats: Map<Move, Move[]> = new Map([
    ["Rock", ["Scissors"]],
    ["Paper", ["Rock"]],
    ["Scissors", ["Paper"]],
  ]);
  if (userMove == null || computerMove == null) {
    return null;
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
  const [pageState, setPageState] = React.useState<PageState>("SelectMove");
  const buttonHandler: (userMove: Move) => () => void = (userMove: Move) => {
    return () => {
      setComputerMove(randomMove);
      setUserMove(userMove);
      setPageState("Results");
    };
  };

  return (
    <div className="App">
      <h1>Rock Paper Scissors</h1>
      {pageState == "SelectMove" && (
        <div>
          <h2>Select Move:</h2>
          <SelectMoveButton name="Rock" onClick={buttonHandler("Rock")} />
          <SelectMoveButton name="Paper" onClick={buttonHandler("Paper")} />
          <SelectMoveButton
            name="Scissors"
            onClick={buttonHandler("Scissors")}
          />
        </div>
      )}
      {pageState == "Results" && (
        <>
          <h2>
            {getWinner(userMove, computerMove) != null &&
              `Winner:  ${getWinner(userMove, computerMove)}`}
          </h2>
          <p>{computerMove != null && `Computer's Move: ${computerMove}`}</p>
          <p>{computerMove != null && `User's Move: ${userMove}`}</p>
          <RestartButton
            onClick={() => {
              setPageState("SelectMove");
            }}
          />
        </>
      )}
    </div>
  );
}

export default App;
