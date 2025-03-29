import React from "react";
import "./App.css";

const PAGESTATE = ["SelectMove", "Results"] as const;
type PageState = (typeof PAGESTATE)[number];

const MOVES = ["Rock", "Paper", "Scissors"] as const;
type Move = (typeof MOVES)[number];

const RESULTSOPTIONS = ["Player", "Computer", "Tie"] as const;
type ResultOptions = (typeof RESULTSOPTIONS)[number];

type Results = {
  Player: number;
  Computer: number;
  Tie: number;
};

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

const elementBeats: Record<Move, Move[]> = {
  Rock: ["Scissors"],
  Paper: ["Rock"],
  Scissors: ["Paper"],
};

function getWinner(
  userMove: Move | null,
  computerMove: Move | null,
): ResultOptions | null {
  if (userMove === null || computerMove === null) {
    return null;
  }
  if (elementBeats[userMove]?.includes(computerMove)) {
    return "Player";
  }
  if (elementBeats[computerMove]?.includes(userMove)) {
    return "Computer";
  }
  return "Tie";
}

function App() {
  const [computerMove, setComputerMove] = React.useState<Move | null>(null);
  const [userMove, setUserMove] = React.useState<Move | null>(null);
  const [pageState, setPageState] = React.useState<PageState>("SelectMove");
  const [gameResults, setGameResults] = React.useState<Results>({
    Player: 0,
    Computer: 0,
    Tie: 0,
  });
  const buttonHandler: (userMove: Move) => () => void =
    (userMove: Move) => () => {
      const computerMove = randomMove();
      setComputerMove(computerMove);
      setUserMove(userMove);

      const winner: ResultOptions = getWinner(userMove, computerMove) ?? "Tie";
      setGameResults({ ...gameResults, [winner]: gameResults[winner] + 1 });
      setPageState("Results");
    };

  return (
    <div className="App">
      <h1>Rock Paper Scissors</h1>
      {pageState === "SelectMove" && (
        <>
          <h2>Select Move:</h2>
          <div className="ButtonDiv">
            <SelectMoveButton name="Rock" onClick={buttonHandler("Rock")} />
            <SelectMoveButton name="Paper" onClick={buttonHandler("Paper")} />
            <SelectMoveButton
              name="Scissors"
              onClick={buttonHandler("Scissors")}
            />
          </div>
        </>
      )}
      {pageState === "Results" && (
        <>
          <h2>
            {getWinner(userMove, computerMove)! +
              (getWinner(userMove, computerMove) === "Tie" ? "" : " Wins")}
          </h2>
          <p>
            {`User's Move: ${userMove}`} &nbsp;|&nbsp;{" "}
            {`Computer's Move: ${computerMove}`}
          </p>
          <p>{`Wins: ${gameResults["Player"]} | Losses: ${gameResults["Computer"]} | Draws: ${gameResults["Tie"]}`}</p>
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
