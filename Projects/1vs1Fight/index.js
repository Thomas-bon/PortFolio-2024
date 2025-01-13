scoreValueP1 = document.getElementById('score1');
scoreValueP2 = document.getElementById('score2');
progressBarP1 = document.getElementById('ClickP1');
progressBarP2 = document.getElementById('ClickP2');
pinkGirlP1 = document.getElementById('character1')
orangeGirlP2 = document.getElementById('character2')
win = document.getElementById('winnerPage');
resetButton = document.getElementById('resetButton')
textWin = document.getElementById('textWin')

let scoreP1 = 0;
let scoreP2 = 0;

let finish = false;
let lastClickTimeP1 = Date.now();
let lastClickTimeP2 = Date.now();

let musicPlayed = false;


function musicPlay() {
    document.addEventListener("keyup", function () {
        if (!musicPlayed) {
            const audio = new Audio("Music/backgroundmusic.mp4");
            audio.play().catch(error => {
                console.error("Erreur de lecture :", error);
            });
            musicPlayed = true;
        }
    });
}


function updateProgressBar(player, score) {
    let bar;

    if (player === 1) {
        bar = progressBarP1;
    } else {
        bar = progressBarP2;
    } bar.style.width = `${score * 1}%`;

    if (score <= 25) {
        bar.style.backgroundColor = "lightgreen";
    } else if (score <= 50) {
        bar.style.backgroundColor = "yellow";
    } else if (score <= 75) {
        bar.style.backgroundColor = "orange";
    } else {
        bar.style.backgroundColor = "red";
    }
}


function checkWinner() {
    if (scoreP1 >= 100) {
        win.style.display = "block";
        resetButton.style.display = "block";
        pinkGirlP1.style.backgroundImage = "url(Pictures/P1Win.png)";
        orangeGirlP2.style.display = "none";
        textWin.textContent = "Joueur 1 a gagné ! 🎉";
        finish = true;
        document.removeEventListener("keyup", isClick);


    } else if (scoreP2 >= 100) {
        win.style.display = "block";
        resetButton.style.display = "block";
        orangeGirlP2.style.backgroundImage = "url(Pictures/P2Win.png)";
        pinkGirlP1.style.display = "none";
        textWin.textContent = "Joueur 2 a gagné ! 🎉";
        finish = true;
        document.removeEventListener("keyup", isClick);
    }
}


function isClick(event) {

    const currentTime = Date.now();
    const punchSoundP1 = new Audio("Music/punch.mp3")
    const punchSoundP2 = new Audio("Music/punch2.mp3")

    punchSoundP1.volume = 0.2;
    punchSoundP2.volume = 0.5;


    // factoriser
    // function pressToPunch(scorePlayer,LastClickPlayer, scoreValuePlayer, punchSound, character,animateCharacter) {

    //     LastClickPlayer = currentTime;
    //     scorePlayer = Math.min(scorePlayer + 1, 100);
    //     scoreValuePlayer.textContent = scorePlayer;
    //     updateProgressBar(1, scorePlayer);

    //     punchSound.play();
    //     character.classList.add(animateCharacter');
    //     document.body.classList.add(punchSound);

    //     setTimeout(() => {
    //         character.classList.remove(animateCharacter);
    //         document.body.classList.remove(punchSound);
    //     }, 100);
    // }


    // pressToPunch(scoreP1, lastClickTimeP1, scoreValueP1, punchedP1, orangeGirlP2, shakeP2)




    if (event.key.toLowerCase() === 'a') {


        lastClickTimeP1 = currentTime;
        scoreP1 = Math.min(scoreP1 + 1, 100);
        scoreValueP1.textContent = scoreP1;
        updateProgressBar(1, scoreP1);

        punchSoundP1.play();
        orangeGirlP2.classList.add('shakeP2');
        document.body.classList.add('punchedP1');

        setTimeout(() => {
            orangeGirlP2.classList.remove('shakeP2');
            document.body.classList.remove('punchedP1');
        }, 100);

    } else if (event.key.toLowerCase() === 'l') {


        lastClickTimeP2 = currentTime;
        scoreP2 = Math.min(scoreP2 + 1, 100);
        scoreValueP2.textContent = scoreP2;
        updateProgressBar(2, scoreP2)

        punchSoundP2.play();
        pinkGirlP1.classList.add('shakeP1');
        document.body.classList.add('punchedP2');

        setTimeout(() => {
            pinkGirlP1.classList.remove('shakeP1');
            document.body.classList.remove('punchedP2');
        }, 100);


    }
    checkWinner();
}




    const clickMore = setInterval(() => {

        if (finish) return;
        
        const currentTime = Date.now();


        if (currentTime - lastClickTimeP1 > 200) {
            scoreP1 = Math.max(scoreP1 - 1, 0);
            scoreValueP1.textContent = scoreP1;
            updateProgressBar(1, scoreP1);
        }

        if (currentTime - lastClickTimeP2 > 200) {
            scoreP2 = Math.max(scoreP2 - 1, 0);
            scoreValueP2.textContent = scoreP2;
            updateProgressBar(2, scoreP2);
        }

    }, 100);



function resetAll() {
    scoreP1 = 0;
    scoreP2 = 0;
    scoreValueP1.textContent = scoreP1;
    scoreValueP2.textContent = scoreP2;
    win.style.display = "none";
    resetButton.style.display = "none";
    progressBarP1.style.width = "0px";
    progressBarP2.style.width = "0px";
    musicPlay();
    pinkGirlP1.style.display = "flex";
    orangeGirlP2.style.display = "flex";
    pinkGirlP1.style.backgroundImage = "url(Pictures/P1Default.gif)";
    orangeGirlP2.style.backgroundImage = "url(Pictures/P2Default.gif)";
    finish = false;
    textWin.textContent = "";
    document.addEventListener("keyup", isClick);
}


resetButton.addEventListener("click", () => {
    resetAll();
});

musicPlay();
document.addEventListener("keyup", isClick)
