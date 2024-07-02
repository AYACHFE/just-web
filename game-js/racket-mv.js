// // Get all the start game text elements
// let startGameElements = document.querySelectorAll('.start-game h2');

// // Create a function to handle the event
// function hideStartGameElements() {
//     // Loop through each start game text element and hide it
//     startGameElements.forEach(function(element) {
//         element.style.display = 'none';
//     });
// }

// // Add the function as an event listener for multiple events
// document.addEventListener('click', hideStartGameElements);
// document.addEventListener('keypress', hideStartGameElements);

// //---------------------------rackets-movemnt-----------------------------------\\

// document.addEventListener('keydown', function(event) {
//     const leftRacket = document.querySelector('.left-racket img');
//     const rightRacket = document.querySelector('.right-racket img');
//     const step = 50; // Change this value to make the rackets move faster or slower
// 	hideStartGameElements();
//     switch(event.key) {
//         case 'ArrowUp':
//             // Move the right racket up, but not above -330px
//             let newTopRightUp = (parseInt(rightRacket.style.top) || 0) - step;
//             if (newTopRightUp >= -350) {
//                 rightRacket.style.top = newTopRightUp + 'px';
//             }
//             break;
//         case 'ArrowDown':
//             // Move the right racket down, but not below 240px
//             let newTopRightDown = (parseInt(rightRacket.style.top) || 0) + step;
//             if (newTopRightDown <= 250) {
//                 rightRacket.style.top = newTopRightDown + 'px';
//             }
//             break;
//         case 'w':
//             // Move the left racket up, but not above -330px
//             let newTopLeftUp = (parseInt(leftRacket.style.top) || 0) - step;
//             if (newTopLeftUp >= -350) {
//                 leftRacket.style.top = newTopLeftUp + 'px';
//             }
//             break;
//         case 's':
//             // Move the left racket down, but not below 240px
//             let newTopLeftDown = (parseInt(leftRacket.style.top) || 0) + step;
//             if (newTopLeftDown <= 250) {
//                 leftRacket.style.top = newTopLeftDown + 'px';
//             }
//             break;
//     }
// });

// //--------------------------ball------------------------------------\\

// let ball = document.querySelector('.ball');
// let board = document.querySelector('.board');
// let ballSpeedX = 2;
// let ballSpeedY = 2;

// function moveBall() {
//     let ballRect = ball.getBoundingClientRect();
//     let boardRect = board.getBoundingClientRect();
//     let leftRacketRect = document.querySelector('.left-racket').getBoundingClientRect();
//     let rightRacketRect = document.querySelector('.right-racket').getBoundingClientRect();

//     // Check for collision with top and bottom of the board
// onFrame(moveBall);
// }

// // Start moving the ball
// moveBall();


//board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context; 

//players
let playerWidth = 10;
let playerHeight = 50;
let playerVelocityY = 0;

let player1 = {
    x : 10,
    y : boardHeight/2,
    width: playerWidth,
    height: playerHeight,
    velocityY : 0
}

let player2 = {
    x : boardWidth - playerWidth - 10,
    y : boardHeight/2,
    width: playerWidth,
    height: playerHeight,
    velocityY : 0
}

//ball
let ballWidth = 10;
let ballHeight = 10;
let ball = {
    x : boardWidth/2,
    y : boardHeight/2,
    width: ballWidth,
    height: ballHeight,
    velocityX : 1,
    velocityY : 2
}

let player1Score = 0;
let player2Score = 0;

window.onload = function() {
    board = document.getElementsByClassName(".board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board

    //draw initial player1
    context.fillStyle="skyblue";
    context.fillRect(player1.x, player1.y, playerWidth, playerHeight);

    requestAnimationFrame(update);
    document.addEventListener("keyup", movePlayer);
}

function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    // player1
    context.fillStyle = "skyblue";
    let nextPlayer1Y = player1.y + player1.velocityY;
    if (!outOfBounds(nextPlayer1Y)) {
        player1.y = nextPlayer1Y;
    }
    // player1.y += player1.velocityY;
    context.fillRect(player1.x, player1.y, playerWidth, playerHeight);

    // player2
    let nextPlayer2Y = player2.y + player2.velocityY;
    if (!outOfBounds(nextPlayer2Y)) {
        player2.y = nextPlayer2Y;
    }
    // player2.y += player2.velocityY;
    context.fillRect(player2.x, player2.y, playerWidth, playerHeight);

    // ball
    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ballWidth, ballHeight);

    if (ball.y <= 0 || (ball.y + ballHeight >= boardHeight)) { 
        // if ball touches top or bottom of canvas
        ball.velocityY *= -1; //reverse direction
    }

    // if (ball.y <= 0) { 
    //     // if ball touches top of canvas
    //     ball.velocityY = 2; //go down
    // }
    // else if (ball.y + ballHeight >= boardHeight) {
    //     // if ball touches bottom of canvas
    //     ball.velocityY = -2; //go up
    // }

    //bounce the ball back
    if (detectCollision(ball, player1)) {
        if (ball.x <= player1.x + player1.width) { //left side of ball touches right side of player 1 (left paddle)
            ball.velocityX *= -1;   // flip x direction
        }
    }
    else if (detectCollision(ball, player2)) {
        if (ball.x + ballWidth >= player2.x) { //right side of ball touches left side of player 2 (right paddle)
            ball.velocityX *= -1;   // flip x direction
        }
    }

    //game over
    if (ball.x < 0) {
        player2Score++;
        resetGame(1);
    }
    else if (ball.x + ballWidth > boardWidth) {
        player1Score++;
        resetGame(-1);
    }

    //score
    context.font = "45px sans-serif";
    context.fillText(player1Score, boardWidth/5, 45);
    context.fillText(player2Score, boardWidth*4/5 - 45, 45);

    // draw dotted line down the middle
    for (let i = 10; i < board.height; i += 25) { //i = starting y Position, draw a square every 25 pixels down
        // (x position = half of boardWidth (middle) - 10), i = y position, width = 5, height = 5
        context.fillRect(board.width / 2 - 10, i, 5, 5); 
    }
}

function outOfBounds(yPosition) {
    return (yPosition < 0 || yPosition + playerHeight > boardHeight);
}

function movePlayer(e) {
    //player1
    if (e.code == "KeyW") {
        player1.velocityY = -3;
    }
    else if (e.code == "KeyS") {
        player1.velocityY = 3;
    }

    //player2
    if (e.code == "ArrowUp") {
        player2.velocityY = -3;
    }
    else if (e.code == "ArrowDown") {
        player2.velocityY = 3;
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
           a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
           a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
}

function resetGame(direction) {
    ball = {
        x : boardWidth/2,
        y : boardHeight/2,
        width: ballWidth,
        height: ballHeight,
        velocityX : direction,
        velocityY : 2
    }
}