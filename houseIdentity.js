const buttonLeave = document.getElementById('leave')
const character = document.getElementById('character');
const paper = document.getElementById('paper');
const tv = document.getElementById('tv')
const socialNetworkWindow = document.getElementById('socialNetwork')

let canPressE = false;
let currentInteraction = null;
let socialWindowIsOpen = false;


// BOUTON RETOUR A LA PAGE HOME

buttonLeave.addEventListener('click', function() {
    window.location.href = "homePage.html" 
})
document.addEventListener('keyup', (e) => {
    if (e.key === "Escape"){
    window.location.href = "homePage.html" 

    }
})

// LES INTERACTIONS

function openPdf() {
    const pdfUrl = 'pdf/CV\ Thomas\ BONANSEA.pdf';
    window.open(pdfUrl, '_blank');
};


tv.addEventListener('click', function() {
    if(!socialWindowIsOpen){
        socialNetworkWindow.style.display = "flex";
        socialWindowIsOpen = true;
    }else{
        socialNetworkWindow.style.display = "none";
        socialWindowIsOpen = false;
    }
})

paper.addEventListener('click', function() {
    openPdf();
})

document.addEventListener('keydown', (e) => {
    if ((e.key === 'e' || e.key === 'E') && canPressE) {

        switch (currentInteraction) {
            case "paper":
                openPdf();
                break;
            case "tv":

                if(!socialWindowIsOpen){
                    socialNetworkWindow.style.display = "flex";
                    socialWindowIsOpen = true;
                }else{
                    socialNetworkWindow.style.display = "none";
                    socialWindowIsOpen = false;
                }

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
        const marginCollisionsWalls = 32;
        const marginTopWalls = 35;
        const marginBottomWalls = 112;



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

        if (newX < marginCollisionsWalls) newX = marginCollisionsWalls;
        if (newX + characterWidth + marginCollisionsWalls > roomRect.width) newX = roomRect.width - characterWidth - marginCollisionsWalls;
        if (newY < marginTopWalls) newY = marginTopWalls;
        if (newY + characterHeight + marginBottomWalls > roomRect.height) newY = roomRect.height - characterHeight - marginBottomWalls;

        const obstacles = document.querySelectorAll(".obstacleDeFouOMG");
        let collisionDetected = false;

        obstacles.forEach((obstacle) => {
            if (isCollision(character, obstacle, newX, newY)) {
                collisionDetected = true;
                console.log('Collision détectée avec un obstacle :', obstacle.id);

                const eInteract = document.getElementById('eInteract')


                if (obstacle.id === "table") {
                    canPressE = true
                    eInteract.style.display = "block"
                    currentInteraction = "paper"
                }

                if (obstacle.id === "tv") {
                    canPressE = true
                    eInteract.style.display = "block"
                    currentInteraction = "tv"
                }
            }
        });

        if (!collisionDetected) {
            const eInteract = document.getElementById('eInteract')

            character.style.left = `${newX}px`;
            character.style.top = `${newY}px`;
            canPressE = false;
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

const bottomTolerance = 55;

    return !(
        rect1.top + bottomTolerance > adjustedRect2.bottom ||
        rect1.bottom < adjustedRect2.top ||
        rect1.left > adjustedRect2.right ||
        rect1.right < adjustedRect2.left
    );
}


moveCharacter();

