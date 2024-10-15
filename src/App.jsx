import { useState } from "react";
import Player from "./components/Players";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
const PLAYERS = {
  X: "player 1",
  O: "player 2",
};
const INTIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function deriveCurrentPlayer(gameTurn) {
  let currentPlayer = "X";
  if (gameTurn.length > 0 && gameTurn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function deriveWinner(gameBoard, players) {
  let winner = null;
  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol =
      gameBoard[combinations[1].row][combinations[1].column];
    const thirdsquareSymbol =
      gameBoard[combinations[2].row][combinations[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdsquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}
function deriveGameBoard(gameTurn) {
  let gameBoard = [...INTIAL_GAME_BOARD.map((array) => [...array])];
  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}
function App() {
  const [players, setplayers] = useState(PLAYERS);
  const [gameTurn, setGameTurn] = useState([]);
  const activePlayer = deriveCurrentPlayer(gameTurn);
  const gameBoard = deriveGameBoard(gameTurn);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurn.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurn((preveTurn) => {
      const currentPlayer = deriveCurrentPlayer(preveTurn);
      const updateTurn = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...preveTurn,
      ];
      return updateTurn;
    });
  }
  function handleGameOver() {
    setGameTurn([]);
  }
  function handlechangename(symbol, newName) {
    setplayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            intailname={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlechangename}
          />
          <Player
            intailname={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlechangename}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleGameOver} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurn} />
    </main>
  );
}

export default App;
