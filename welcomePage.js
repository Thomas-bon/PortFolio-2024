const playButton = document.getElementById('playButton')
const buttonSelected = document.getElementById('selected')


function actionButton() {


    playButton.addEventListener('mouseenter', function () {

        buttonSelected.style.backgroundImage = "url(pictures/TriangleSelector.svg)";
    })

    playButton.addEventListener('mouseleave', function () {

        buttonSelected.style.backgroundImage = "none";
    })
}

playButton.addEventListener('click', function () {
    window.location.href = "homePage.html"
})

function pngSpeaking() {

    let delay = 80;
    let delay_start = 0;
    let contents;
    let letters;

    let elem = document.getElementById('comment')

    if (elem) {
        contents = elem.textContent.trim();
        elem.textContent = "";
        letters = contents.split("");
        elem.style.visibility = 'visible';

        letters.forEach(function (letter, index_1) {
            setTimeout(function () {
                elem.textContent += letter;

            }, delay_start + delay * index_1);
        });
        delay_start += delay * letters.length;
    };
}




pngSpeaking();
actionButton();

