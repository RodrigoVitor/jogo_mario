const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const score = document.querySelector(".score");
const reset = document.querySelector(".reset");
const cloud = document.querySelector(".cloud");
const buttonReset = document.querySelector(".reset-button");
const startButton = document.querySelector(".start-button");
const start = document.querySelector(".start");
let marioScore;
let scoreValue = 0;

//Inicie o jogo
function startGame() {
  pipe.style.animation = "PipeAnimation 1.5s infinite linear";
  cloud.style.animation = "CloudAnimation 10s infinite linear";
  start.style.visibility = "hidden";
  document.addEventListener("keydown", jump);
  marioScore = setInterval(() => {
    scoreValue++;
    score.innerHTML = scoreValue;
  }, 100);
  loop();
}

//reseta o jogo
function resetGame() {
  // 1. Reiniciar o Mario (imagem e animação)
  mario.style.animation = "";
  mario.src = "../images/mario.gif";
  mario.style.width = "150px";
  mario.style.marginLeft = "0px";
  mario.style.bottom = "0";

  // 2. Resetar o pipe
  pipe.style.left = "90%";
  pipe.style.animation = "PipeAnimation 1.5s infinite linear";

  // 3. Resetar a pontuação
  scoreValue = 0;
  score.innerHTML = scoreValue;

  clearInterval(marioScore);
  marioScore = setInterval(() => {
    scoreValue++;
    score.innerHTML = scoreValue;
  }, 100);

  reset.style.visibility = "hidden";
}

function jump() {
  mario.style.animation = "jump 1s ease-out";

  setTimeout(() => {
    mario.style.animation = "";
  }, 500);
}

//verificar se bate no pipe
function loop() {
  setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window
      .getComputedStyle(mario)
      .bottom.replace("px", "");

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
      pipe.style.animation = "none";
      pipe.style.left = `${pipePosition}px`;
      pipe.style.animation = "";

      mario.style.animation = "none";
      mario.style.bottom = `${marioPosition}px`;

      mario.src = "../images/game-over.png";
      mario.style.width = "75px";
      mario.style.marginLeft = "50px";

      reset.style.visibility = "visible";

      clearInterval(loop);
      clearInterval(marioScore);
    }
  }, 10);
}

buttonReset.addEventListener("click", resetGame);
startButton.addEventListener("click", startGame);
