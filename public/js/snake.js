// Snake Game Logic

const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const finalScoreElement = document.getElementById('final-score');

// Game Config
const gridSize = 20;
const tileCountX = canvas.width / gridSize;
const tileCountY = canvas.height / gridSize;

let speed = 7;
let score = 0;
let gameLoop;

// Snake State
let snake = [];
let dir = { x: 0, y: 0 };
let nextDir = { x: 0, y: 0 }; // Prevent rapid double turns
let food = { x: 5, y: 5 };

// Inputs
document.addEventListener('keydown', handleInput);

function handleInput(e) {
    switch (e.key) {
        case 'ArrowUp':
            if (dir.y !== 1) nextDir = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (dir.y !== -1) nextDir = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (dir.x !== 1) nextDir = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (dir.x !== -1) nextDir = { x: 1, y: 0 };
            break;
    }
}

function initGame() {
    snake = [{ x: 10, y: 10 }];
    dir = { x: 0, y: 0 }; // Start still
    nextDir = { x: 0, y: 0 };
    score = 0;
    speed = 7;
    scoreElement.innerText = score;
    placeFood();

    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');

    if (gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(update, 1000 / speed);
}

function update() {
    // Update Direction
    // Prevent reversing if length > 1 (handled by input check mainly, but here we apply)
    if (snake.length > 1) {
        if ((nextDir.x === -dir.x && nextDir.x !== 0) || (nextDir.y === -dir.y && nextDir.y !== 0)) {
            // Illegal turn (180 degree), ignore
        } else {
            dir = nextDir;
        }
    } else {
        dir = nextDir;
    }

    if (dir.x === 0 && dir.y === 0) return; // Wait for start

    const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

    // Wall Collision
    if (head.x < 0 || head.x >= tileCountX || head.y < 0 || head.y >= tileCountY) {
        gameOver();
        return;
    }

    // Self Collision
    for (let part of snake) {
        if (head.x === part.x && head.y === part.y) {
            gameOver();
            return;
        }
    }

    snake.unshift(head);

    // Food Collision
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.innerText = score;
        // Increase speed slightly
        if (score % 50 === 0) {
            speed++;
            clearInterval(gameLoop);
            gameLoop = setInterval(update, 1000 / speed);
        }
        placeFood();
    } else {
        snake.pop();
    }

    draw();
}

function draw() {
    // Clear
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

    // Snake
    ctx.fillStyle = '#4ade80'; // Tailwind green-400
    for (let part of snake) {
        ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);
    }
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * tileCountX),
        y: Math.floor(Math.random() * tileCountY)
    };
    // Check if food on snake
    for (let part of snake) {
        if (food.x === part.x && food.y === part.y) {
            placeFood();
            break;
        }
    }
}

function gameOver() {
    clearInterval(gameLoop);
    finalScoreElement.innerText = score;
    gameOverScreen.classList.remove('hidden');
}

// Initial Draw
draw();
