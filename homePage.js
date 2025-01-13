const houseOfProjects = document.getElementById('houseProjects')
const houseOfIdentity = document.getElementById('houseIdentity')
const houseOfLetter = document.getElementById('houseLetter')
const allOfHouse = document.querySelectorAll('.house')
const allSignOfHouse = document.querySelectorAll('.sign')


const character = document.getElementById('character');

let canPressE = false;
let currentLocation = null;


// MOUVEMENTS PERSONNAGES + COLLISIONS

document.addEventListener('keydown', (e) => {
    if ((e.key === 'e' || e.key === 'E') && canPressE && currentLocation) {
        window.location.href = currentLocation;
    }
});

function moveCharacter() {

    const keyZ = document.getElementById('keyZ')
    const keyS = document.getElementById('keyS')
    const keyQ = document.getElementById('keyQ')
    const keyD = document.getElementById('keyD')

    document.addEventListener('keydown', (e) => {
        const steps = 20;
        const marginWindow = 10;

        const widthWindow = window.innerWidth;
        const heightWindow = window.innerHeight;

        let currentX = parseInt(window.getComputedStyle(character).left) || 0;
        let currentY = parseInt(window.getComputedStyle(character).top) || 0;

        let newX = currentX;
        let newY = currentY;


        const characterWidth = character.offsetWidth;
        const characterHeight = character.offsetHeight;

        if (e.key === 'z' || e.key === 'Z') {
            newY -= steps;

            keyZ.style.backgroundImage = 'url("pictures/Keys/zPress.png")'
        }

        if (e.key === 's' || e.key === 'S') {
            newY += steps;

            keyS.style.backgroundImage = 'url("pictures/Keys/sPress.png")'

        }

        if (e.key === 'q' || e.key === 'Q') {
            newX -= steps;

            keyQ.style.backgroundImage = 'url("pictures/Keys/qPress.png")'

        }

        if (e.key === 'd' || e.key === 'D') {
            newX += steps;

            keyD.style.backgroundImage = 'url("pictures/Keys/dPress.png")'

        }




        //Collisions Fenetre
        if (newX < marginWindow) newX = marginWindow;
        if (newX + characterWidth > widthWindow - marginWindow) newX = widthWindow - characterWidth - marginWindow;
        if (newY < marginWindow) newY = marginWindow;
        if (newY + characterHeight > heightWindow - marginWindow) newY = heightWindow - characterHeight - marginWindow;

        const obstacles = document.querySelectorAll(".obstacle");
        let collisionDetected = false;

        obstacles.forEach((obstacle) => {
            const eInteract = document.getElementById('eInteract')

            

            if (isCollision(character, obstacle, newX, newY, 3)) {
                collisionDetected = true;

                console.log('Collision détectée avec un obstacle :', obstacle.id);

                if (obstacle.id === 'houseLetter') {
                    canPressE = true
                    eInteract.style.display = "block"

                    currentLocation = "houseLetter.html";
                }

                if (obstacle.id === 'houseIdentity') {
                    canPressE = true

                    eInteract.style.display = "block"

                    currentLocation = "houseIdentity.html";
                }

                if (obstacle.id === 'houseProjects') {
                    canPressE = true

                    eInteract.style.display = "block"

                    currentLocation = "houseProjects.html";
                }
            }
            // console.log(canPressE)

        });

        if (!collisionDetected) {

            character.style.left = `${newX}px`;
            character.style.top = `${newY}px`;
            eInteract.style.display = "none";
            canPressE = false;

        }
    });

    document.addEventListener('keyup', (e) => {

        if (e.key === 'z' || e.key === 'Z') {
            keyZ.style.backgroundImage = 'url("pictures/Keys/z.png")';
        }

        if (e.key === 's' || e.key === 'S') {
            keyS.style.backgroundImage = 'url("pictures/Keys/s.png")';
        }

        if (e.key === 'q' || e.key === 'Q') {
            keyQ.style.backgroundImage = 'url("pictures/Keys/q.png")';
        }

        if (e.key === 'd' || e.key === 'D') {
            keyD.style.backgroundImage = 'url("pictures/Keys/d.png")';
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

    const bottomTolerance = 120;

    return !(
        rect1.top + bottomTolerance > obstacleSize.bottom ||
        rect1.bottom - 5 < obstacleSize.top ||
        rect1.left - 5 > obstacleSize.right ||
        rect1.right - 5 < obstacleSize.left
    );
}

moveCharacter();

// INTERACTIONS MAISONS

houseOfProjects.addEventListener('click', function () {
    window.location.href = "houseProjects.html"
})

houseOfIdentity.addEventListener('click', function () {
    window.location.href = "houseIdentity.html"
})

houseOfLetter.addEventListener('click', function () {
    window.location.href = "houseLetter.html"
})

for (let i = 0; i < allOfHouse.length; i++) {
    allOfHouse[i].addEventListener('mouseover', function() {
        allSignOfHouse[i].style.animation = "shake 2.5s ease-in-out infinite";
    });

    allOfHouse[i].addEventListener('mouseout', function() {
        allSignOfHouse[i].style.animation = "";
    });
}

 
