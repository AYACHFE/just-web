const ball = document.querySelector('.ball');
let ballX = 50; // Initial position (percentage of the parent width)
let ballY = 50; // Initial position (percentage of the parent height)
let speedX = 2; // Horizontal speed
let speedY = 2; // Vertical speed

function moveBall() {
    // Update ball position
    ballX += speedX;
    ballY += speedY;

    // Check for collision with the walls and reverse direction if needed
    if (ballX >= 100 || ballX <= 0) {
        speedX = -speedX;
    }
    if (ballY >= 100 || ballY <= 0) {
        speedY = -speedY;
    }

    // Set the new position
    ball.style.left = `${ballX}%`;
    ball.style.top = `${ballY}%`;

    // Continue the animation
    requestAnimationFrame(moveBall);
}

// Start the animation
moveBall();
