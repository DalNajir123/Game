let inputDir = { x: 0, y: 0 };
const foodsound = new Audio('music/foodsound.mp3');
const gamemusic = new Audio('music/gamemusic.mp3');
const movesound = new Audio('music/movesound.mp3');
const gameoversound = new Audio('music/gameoversound.mp3');
let speed = 5;
let lastpainttime = 0;
let snackArr = [
    { x: 13, y: 15 }
]
let food = { x: 6, y: 7 }
let score = 0;

// game function
function main(ctime) {
    window.requestAnimationFrame(main);
    // gamemusic.play();
    // console.log(ctime);
    if ((ctime - lastpainttime) / 1000 < 1 / speed) {
        return;
    }
    lastpainttime = ctime;
    gameEngine();
}

function isCollide(snack) {
    
    // enter for self
    for (let i = 1; i < snackArr.length; i++) {
        if (snack[i].x === snack[0].x && snack[i].y === snack[0].y) {
            return true;
        }
    }

    //  Enter in a wall
    if (snack[0].x >= 18 || snack[0].x <= 0 || snack[0].y >= 18 || snack[0].y <= 0) {
        return true;
    }
}

function gameEngine() {
    // gamemusic.play();
    // update snack array & food
    if (isCollide(snackArr)) {
        gamemusic.pause();
        gameoversound.play();
        // pause music sound
        inputDir = { x: 0, y: 0 };
        alert("Game Over press Enter to Start Again");
        console.log("Game Over press Enter to Start Again");
        snackArr = [{ x: 13, y: 15 }];
        gamemusic.play();
        score = 0;
    }

    // if Eaten the food, increement score and regenerate food
    if (snackArr[0].y === food.y && snackArr[0].x === food.x) {
        foodsound.play();
        snackArr.unshift({ x: snackArr[0].x + inputDir.x, y: snackArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    // moving the snack
    for (let i = snackArr.length - 2; i >= 0; i--) {
        snackArr[i + 1] = { ...snackArr[i] };
    }

    snackArr[0].x += inputDir.x;
    snackArr[0].y += inputDir.y;

    // display the snack 
    board.innerHTML = "";
    snackArr.forEach((e, index) => {
        snackElement = document.createElement('div');
        snackElement.style.gridRowStart = e.y;
        snackElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snackElement.classList.add('head');
        }
        else {
            snackElement.classList.add('snack');
        }
        board.appendChild(snackElement);
    });

    // display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}





// main logic starts
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } // start the game
    movesound.play();
    switch (e.key) {
        // Arrow key controle
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        // number key controle
        case "8":
            console.log("8")
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "2":
            console.log("2")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "4":
            console.log("4")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "6":
            console.log("6")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        // Charcter key controle
        case "w":
            console.log("w")
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "s":
            console.log("s")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "a":
            console.log("a")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "d":
            console.log("d")
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});