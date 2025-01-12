
const characterSprite = document.getElementById('characterPicture')

let currentSprite = 0;
let spriteInterval = null;
let isKeyPressed = false;

/* ---------------------------------------------------  TOUS LES SPRITES  ---------------------------------------------------*/


const movingRight = [
    'url("pictures/Character/movingRight1.png")',
    'url("pictures/Character/movingRight2.png")'
];

const movingLeft = [
    'url("pictures/Character/movingLeft1.png")',
    'url("pictures/Character/movingLeft2.png")'
];

const movingBack = [
    'url("pictures/Character/movingBack1.png")',
    'url("pictures/Character/movingBack2.png")'
];

const movingFront = [
    'url("pictures/Character/movingFront1.png")',
    'url("pictures/Character/movingFront2.png")'
];


/* ---------------------------------------------------  EVENEMENT CHANGEMENT DE SPRITE  ---------------------------------------------------*/

function changeSprite(imageUrl) {
    characterSprite.style.transition = "transform 0.2s ease, opacity 0.6s ease";
    characterSprite.style.opacity = 0.9;
    characterSprite.style.transform = "scale(0.95)";

    setTimeout(() => {
        characterSprite.style.backgroundImage = imageUrl;
        characterSprite.style.opacity = 1;
        characterSprite.style.transform = "scale(1)";
    }, 70);
}

/* ---------------------------------------------------  GESTION DES MOUVEMENTS  ---------------------------------------------------*/

function startMoving(direction) {
    spriteInterval = setInterval(() => {
        currentSprite = (currentSprite + 1) % direction.length;
        changeSprite(direction[currentSprite]);
    }, 90);
}

function stopMoving(idleSprite) {
    clearInterval(spriteInterval);
    changeSprite(idleSprite);
}

/* ---------------------------------------------------  MOUVEMENTS DIVERS  ---------------------------------------------------*/



document.addEventListener('keydown', (e) => {
    if (e.key === 'd' || e.key === 'D') {
        if (!isKeyPressed) {
            isKeyPressed = true;
            startMoving(movingRight)
        }
    }

    if (e.key === 'q' || e.key === 'Q') {
        if (!isKeyPressed) {
            isKeyPressed = true;
            startMoving(movingLeft)
        }
    }

    if (e.key === 'z' || e.key === 'Z') {
        if (!isKeyPressed) {
            isKeyPressed = true;
            startMoving(movingBack)
        }
    }

    if (e.key === 's' || e.key === 'S') {
        if (!isKeyPressed) {
            isKeyPressed = true;
            startMoving(movingFront)
        }
    }

})

document.addEventListener('keyup', (e) => {
    if (e.key === 'd' || e.key === 'D') {
        isKeyPressed = false;
        stopMoving('url("pictures/Character/idleRight.png")')
    }

    if (e.key === 'q' || e.key === 'Q') {
        isKeyPressed = false;
        stopMoving('url("pictures/Character/idleLeft.png")')
    }

    if (e.key === 'z' || e.key === 'Z') {
        isKeyPressed = false;
        stopMoving('url("pictures/Character/idleBack.png")')
    }

    if (e.key === 's' || e.key === 'S') {
        isKeyPressed = false;
        stopMoving('url("pictures/Character/idleFront.png")')
    }
})

