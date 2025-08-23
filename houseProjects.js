const buttonLeave = document.getElementById('leave');
const character = document.getElementById('character');
// const bookOpen = document.getElementById('bookOpen');

/* ---------------------------------------------------  BOUTON RETOUR A LA PAGE HOME  ---------------------------------------------------*/

buttonLeave.addEventListener('click', function () {
    window.location.href = "homePage.html";
})

document.addEventListener('keyup', (e) => {
    if (e.key === "Escape") {
        window.location.href = "homePage.html";

    }
})

// /* ---------------------------------------------------  LES INTERACTIONS  ---------------------------------------------------*/



// document.addEventListener('keydown', (e) => {
//     if ((e.key === 'e' || e.key === 'E') && canPressE) {

//         switch (currentInteraction) {
//             case "1vs1Fight":
//                 bookOpen.style.display = "block"
//                 break;
//             case "leaveRoom":
//                 window.location.href = "homePage.html"
//                 break;
//             default:
//                 console.log("Interaction inconnue");
//         }



//     }
// });







/* ---------------------------------------------------  MOUVEMENTS PERSONNAGE + COLLISIONS  ---------------------------------------------------*/


function moveCharacter() {
    document.addEventListener('keydown', (e) => {
        let width = window.innerWidth;
        let marginBottomWalls

        const steps = 18;
        const marginCollisionsWalls = 68;
        const marginTopWalls = 120;
        const ajustRightWall = 70;

        if (width < 1480) {
            marginBottomWalls = 200;
        } else {
            marginBottomWalls = 130;
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
        if (newX + characterWidth + ajustRightWall > roomRect.width) newX = roomRect.width - characterWidth - ajustRightWall;
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


                if (obstacle.className.contains("book")) {
                    canPressE = true
                    eInteract.style.display = "block"
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


const titleProject = document.getElementById('title');
const gifProject = document.getElementById('video');
const descProject = document.getElementById('description');
const closeMenu = document.getElementById('closeMenu');
const bookOpen = document.getElementById('bookOpen');
const buttonPlay = document.getElementById('button');
const textPlayButton = document.getElementById('textPlay');

let projects = [];

// Charger les projets
fetch("json/projects.json")
    .then(res => res.json())
    .then(data => {
        projects = data;
        createBooks(projects);
    });

// Crée un livre par projet
function createBooks(projects) {
    const tables = document.querySelectorAll("#tables > #tableAndChair");

    projects.forEach((proj, i) => {
        if (!tables[i]) return; 
        const book = document.createElement("div");
        book.classList.add("obstacle", "book");
        book.dataset.id = i;
        tables[i].appendChild(book);

        book.addEventListener("click", () => openBook(i));
    });
}

function openBook(index) {
    const project = projects[index];
    if (!project) return;
    bookOpen.style.display = "flex";
    console.log("Livre cliqué :", project.name)
    titleProject.innerHTML = project.name;
    gifProject.style.backgroundImage = `url(${project.gif})`;
    descProject.innerHTML = project.description;

    // bouton play
    buttonPlay.onclick = () => {
        window.open(project.link, "_blank");
    };

    
}

closeMenu.addEventListener("click", () => {
    bookOpen.style.display = "none";
});

// Gestion responsive du bouton
function playButtonInteraction() {
    const width = window.innerWidth;
    buttonPlay.style.display = width < 480 ? "none" : "flex";

    buttonPlay.addEventListener("mousedown", () => {
        buttonPlay.style.backgroundImage = 'url(pictures/props/buttonBrownPressed.png)';
        textPlayButton.style.marginTop = '6%';
    });

    buttonPlay.addEventListener("mouseup", () => {
        buttonPlay.style.backgroundImage = 'url(pictures/props/buttonBrown.png)';
        textPlayButton.style.marginTop = '3%';
    });

    buttonPlay.addEventListener("mouseleave", () => {
        buttonPlay.style.backgroundImage = 'url(pictures/props/buttonBrown.png)';
        textPlayButton.style.marginTop = '3%';
    });
}
playButtonInteraction();
