let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "x";
let gameOver = false;
const status = document.querySelector(".status");
const resetButton = document.querySelector("button");
const td = document.querySelectorAll("td");

document.querySelectorAll(".square").forEach(function (square) {
  square.addEventListener("click", handleSquareChoice);
});

function handleSquareChoice(event) {
  if (gameOver) {
    return;
  }

  const square = event.target;
  const index = square.dataset.squareIndex;

  if (board[index] !== "") {
    return;
  }

  board[index] = currentPlayer;
  square.innerHTML = currentPlayer;

  // CHECK IF THERE IS A WINNER
  //   0 1 2
  //   3 4 5
  //   6 7 8

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];

    const a = board[condition[0]];
    const b = board[condition[1]];
    const c = board[condition[2]];

    //checking the winner
    if (a === "" || b === "" || c === "") {
      continue;
    }

    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    gameOver = true;
    if (currentPlayer === "o") {
      square.className = "nought";
    } else {
      square.className = "cross";
    }
    status.innerHTML = `WINNER IS ${currentPlayer}`;
    return;
  }

  let roundDraw = !board.includes("");

  if (roundDraw) {
    gameOver = true;
    if (currentPlayer === "o") {
      square.className = "nought";
    } else {
      square.className = "cross";
    }
    status.innerHTML = "IT'S A DRAW";
    return;
  }

  //   result = condition ? value1 : value2;
  currentPlayer = currentPlayer === "x" ? "o" : "x";

  if (currentPlayer === "x") {
    square.className = "nought";
  } else {
    square.className = "cross";
  }

  resetButton.addEventListener("click", () => {
    reset();
  });

  function reset() {
    gameOver = false;
    td.forEach((square) => {
      board = ["", "", "", "", "", "", "", "", ""];
      square.innerText = "";
      status.innerHTML = "";
      square.classList.remove('nought', 'cross');
    });
  }
}
