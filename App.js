//confiti import

const canvas = document.getElementById("my-canvas");
const jsConfetti = new JSConfetti();

let highScore = 0;
let scorPlayerO = 0;
let scorPlayerX = 0;
let gameEnds = false;
let currentPlayer;

const resetButton = document.getElementById("reset");
const landing = document.getElementById("landing"); // page 1
const starting = document.getElementById("starting"); // page 2
const userName1 = document.getElementById("username1");
const userName2 = document.getElementById("username2");
const scoreO = document.getElementById("score-O");
const scoreX = document.getElementById("score-X");
const redUser = document.getElementById("redUser");
const greenUser = document.getElementById("greenUser");
const scoreTag = document.getElementById("scoreTag");

scoreTag.innerText =
  localStorage.getItem("highScore") == null
    ? 0
    : localStorage.getItem("highScore");
starting.style.display = "none";

const boardSize = 20;
const totalBoxes = boardSize * boardSize;
const board = Array(totalBoxes).fill("");

function toggleVisibility() {
  if (
    (userName1.value && userName2.value) === "" ||
    (userName1.value.length && userName2.value.length) <= 4
  ) {
    Swal.fire("Please fill the username first to be at 4 characters");
  } else {
    runTheGame();
  }
}

function runTheGame() {
  if (landing.style.display === "block") {
    landing.style.display = "none";
  }
  if (starting.style.display === "none") {
    starting.style.display = "block";
    landing.style.display = "none";
  }
  localStorage.setItem("user_name1", userName1.value);
  localStorage.setItem("user_name2", userName2.value);

  document.getElementById("placeName1").innerText =
    localStorage.getItem("user_name1");
  document.getElementById("placeName2").innerText =
    localStorage.getItem("user_name2");

  const boxContainer = document.createElement("div");
  boxContainer.style.display = "grid";
  boxContainer.style.justifyContent = "center";
  boxContainer.style.gridTemplateColumns = "repeat(20, 40px)";
  boxContainer.style.gridAutoRows = "40px";

  for (let i = 0; i < totalBoxes; i++) {
    const box = document.createElement("div");
    currentPlayer = "X";

    box.setAttribute("id", i);

    box.addEventListener("click", function (event) {
      if (gameEnds == false) {
        if (event.target.textContent === "") {
          const index = parseInt(event.target.id);

          box.style.backgroundColor = "#90EE90";
          event.target.textContent = currentPlayer;
          board[index] = currentPlayer;

          if (currentPlayer === "X") {
            checkWin(currentPlayer);
            box.style.backgroundColor = "#FF6347";
            currentPlayer = "O";
          } else {
            checkWin(currentPlayer);
            currentPlayer = "X";
          }
        }
      }
    });
    box.style.border = "2px solid white";
    box.setAttribute("class", "box");
    box.style.borderRadius = "10px";
    boxContainer.appendChild(box);
  }

  document.getElementById("game").appendChild(boxContainer);
}

function checkWin(symbol) {
  const lengthToWin = 5;
  for (let row = 0; row < 20; row++) {
    let count = 0;
    for (let col = 0; col < 20; col++) {
      const index = row * 20 + col;
      if (board[index] === symbol) {
        count++;
        if (count === lengthToWin) {
          gameEnds = true;
          jsConfetti.addConfetti({
            emojis: ["⭐", "✨", "💫", "⭐"],
          });
          Swal.fire(`the user ${symbol} wins `);
          if (symbol == "O") {
            scorPlayerO++;
            scoreO.innerText = scorPlayerO;
          } else if (symbol == "X") {
            scorPlayerX++;
            scoreX.innerText = scorPlayerX;
          }
          storHighScore();
        }
      } else {
        count = 0;
      }
    }
  }

  for (let col = 0; col < 20; col++) {
    let count = 0;
    for (let row = 0; row < 20; row++) {
      const index = row * 20 + col;
      if (board[index] === symbol) {
        count++;
        if (count === lengthToWin) {
          gameEnds = true;
          jsConfetti.addConfetti({
            emojis: ["⭐", "✨", "💫", "⭐"],
          });
          Swal.fire(`the user ${symbol} wins `);

          if (symbol == "O") {
            scorPlayerO++;
            scoreO.innerText = scorPlayerO;
          } else if (symbol == "X") {
            scorPlayerX++;
            scoreX.innerText = scorPlayerX;
          }
          storHighScore();
        }
      } else {
        count = 0;
      }
    }
  }

  for (let row = 0; row < 16; row++) {
    for (let col = 0; col < 16; col++) {
      let count = 0;
      for (let i = 0; i < lengthToWin; i++) {
        const index = (row + i) * 20 + (col + i);
        if (board[index] === symbol) {
          count++;
          if (count === lengthToWin) {
            gameEnds = true;
            jsConfetti.addConfetti({
              emojis: ["⭐", "✨", "💫", "⭐"],
            });
            Swal.fire(`the user ${symbol} wins `);

            if (symbol == "O") {
              scorPlayerO++;
              scoreO.innerText = scorPlayerO;
            } else if (symbol == "X") {
              scorPlayerX++;
              scoreX.innerText = scorPlayerX;
            }
            storHighScore();
          }
        } else {
          break;
        }
      }
    }
  }

  for (let row = 0; row < 16; row++) {
    for (let col = 19; col > 3; col--) {
      let count = 0;
      for (let i = 0; i < lengthToWin; i++) {
        const index = (row + i) * 20 + (col - i);
        if (board[index] === symbol) {
          count++;
          if (count === lengthToWin) {
            gameEnds = true;
            jsConfetti.addConfetti({
              emojis: ["⭐", "✨", "💫", "⭐"],
            });

            Swal.fire(`the user ${symbol} wins `);

            if (symbol == "O") {
              scorPlayerO++;
              scoreO.innerText = scorPlayerO;
            } else if (symbol == "X") {
              scorPlayerX++;
              scoreX.innerText = scorPlayerX;
            }
            storHighScore();
          }
        } else {
          break;
        }
      }
    }
  }
}

//stor the highest score in the game in local storage
function storHighScore() {
  if (gameEnds) {
    if (scorPlayerO > scorPlayerX) {
      highScore = scorPlayerO;
      scoreTag.innerHTML = highScore;
      localStorage.setItem("highScore", highScore);
    } else {
      highScore = scorPlayerX;
      scoreTag.innerHTML = highScore;
      localStorage.setItem("highScore", highScore);
    }
  }
}

//reset to play anither round
function reset() {

  if(highScore != 0 ){
  document.getElementById("scoreTag").innerText =
    localStorage.getItem("highScore");
  board.fill("");
  const boxes = document.getElementsByClassName("box");
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].textContent = "";
    boxes[i].style.backgroundColor = "";
  }
  gameEnds = false;
}
}

resetButton.addEventListener("click", reset);
