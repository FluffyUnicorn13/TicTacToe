document.addEventListener("DOMContentLoaded", function() {
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let isGameOver = false;
    let gameMode = "pvp";

    function handleCellClick(index) {
        if (gameBoard[index] === "" && !isGameOver) {
            gameBoard[index] = currentPlayer;
            document.getElementById(`cell${index}`).textContent = currentPlayer;

            if (checkWin()) {
                alert(`${currentPlayer} wins!`);
                isGameOver = true;
                document.getElementById("playAgainBtn").style.display = "inline-block";
                return;
            }

            if (gameBoard.every(cell => cell !== "")) {
                alert("It's a tie!");
                isGameOver = true;
                document.getElementById("playAgainBtn").style.display = "inline-block";
                return;
            }

            currentPlayer = currentPlayer === "X" ? "O" : "X";
            document.getElementById("turn").textContent = `It is ${currentPlayer}'s turn`;

            if (gameMode === "pvc" && currentPlayer === "O" && !isGameOver) {
                computerMove();
            }
        }
    }

    function checkWin() {
        const winningCombination = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winningCombination.some(combination => {
            const [a, b, c] = combination;
            return gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
        });
    }

    function computerMove() {
        const emptyCells = gameBoard.map((cell, index) => cell === "" ? index : null).filter(index => index !== null);
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        handleCellClick(randomIndex);
    }

    function restartGame() {
        currentPlayer = "X";
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        isGameOver = false;
        document.getElementById("turn").textContent = "It is X's turn";

        for (let i = 0; i < 9; i++) {
            document.getElementById(`cell${i}`).textContent = "";
        }

        document.getElementById("playAgainBtn").style.display = "none";
    }

    function playAgain() {
        restartGame();
    }

    document.getElementById("startBtn").addEventListener("click", () => {
        restartGame();
    });

    document.getElementById("playAgainBtn").addEventListener("click", () => {
        playAgain();
    });

    document.getElementById("pvp").addEventListener("change", () => {
        gameMode = "pvp";
    });

    document.getElementById("pvc").addEventListener("change", () => {
        gameMode = "pvc";
    });

    for (let i = 0; i < 9; i++) {
        document.getElementById(`cell${i}`).addEventListener("click", () => handleCellClick(i));
    }
});
