// Get all the start game text elements
let startGameElements = document.querySelectorAll('.start-game h2');
let ball_ = document.querySelectorAll('.ball');

// Create a function to handle the event
function hideStartGameElements() {
    // Loop through each start game text element and hide it
    startGameElements.forEach(function(element) {
        element.style.display = 'none';
    });

}

// Add the function as an event listener for multiple events
document.addEventListener('click', hideStartGameElements);
document.addEventListener('keypress', hideStartGameElements);

//---------------------------rackets-movemnt-----------------------------------\\
//ball data
const gameBoard = document.querySelector('.board');
const ball = document.querySelector('.ball');

let boardWidth = gameBoard.clientWidth;
let boardHeight = gameBoard.clientHeight;
let rect = gameBoard.getBoundingClientRect();
//
window.addEventListener('resize', function() {
    boardHeight = gameBoard.clientHeight;
    boardWidth = gameBoard.clientWidth;
	rect = gameBoard.getBoundingClientRect();
    // console.log("Board height is " + boardHeight);
    // console.log("Board width is " + boardWidth);
});
document.addEventListener('keydown', function(event) {
	const leftRacket = document.querySelector('.left-racket img');
    const rightRacket = document.querySelector('.right-racket img');
    const step = 100; // Change this value to make the rackets move faster or slower
	hideStartGameElements();
	var div = document.getElementsByClassName('game-board')[0];
	var height = div.offsetHeight;
	var racket = document.getElementsByClassName('left-racket')[0];
	var maxRacketY = div.offsetHeight - racket.offsetHeight;
	// console.log(racket.offsetHeight);
	
    switch(event.key) {
        case 'ArrowUp':
            // Move the right racket up, but not above -330px
            let newTopRightUp = (parseInt(rightRacket.style.top) || 0) - step;
			// console.log(-boardHeight);
			// console.log(rect.top);
            if (newTopRightUp >= -boardHeight / 2) {
                rightRacket.style.top = newTopRightUp + 'px';
            }
            break;
        case 'ArrowDown':
            // Move the right racket down, but not below 240px
            let newTopRightDown = (parseInt(rightRacket.style.top) || 0) + step;
            if (newTopRightDown <= boardHeight / 2 - 100) {
                rightRacket.style.top = newTopRightDown + 'px';
            }
            break;
        case 'w':
            // Move the left racket up, but not above -330px
            let newTopLeftUp = (parseInt(leftRacket.style.top) || 0) - step;
            if (newTopLeftUp >= -boardHeight / 2) {
                leftRacket.style.top = newTopLeftUp + 'px';
            }
            break;
        case 's':
            // Move the left racket down, but not below 240px
            let newTopLeftDown = (parseInt(leftRacket.style.top) || 0) + step;
            if (newTopLeftDown <= boardHeight / 2 - 100) {
                leftRacket.style.top = newTopLeftDown + 'px';
            }
            break;
    }
});

//--------------------------ball------------------------------------\\

// console.log(rect.top, rect.right, rect.bottom, rect.left);
const ballDiameter = ball.clientWidth;

let ballX = boardWidth / 2 - ballDiameter / 2 + rect.top; // Initial X position
let ballY = boardHeight / 2 - ballDiameter / 2 + rect.left; // Initial Y position
let speedX = 10; // Horizontal speed
let speedY = 10; // Vertical speed

let isMoving = false; // Flag to check if the ball is moving

document.addEventListener('keydown', function() {
    isMoving = true;
});
document.addEventListener('click', function() {
    isMoving = true;
});

function moveBall() {
    if (!isMoving) {
        requestAnimationFrame(moveBall);
        return;
    }

    ballX += speedX;
    ballY += speedY;

    // Check for collision with the walls and reverse direction if needed
    if (ballX + ballDiameter > rect.right - ballDiameter) {
		// ballX = rect.right - ballDiameter;
		speedX = -speedX;
	}
	if (ballX < rect.left) {
		ballX = rect.left;
		speedX = -speedX;
	}
	if (ballY + ballDiameter > rect.bottom - ballDiameter) {
		// ballY = rect.bottom - ballDiameter;
		speedY = -speedY;
	}
	if (ballY < rect.top) {
		ballY = rect.top;
		speedY = -speedY;
	}

    // Set the new position
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    requestAnimationFrame(moveBall);
}
moveBall();