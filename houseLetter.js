const buttonLeave = document.getElementById('leave')
const character = document.getElementById('character');
const buttonCopyAdresse = document.getElementById('copyAdresse');
const msgCopyAdresse = document.getElementById('msgCopyAdresse');
const closeMenu = document.getElementById('closeMenu');
const maintenacePage = document.getElementById('maintenace');
const letterPage = document.getElementById('letterBack');
const objet = document.getElementById('objet');
const clipboardSuccess = document.getElementById('clipboardSuccess')

let canPressE = false;
let currentInteraction = null;

// BOUTON RETOUR A LA PAGE HOME

buttonLeave.addEventListener('click', function () {
    window.location.href = "homePage.html"
})

document.addEventListener('keyup', (e) => {
    if (e.key === "Escape") {
        window.location.href = "homePage.html"

    }
})

// LES INTERACTIONS

document.addEventListener('keydown', (e) => {
    if ((e.key === 'e' || e.key === 'E') && canPressE) {

        switch (currentInteraction) {
            case "object":
                maintenacePage.style.display = 'flex';
                letterPage.style.display = 'flex';
                closeMenu.style.display = 'block'
                break;
            case "leaveRoom":
                window.location.href = "homePage.html"
                break;
            default:
                console.log("Interaction inconnue");
        }



    }
});

function letterInteraction() {


    objet.addEventListener('click', function () {
        maintenacePage.style.display = 'flex';
        letterPage.style.display = 'flex';
        closeMenu.style.display = 'block'
    })

    buttonCopyAdresse.addEventListener('mousedown', function () {
        buttonCopyAdresse.style.backgroundImage = 'url(pictures/props/buttonBrownPressed.png)';
        msgCopyAdresse.style.marginTop = '20px'

        navigator.clipboard.writeText("pro.bonanseathomas@gmail.com").then(
            function () {
                clipboardSuccess.style.display = 'flex'

                setTimeout(function () {
                    clipboardSuccess.style.animation = "disappear 0.6s ease-in-out"

                }, 1050)

                setTimeout(function () {
                    clipboardSuccess.style.display = 'none'
                    clipboardSuccess.style.animation = "pop-up 0.6s ease-in-out"


                    closeMenu.style.display = 'block'

                }, 1600)
            },
            function () {
                /* échec de l’écriture dans le presse-papiers */
            },
        );
    });

    buttonCopyAdresse.addEventListener('mouseup', function () {
        buttonCopyAdresse.style.backgroundImage = 'url(pictures/props/buttonBrown.png)';
        msgCopyAdresse.style.marginTop = '10px';

        if (window.innerWidth <= 768) {
            closeMenu.style.display = 'none';
        } else {
            closeMenu.style.display = 'block';
        }
    });

    buttonCopyAdresse.addEventListener('mouseleave', function () {
        buttonCopyAdresse.style.backgroundImage = 'url(pictures/props/buttonBrown.png)';
        msgCopyAdresse.style.marginTop = '10px'
    });

    closeMenu.addEventListener('click', function () {
        maintenacePage.style.display = 'none';
        letterPage.style.display = 'none';
        closeMenu.style.display = 'none'
    })


}

letterInteraction();



// MOUVEMENTS PERSONNAGE + COLLISIONS

function moveCharacter() {
    document.addEventListener('keydown', (e) => {
        let width = window.innerWidth;
        let marginBottomWalls

        const steps = 18;
        const marginCollisionsWalls = 42;
        const marginTopWalls = 360;

        if (width < 1480) {
            marginBottomWalls = 175;
        } else{
            marginBottomWalls = 105;
        }

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
        if (newX + characterWidth > roomRect.width) newX = roomRect.width - characterWidth;
        if (newY < marginTopWalls) newY = marginTopWalls;
        if (newY + characterHeight + marginBottomWalls > roomRect.height) newY = roomRect.height - characterHeight - marginBottomWalls;

        // Détection des collisions
        const obstacles = document.querySelectorAll(".obstacle");
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

                if (obstacle.id === "leaveRoom") {
                    canPressE = true
                    eInteract.style.display = "block"
                    currentInteraction = "leaveRoom"
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

    const bottomTolerance = -40;
    const ajustSpaceResponsive = 70


    return !(
        rect1.top + bottomTolerance > adjustedRect2.bottom ||
        rect1.bottom - ajustSpaceResponsive < adjustedRect2.top ||
        rect1.left > adjustedRect2.right ||
        rect1.right - ajustSpaceResponsive < adjustedRect2.left
    );
}


moveCharacter();

