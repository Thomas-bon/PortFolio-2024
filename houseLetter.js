const buttonLeave = document.getElementById('leave')
const character = document.getElementById('character');

let canPressE = false;
let currentInteraction = null;

// BOUTON RETOUR A LA PAGE HOME

buttonLeave.addEventListener('click', function () {
    window.location.href = "homePage.html"
})

document.addEventListener('keyup', (e) => {
    if (e.key === "Escape"){
    window.location.href = "homePage.html" 

    }
})

// LES INTERACTIONS

document.addEventListener('keydown', (e) => {
    if ((e.key === 'e' || e.key === 'E') && canPressE) {

        switch (currentInteraction) {
            case "object":
                window.location.href = "homePage.html";
                break;
            default:
                console.log("Interaction inconnue");
        }



    }
});

// MOUVEMENTS PERSONNAGE + COLLISIONS

function moveCharacter() {
    document.addEventListener('keydown', (e) => {
        const steps = 18;
        const marginCollisionsWalls = 22;
        const marginTopWalls = 360;
        const marginBottomWalls = 155;


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

        // Collisions room
        if (newX < marginCollisionsWalls) newX = marginCollisionsWalls;
        if (newX + characterWidth + marginCollisionsWalls > roomRect.width) newX = roomRect.width - characterWidth - marginCollisionsWalls;
        if (newY < marginTopWalls) newY = marginTopWalls;
        if (newY + characterHeight + marginBottomWalls > roomRect.height) newY = roomRect.height - characterHeight - marginBottomWalls;

        // Détection des collisions
        const obstacles = document.querySelectorAll(".obstacleDeFouOMG");
        let collisionDetected = false;

        obstacles.forEach((obstacle) => {
            if (isCollision(character, obstacle, newX, newY)) {
                collisionDetected = true;
                console.log('Collision détectée avec un obstacle :', obstacle.id);

                const eInteract = document.getElementById('eInteract')


                console.log('Collision détectée avec un obstacle :', obstacle.id);

                if (obstacle.id === 'objet') {
                    eInteract.style.display = "block"
                    canPressE = true;

                    currentInteraction = "object";

                }

            }
        });

        if (!collisionDetected) {
            character.style.left = `${newX}px`;
            character.style.top = `${newY}px`;
            eInteract.style.display = "none"
            canPressE = false;

        } else {
            console.log('Collision détectée, mouvement annulé.');
        }
    });
}


function isCollision(character, obstacle, posX, posY) {
    const margin = 7;
    const rect1 = {
        top: posY + margin + 40,
        bottom: posY + character.offsetHeight - margin,
        left: posX + margin,
        right: posX + character.offsetWidth - margin,
    };

    const rect2 = obstacle.getBoundingClientRect();

    const parentRect = room.getBoundingClientRect();

    const adjustedRect2 = {
        top: rect2.top - parentRect.top,
        bottom: rect2.bottom - parentRect.top,
        left: rect2.left - parentRect.left,
        right: rect2.right - parentRect.left,
    };

    const bottomTolerance = 25;

    return !(
        rect1.top + bottomTolerance > adjustedRect2.bottom ||
        rect1.bottom < adjustedRect2.top ||
        rect1.left > adjustedRect2.right ||
        rect1.right < adjustedRect2.left
    );
}


moveCharacter();

