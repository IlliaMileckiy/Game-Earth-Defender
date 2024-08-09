//Page
const page = document.querySelector(".page");

//Game
const game = document.querySelector(".game");

//Choose Time PreGame
const firstPage = document.querySelector(".choose-time");
const divScore = document.querySelector(".result-score");
const maxScore = document.querySelector(".max-score");

//ButtonsOfTime
const btnFast = document.querySelector(".btn-fast");
const btnMedium = document.querySelector(".btn-medium");
const btnLong = document.querySelector(".btn-long");

//Points, Timer, Lifes
const timer = document.querySelector(".timer");
const points = document.querySelector(".points");
const lifes = document.querySelector(".lifes");

//Playground, blocks
const playground = document.querySelector(".playground");

//Scores
const scores = document.querySelector(".scores");
const scoreBlockTitle = document.querySelector(".score-block-title");
const arrOfScore = [];



//Blocks
//Create and Spawn Block
function createBlock() {
    const block = document.createElement("div");
    block.className = "block";
    return block;
}
function spawnBlock(block) {
    let innerWidthPlayground = playground.clientWidth;

    block.style = `
    top: ${Math.round(Math.random() * 56)}%;
    left: ${Math.round(Math.random() * (innerWidthPlayground - 150))}px;
    `;
    playground.append(block);
}

//Destroy Block and Create Round
function destroyBlock(block, res) {
    block.addEventListener("click", (event) => {
        event.stopPropagation();
        block.className += " block-dis";
        points.textContent = +points.textContent + 10;
        setTimeout(() => {
            block.remove()
            res()
        }, 400);
    });
}
function createRounds() {
    new Promise((res) => {
        const block = createBlock();
        spawnBlock(block);
        destroyBlock(block, res);
    }).then(() => createRounds());
}


//Health
//Add and Remove Hearts
function addHearts() {
    for(let i = 0; i < 3; i++) {
        const heart = document.createElement("img");
        heart.className = "heart";
        heart.src = "./img/heart.png";
        lifes.insertAdjacentElement("afterbegin", heart);
    }
}
function removeHeart() {
    playground.addEventListener("click", (event) => {
        if(!lifes.firstElementChild) {
            return;
        }
        event.preventDefault();
        lifes.firstElementChild.remove();
    })
}

removeHeart();

//Timer
function createTimer(ms) {
    let convertTime = ms / 1000;
    let intervalId = setInterval(() => {
        if(!lifes.firstElementChild) {
            clearInterval(intervalId);
            stopGame();
            return;
        } else if(convertTime === 0) {
            clearInterval(intervalId);
            stopGame();
            return;
        }
        timer.textContent = `${--convertTime}sec`;
    }, 1000);
}


//GAME RUN & STOP
//CreatePage
function createPage() {
    firstPage.remove();
    addHearts();
    scores.innerHTML = "";
    divScore.innerHTML = "";
    maxScore.innerHTML = "";
    createRounds();
} 

//Run Game
function runGame(ms) {
    createPage();
    createTimer(ms);
}

//Stop Game
function stopGame() {
    page.append(firstPage);
    arrOfScore.push(points.textContent);
    arrOfScore.sort((a, b) => a - b);
    scoreBlockTitle.textContent = "Scores: ";
    for(let score of arrOfScore) {
        let h1 = document.createElement("h1");
        h1.textContent = score;
        scores.append(h1);
    }
    maxScore.textContent = "MaxScore: " + arrOfScore[arrOfScore.length - 1];
    playground.innerHTML = "";
    lifes.innerHTML = "";
    divScore.textContent = points.textContent;
    points.textContent = 0;
}

//Create Event To Time Btn
function chooseTimeAndRun() {
    btnFast.addEventListener("click", () => runGame(5000));
    btnMedium.addEventListener("click", () => runGame(10000));
    btnLong.addEventListener("click", () => runGame(20000));
}
chooseTimeAndRun()