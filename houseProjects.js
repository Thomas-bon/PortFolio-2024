const buttonLeave = document.getElementById('leave');
const character = document.getElementById('character');
const bookOpen = document.getElementById('bookOpen');

/* ---------------------------------------------------  BOUTON RETOUR A LA PAGE HOME  ---------------------------------------------------*/

buttonLeave.addEventListener('click', function () {
    window.location.href = "homePage.html";
})

document.addEventListener('keyup', (e) => {
    if (e.key === "Escape") {
        window.location.href = "homePage.html";

    }
})

/* ---------------------------------------------------  LES INTERACTIONS  ---------------------------------------------------*/



document.addEventListener('keydown', (e) => {
    if ((e.key === 'e' || e.key === 'E') && canPressE) {

        switch (currentInteraction) {
            case "1vs1Fight":
                bookOpen.style.display = "block"
                break;
            default:
                console.log("Interaction inconnue");
        }



    }
});







/* ---------------------------------------------------  MOUVEMENTS PERSONNAGE + COLLISIONS  ---------------------------------------------------*/


function moveCharacter() {
    document.addEventListener('keydown', (e) => {
        const steps = 18;
        const marginCollisionsWalls = 22;
        const marginTopWalls = 47;
        const marginBottomWalls = 110;
        const ajustRightWall = 20;


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
        if (newX + characterWidth + ajustRightWall > roomRect.width) newX = roomRect.width - characterWidth - ajustRightWall;
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


                if (obstacle.id === "1vs1Fight") {
                    canPressE = true
                    eInteract.style.display = "block"
                    currentInteraction = "1vs1Fight"
                }


            }
        });

        if (!collisionDetected) {
            character.style.left = `${newX}px`;
            character.style.top = `${newY}px`;
            eInteract.style.display = "none";
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

    const bottomTolerance = 60;

    return !(
        rect1.top + bottomTolerance > adjustedRect2.bottom ||
        rect1.bottom < adjustedRect2.top ||
        rect1.left > adjustedRect2.right ||
        rect1.right < adjustedRect2.left
    );
}


moveCharacter();

/* ---------------------------------------------------  BOOKOPEN INNERHTML ET INTERACTIONS  ---------------------------------------------------*/

// INNERHTML

const titleProject = document.getElementById('title')
const gifProject = document.getElementById('video')
const descProject = document.getElementById('description')

const title = "1vs1 Fight";
const video = "url(pictures/projects/gif1vs1.gif)"
const description = "1 vs 1 fighter est un jeu de frappe où deux joueurs se confrontent, le premier a avoir appuyé 100fois sur leur touche dédié, qu'un seul mot d'ordre... S'amuser ! ";

titleProject.innerHTML = title
gifProject.style.backgroundImage = video
descProject.innerHTML = description

// INTERACTION
const projectOne = document.getElementById('1vs1Fight')

const closeMenu = document.getElementById('closeMenu')

projectOne.addEventListener('click', function () {
    bookOpen.style.display = "flex"

})

closeMenu.addEventListener('click', function () {
    bookOpen.style.display = "none"
})

function playButtonInteraction() {
    const buttonPlay = document.getElementById('button')
    const textPlayButton = document.getElementById('textPlay')


    buttonPlay.addEventListener('mousedown', function () {
        buttonPlay.style.backgroundImage = 'url(pictures/props/buttonBrownPressed.png)';
        textPlayButton.style.marginTop = '6%'

        window.open("Projects/1vs1Fight/index.html", "_blank")
    });

    buttonPlay.addEventListener('mouseup', function () {
        buttonPlay.style.backgroundImage = 'url(pictures/props/buttonBrown.png)';
        textPlayButton.style.marginTop = '3%';

    });

    buttonPlay.addEventListener('mouseleave', function () {
        buttonPlay.style.backgroundImage = 'url(pictures/props/buttonBrown.png)';
        textPlayButton.style.marginTop = '3%'
    });
};

playButtonInteraction();