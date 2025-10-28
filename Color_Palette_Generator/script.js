const generateBtn = document.getElementById('generate-btn');
const paletteContainer = document.querySelector('.palette-container');

generateBtn.addEventListener('click', generatePalette);

paletteContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains("copy-btn")) {
        const hexValue = event.target.previousElementSibling.textContent;

        navigator.clipboard.writeText(hexValue).then(() => showCopySuccess(event.target)).catch(err => console.error('Could not copy text: ', err));
    } else if (event.target.classList.contains("color")) {
        const hexValue = event.target.nextElementSibling.querySelector(".hex-value").textContent;
        navigator.clipboard.writeText(hexValue).then(() => showCopySuccess(event.target.nextElementSibling.querySelector(".copy-btn"))).catch(err => console.error('Could not copy text: ', err));
    }
});

function showCopySuccess(element) {
    element.classList.remove("far", "fa-copy");
    element.classList.add("fas", "fa-check");
    element.style.color = "green";

    setTimeout(() => {
        element.classList.remove("fas", "fa-check");
        element.classList.add("far", "fa-copy");
        element.style.color = "";
    }, 1000);
 }

function generatePalette() {
    const colors = [];
    for (let i = 0; i < 5; i++){
        colors.push(getRandomColor());
    }

    updatePaletteDisplay(colors);
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function updatePaletteDisplay(colors) {
    const colorBoxes = document.querySelectorAll('.color-box');

    colorBoxes.forEach((box, index) => {
        const color = colors[index];
        const colorDiv = box.querySelector('.color');
        const hexValue = box.querySelector('.hex-value');

        colorDiv.style.backgroundColor = color;
        hexValue.textContent = color;
    });
}

// Initial palette generation on page load
generatePalette();