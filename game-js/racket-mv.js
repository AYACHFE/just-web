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

const leftRacket = document.querySelector('.left-racket img');
const rightRacket = document.querySelector('.right-racket img');
let leftRacketRect;
let rightRacketRect;

let boardWidth = gameBoard.clientWidth;
let boardHeight = gameBoard.clientHeight;
let rect = gameBoard.getBoundingClientRect();
//
window.addEventListener('resize', function() {
    boardHeight = gameBoard.clientHeight;
    boardWidth = gameBoard.clientWidth;
	rect = gameBoard.getBoundingClientRect();

});


//---------------------- racket event listener to move up and down ----------------------\\
let moveUpRight = false;
let moveDownRight = false;
let moveUpLeft = false;
let moveDownLeft = false;

document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowUp':
            moveUpRight = true;
            break;
        case 'ArrowDown':
            moveDownRight = true;
            break;
        case 'w':
            moveUpLeft = true;
            break;
        case 's':
            moveDownLeft = true;
            break;
    }
});

document.addEventListener('keyup', function(event) {
    switch(event.key) {
        case 'ArrowUp':
            moveUpRight = false;
            break;
        case 'ArrowDown':
            moveDownRight = false;
            break;
        case 'w':
            moveUpLeft = false;
            break;
        case 's':
            moveDownLeft = false;
            break;
    }
});
setInterval(function() {
    const leftRacket = document.querySelector('.left-racket img');
    const rightRacket = document.querySelector('.right-racket img');
    const step = 100; // Change this value to make the rackets move faster or slower

    if (moveUpRight) {
        // Move the right racket up
        let newTopRightUp = (parseInt(rightRacket.style.top) || 0) - step;
        if (newTopRightUp >= -boardHeight / 2 - 100) {
            rightRacket.style.top = newTopRightUp + 'px';
        }
    }

    if (moveDownRight) {
        // Move the right racket down
        let newTopRightDown = (parseInt(rightRacket.style.top) || 0) + step;
        if (newTopRightDown <= boardHeight / 2) {
            rightRacket.style.top = newTopRightDown + 'px';
        }
    }

    if (moveUpLeft) {
        // Move the left racket up
        let newTopLeftUp = (parseInt(leftRacket.style.top) || 0) - step;
        if (newTopLeftUp >= -boardHeight / 2 - 100) {
            leftRacket.style.top = newTopLeftUp + 'px';
        }
    }

    if (moveDownLeft) {
        // Move the left racket down
        let newTopLeftDown = (parseInt(leftRacket.style.top) || 0) + step;
        if (newTopLeftDown <= boardHeight / 2) {
            leftRacket.style.top = newTopLeftDown + 'px';
        }
    }
}, 100); // Change this value to make the rackets move smoother or choppier

// document.addEventListener('keydown', function(event) {
// 	const leftRacket = document.querySelector('.left-racket img');
//     const rightRacket = document.querySelector('.right-racket img');
//     const step = 100; // Change this value to make the rackets move faster or slower
// 	hideStartGameElements();
// 	var div = document.getElementsByClassName('game-board')[0];
// 	var height = div.offsetHeight;
// 	var racket = document.getElementsByClassName('left-racket')[0];
// 	var maxRacketY = div.offsetHeight - racket.offsetHeight;
// 	// console.log(racket.offsetHeight);
	
//     switch(event.key) {
//         case 'ArrowUp':
//             // Move the right racket up, but not above -330px
//             let newTopRightUp = (parseInt(rightRacket.style.top) || 0) - step;
// 			// console.log(-boardHeight);
// 			// console.log(rect.top);
//             if (newTopRightUp >= -boardHeight / 2 - 100) {
// 				rightRacketRect = rightRacket.getBoundingClientRect();
//                 rightRacket.style.top = newTopRightUp + 'px';
//             }
//             break;
//         case 'ArrowDown':
//             // Move the right racket down, but not below 240px
//             let newTopRightDown = (parseInt(rightRacket.style.top) || 0) + step;
//             if (newTopRightDown <= boardHeight / 2 /*- 100*/) {
//                 rightRacket.style.top = newTopRightDown + 'px';
// 				rightRacketRect = rightRacket.getBoundingClientRect();
//             }
//             break;
// 			case 'w':
//             // Move the left racket up, but not above -330px
//             let newTopLeftUp = (parseInt(leftRacket.style.top) || 0) - step;
//             if (newTopLeftUp >= -boardHeight / 2 - 100) {
// 				leftRacketRect = leftRacket.getBoundingClientRect();
// 				// console.log("w -->" + leftRacketRect.top);
//                 leftRacket.style.top = newTopLeftUp + 'px';
//             }
//             break;
//         case 's':
//             // Move the left racket down, but not below 240px
//             let newTopLeftDown = (parseInt(leftRacket.style.top) || 0) + step;
//             if (newTopLeftDown <= boardHeight / 2 /*- 100*/) {
// 				leftRacketRect = leftRacket.getBoundingClientRect();
// 				// console.log("s -->" + leftRacketRect.top);
//                 leftRacket.style.top = newTopLeftDown + 'px';
//             }
//             break;
//     }
// });

//--------------------------ball------------------------------------\\

const ballDiameter = ball.clientWidth;

let ballX = boardWidth / 2 - ballDiameter / 2 + rect.top; // Initial X position at the center of the board
let ballY = boardHeight / 2 - ballDiameter / 2 + rect.left; // Initial Y position
let speedX = 10; // Horizontal speed
let speedY = 10; // Vertical speed

let isMoving = false; // Flag to check if the ball is moving

//listen for events to start the ball movement
	document.addEventListener('keydown', function() {
		isMoving = true;
	});
	document.addEventListener('click', function() {
		isMoving = true;
	});

let scoreP1 = 0;
let scoreP2 = 0;
let scoreP1_html = document.querySelector('.user-1-score > h2');
let scoreP2_html = document.querySelector('.user-2-score > h2');
var racket = document.getElementsByClassName('left-racket')[0];


function moveBall() {
	if (!isMoving) {
		requestAnimationFrame(moveBall);
        return;
    }
	
	scoreP1_html.innerHTML = scoreP1;
	scoreP2_html.innerHTML = scoreP2;
    ballX += speedX;
    ballY += speedY;

    // Check for collision with the walls and reverse direction if needed
	let ballRect = ball.getBoundingClientRect();
	let leftRacketRect = leftRacket.getBoundingClientRect();
	let rightRacketRect = rightRacket.getBoundingClientRect();
    if (ballX + ballDiameter + 10 > rect.right - ballDiameter) {
		// scoreP2++;
		// speedX = -speedX;
		console.log("ballRect.left " + ballRect.left + " rightRacketRect.right " + rightRacketRect.right + " ballRect.top " + ballRect.top + " rightRacketRect.top " + rightRacketRect.top + " rightRacketRect.bottom " + rightRacketRect.bottom);
		if (ballRect.top + ballRect.height >= rightRacketRect.top && ballRect.top <= rightRacketRect.bottom)
		{
			speedX = -speedX;
			// ballX = rect.right;
		}
		else {
			scoreP2++;
			let ballX = boardWidth / 2 - ballDiameter / 2 + rect.top;
			let ballY = boardHeight / 2 - ballDiameter / 2 + rect.left;
			ball.style.left = `${ballX}px`;
    		ball.style.top = `${ballY}px`;
			return;
		}
	}
	if (ballX + 10 < rect.left) {
		console.log("ballRect.left " + ballRect.left + " leftRacketRect.right " + leftRacketRect.right + " ballRect.top " + ballRect.top + " leftRacketRect.top " + leftRacketRect.top + " leftRacketRect.bottom " + leftRacketRect.bottom);
		// console.log("board " + (rect.left + leftRacketRect.width + ballRect.width));

		// if (ballRect.left <= (leftRacketRect.left+50))
		// if (ballRect.left <= leftRacketRect.right && ballRect.top + ballRect.height >= leftRacketRect.top && ballRect.top <= leftRacketRect.bottom)
		if (ballRect.top + ballRect.height >= leftRacketRect.top && ballRect.top <= leftRacketRect.bottom)
		{
			speedX = -speedX;
			ballX = rect.left;
		}
		else {
			scoreP1++;
			let ballX = boardWidth / 2 - ballDiameter / 2 + rect.top;
			let ballY = boardHeight / 2 - ballDiameter / 2 + rect.left;
			ball.style.left = `${ballX}px`;
    		ball.style.top = `${ballY}px`;
			return;
		}
	}
	// if (ballX + 10 < rect.left) {
	// 	scoreP1++;
	// 	ballX = rect.left;
	// 	speedX = -speedX;
	// }
	if (ballY + ballDiameter + 10 > rect.bottom) {
		// ballY = rect.bottom - ballDiameter;
		speedY = -speedY;
	}
	if (ballY + 10 < rect.top) {
		ballY = rect.top;
		speedY = -speedY;
	}

    // Set the new position
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    requestAnimationFrame(moveBall);
}
moveBall();