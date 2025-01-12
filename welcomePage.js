const playButton = document.getElementById('playButton')
const buttonSelected = document.getElementById('selected')


const actionButton = () => {

playButton.addEventListener('mouseenter', function () {

    buttonSelected.style.backgroundImage = "url(pictures/TriangleSelector.svg)";
})

playButton.addEventListener('mouseleave', function () {

    buttonSelected.style.backgroundImage = "none";
})
}

playButton.addEventListener('click', function() {
    window.location.href = "homePage.html"
})

actionButton();

