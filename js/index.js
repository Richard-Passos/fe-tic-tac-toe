/* Pegando objetos para manipular */
const form = document.getElementById("form");
const boardBlocks = document.querySelectorAll(".blocks");

/* variávies para os jogadores */
const playerTurn = document.getElementById("playerToPlay");
let player1;
let player2;

/* Seção para anunciar o ganhador */
const sectionWinner = document.getElementById("sectionWinner");

/* Botão para iniciar o jogo */
const btnSubmit = form.querySelector("#btnSubmit");
btnSubmit.addEventListener("click", startGame);

/* Turno atual */
let turn = "X";

/* Combinações para a vitória */
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


function startGame(ev = "") {
  if(ev != "") {
    ev.preventDefault();
  }

  const player1Name = form.querySelector("#player1Name").value;
  const player2Name = form.querySelector("#player2Name").value;

  if (player1Name == "" || player2Name == "") {
    alert("Preencha os campos de nome!");
  } else {
    btnSubmit.disabled = true;

    const divToRemove = document.getElementById("blocked");
    if(divToRemove) {
      divToRemove.remove()
    }

    player1 = player1Name;
    player2 = player2Name;
    playerTurn.innerText = player1;

    boardBlocks.forEach((block) => {
      block.removeEventListener("click", handleClick);
      block.addEventListener("click", handleClick, { once: true });
    });
  }
}

function handleClick(ev) {
  ev.target.innerText = turn;

  const isWin = checkForWin();
  const isDraw = checkForDraw();
  if(isWin) {
    endGame()
  } else if (isDraw) {
    endGame(true)
  } else {
    turn === "X" ? (turn = "O") : (turn = "X");
    playerTurn.innerText = playerTurn.innerText == player1 ? player2 : player1;
  }
}

function checkForWin() {
  return winningCombinations.some((combination) => {
    return combination.every((i) => {
      return boardBlocks[i].innerText == turn;
    });
  });
}

function checkForDraw() {
  return [...boardBlocks].every(block => {
    return block.innerText == "X" || block.innerText == "O";
  })
}

function endGame(isDraw = false) {
  const winnerParagraph = document.getElementById("winner");
  if (!isDraw) {
    winnerParagraph.innerText = `Jogador ${
      turn == "X" ? player1 : player2
    } venceu!`;
  } else {
    winnerParagraph.innerText = "Empate!";
  }

  sectionWinner.style.display = "flex";
}

const btnRestart = document.getElementById("btnRestart");
btnRestart.addEventListener("click", () => {
  sectionWinner.style.display = "none";

  boardBlocks.forEach(block => {
    block.innerText = ""
  })

  turn = "X"
  playerTurn.innerText = player1

  startGame()
})