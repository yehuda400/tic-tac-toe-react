import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
    X: "Player 1",
    O: "Player 2",
};

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function deriveActivePlayer(gameTurns) {
    let currentPlayer = "X";

    if (gameTurns.length > 0 && gameTurns[0].player === "X") {
        currentPlayer = "O";
    }
    return currentPlayer;
}

function deriveGameBoard(gameTurns) {
    const gameBoard = INITIAL_GAME_BOARD.map((row) => [...row]);
    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
    }
    return gameBoard;
}

function deriveWinner(gameBoard, players) {
    let winner;
    for (const combination of WINNING_COMBINATIONS) {
        const firstSquare =
            gameBoard[combination[0].row][combination[0].column];
        const secondSquare =
            gameBoard[combination[1].row][combination[1].column];
        const thirdSquare =
            gameBoard[combination[2].row][combination[2].column];

        if (
            firstSquare &&
            firstSquare === secondSquare &&
            firstSquare === thirdSquare
        ) {
            winner = players[firstSquare];
        }
    }
    return winner;
}

function App() {
    const [gameTurns, setGameTurns] = useState([]);
    const [players, setPlayers] = useState(PLAYERS);

    const activePlayer = deriveActivePlayer(gameTurns);
    const gameBoard = deriveGameBoard(gameTurns);
    const winner = deriveWinner(gameBoard, players);
    const isDraw = gameTurns.length === 9 && !winner;

    function handleSelectSquare(rowIndex, ColIndex) {
        setGameTurns((prevTurns) => {
            const currentPlayer = deriveActivePlayer(prevTurns);
            const updatedTurns = [
                {
                    square: {
                        row: rowIndex,
                        col: ColIndex,
                    },
                    player: currentPlayer,
                },
                ...prevTurns,
            ];

            return updatedTurns;
        });
    }

    function handleChangePlayerName(symbol, newName) {
        setPlayers((prevPlayers) => {
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
                        initialName={PLAYERS.O}
                        symbol={"O"}
                        isActive={activePlayer === "O"}
                        onChangeName={() => handleChangePlayerName()}
                    />
                    <Player
                        initialName={PLAYERS.X}
                        symbol={"X"}
                        isActive={activePlayer === "X"}
                        onChangeName={() => handleChangePlayerName()}
                    />
                </ol>
                {(winner || isDraw) && (
                    <GameOver winner={winner} setGameTurns={setGameTurns} />
                )}
                <GameBoard
                    onSelectSquare={handleSelectSquare}
                    board={gameBoard}
                />
            </div>
            <Log turns={gameTurns} />
        </main>
    );
}

export default App;
