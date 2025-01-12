const character = document.getElementById('character');

function moveCharacter() {
    document.addEventListener('keydown', (e) => {
        const steps = 20;
        const marginWindow = 10;

        const widthWindow = window.innerWidth;
        const heightWindow = window.innerHeight;

        let currentX = parseInt(window.getComputedStyle(character).left) || 0;
        let currentY = parseInt(window.getComputedStyle(character).top) || 0;

        let newX = currentX;
        let newY = currentY;

        const roomRect = room.getBoundingClientRect();
        const characterWidth = character.offsetWidth;
        const characterHeight = character.offsetHeight;

        if (e.key === 'z' || e.key === 'Z') newY -= steps;
        if (e.key === 's' || e.key === 'S') newY += steps;
        if (e.key === 'q' || e.key === 'Q') newX -= steps;
        if (e.key === 'd' || e.key === 'D') newX += steps;


        //Collisions room
        if (newX < 0) newX = 0;
        if (newX + characterWidth > roomRect.width) newX = roomRect.width - characterWidth;
        if (newY < 0) newY = 0;
        if (newY + characterHeight > roomRect.height) newY = roomRect.height - characterHeight;


        //Collisions Fenetre
        if (newX < marginWindow) newX = marginWindow;
        if (newX + characterWidth > widthWindow - marginWindow) newX = widthWindow - characterWidth - marginWindow;
        if (newY < marginWindow) newY = marginWindow;
        if (newY + characterHeight > heightWindow - marginWindow) newY = heightWindow - characterHeight - marginWindow;

        const obstacles = document.querySelectorAll(".obstacleDeFouOMG");
        let collisionDetected = false;

        obstacles.forEach((obstacle) => {
            if (isCollision(character, obstacle, newX, newY, 3)) {
                collisionDetected = true;
            }
        });

        if (!collisionDetected) {
            character.style.left = `${newX}px`;
            character.style.top = `${newY}px`;
        }
    });
}

function isCollision(character, obstacle, posX, posY, margin) {
    const rect1 = {
        top: posY,
        bottom: posY + character.offsetHeight,
        left: posX,
        right: posX + character.offsetWidth,
    };

    const rect2 = obstacle.getBoundingClientRect();

    const obstacleSize = {
        top: rect2.top,
        bottom: rect2.bottom,
        left: rect2.left,
        right: rect2.right
    };

    const bottomTolerance = 70;

    return !(
        rect1.top + bottomTolerance > obstacleSize.bottom ||
        rect1.bottom - 5 < obstacleSize.top ||
        rect1.left - 5 > obstacleSize.right ||
        rect1.right - 5 < obstacleSize.left
    );
}

moveCharacter();
