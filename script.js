// creating an array with elements
let array = [null, null, null, null, null, null, null, null, null];

// players
let player1 = "X";
let player2 = "O";
let currentPlayer = player1;
let gameOver = false;

// function to print the array in a 3x3 format
function printBoard() {
  for (let i = 0; i < 9; i += 3) {
    let row = array.slice(i, i + 3);
    console.log(row.map(cell => cell === null ? "-" : cell).join(" "));
  }
}

// function to make a move
function makeMove(index) {
    if (gameOver) {
      return;
    }
  if (array[index] === null) {
    array[index] = currentPlayer;
    document.querySelector(`[data-index="${index}"]`).textContent = currentPlayer;

    printBoard();

    if (checkWinner()) { // loops through them
      updateStatus(`Player ${currentPlayer} wins!`);
      gameOver = true;
      return;
    }

    // switch turn inside the function
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }

    updateStatus(`Player ${currentPlayer}'s turn`);

  } else {
    console.log("That spot is already taken.");
  }
}

// array in a array for all of the winning combos
let winningCombos = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal
  [2, 4, 6]  // diagonal
];

// checking the winner
function checkWinner() {
  for (let combo of winningCombos) {
    let [a, b, c] = combo;

    if (
      array[a] !== null &&
      array[a] === array[b] &&
      array[a] === array[c]
    ) {
      console.log(array[a] + " wins!");
      return true;
    }
  }

  return false;
}

// allign the 9 cells and sends the index to game function 
let cells = document.querySelectorAll(".cell");

cells.forEach(function(cell) {
  cell.addEventListener("click", function() {
    let index = cell.dataset.index;
    makeMove(Number(index));
  });
});

// updating the player status function
function updateStatus(message) {
  let status = document.getElementById("status");
  status.textContent = message;
}

// button to make a new game
function newGame() {
  array = [null, null, null, null, null, null, null, null, null];
  currentPlayer = player1;
  gameOver = false;

  cells.forEach(function(cell) {
    cell.textContent = "";
  });

  updateStatus(`Player ${currentPlayer}'s turn`);
}

document.getElementById("new-game").addEventListener("click", newGame); 

// starting message
updateStatus(`Player ${currentPlayer}'s turn`);