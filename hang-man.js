const phrases = [
    // "XXXX XX XXXX X",
    // "fox jumped over the lazy dog",

    "ITALY",
    "SPAIN",
    "GREECE",
    "CHILE",
    "JAPAN",
    "EGYPT",
    "CANADA",
    "UNITED STATES",
    "BRAZIL",
    "MOROCCO"
];


const wrongDisplay = document.querySelectorAll('.wrong .cross');
const radioButtons = document.querySelectorAll('.radio i');
const alphabetButtons = document.querySelectorAll('.alhpabets input[type="button"]');
const phraseBox = document.getElementById('box');
const boxInput = document.querySelectorAll("#box input[type='button']");


const usedPhrasesContainer = document.getElementById("usedPhrases");
const correctElement = document.getElementById("correct");
const incorrectElement = document.getElementById("incorrect");
const percentageElement = document.getElementById("percentage");

// debugger;
let correctGuesses = 0;
let incorrectGuesses = 0;
let usedPhrases = [];
let currentPhrase = "";
let wrongAttempts = 0;
const maxAttempts = 4;
let index = 0;


function start() {
    const start = document.getElementById("start");
    const container = document.getElementById("container");
    container.style.visibility = "visible";
    start.style.visibility = "hidden";

    wrongAttempts = 0;
    wrongDisplay[0].style.color = 'transparent';
    wrongDisplay[1].style.color = 'transparent';
    wrongDisplay[2].style.color = 'transparent';
    wrongDisplay[3].style.color = 'transparent';

    // Check if all phrases have been used
    if (usedPhrases.length === phrases.length) {
        gameFinished();
        return;
    }

    let randomPhrase;
    do {
        randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    } while (usedPhrases.includes(randomPhrase)); // Ensure the phrase hasn't been used

    currentPhrase = randomPhrase.toUpperCase();
    console.log(currentPhrase);

    // Mark the selected phrase as used
    usedPhrases.push(currentPhrase);

    defaultColors();
    updatePhraseBox();

    alphabetButtons.forEach(button => {
        button.disabled = false;
        button.onclick = () => guessLetter(button);
    });
}

function updatePhraseBox() {
    // Clear previous values and styles without removing the buttons
    Array.from(phraseBox.children).forEach((button, index) => {
        if (currentPhrase[index] === undefined) {
            button.value = '';
        } else {
            button.value = currentPhrase[index] === ' ' ? ' ' : `${button.style.backgroundColor = "               #84B41E"}`;
            button.disabled = true;
        }
    })
};
function defaultColors() {
    alphabetButtons.forEach(button => {
        button.style.backgroundColor = '#93c924';
        button.disabled = false;
        button.style.color = 'white';
        button.style.border = 'solid darkgreen';
    })
};

function guessLetter(button) {
    const letter = button.value;
    let correctGuess = false;

    //Disable the button once clicked and change its color
    button.disabled = true;
    button.style.backgroundColor = '#DEBA14';
    button.style.color = '#DCC16C';
    button.style.borderColor = '#EED23C';

    for (let i = 0; i < currentPhrase.length; i++) {
        if (currentPhrase[i] === letter) {
            phraseBox.children[i].value = letter;
            phraseBox.children[i].style.fontSize = '46px';
            phraseBox.children[i].style.fontWeight = '700';
            phraseBox.children[i].style.color = 'white';
            correctGuess = true;
        }
    }

    if (!correctGuess) {
        wrongAttempts++;
        if (wrongAttempts < maxAttempts) {
            wrongDisplay[wrongAttempts - 1].style.color = 'red';
        } else {
            alert(`The phrase was: ${currentPhrase}`);
            if (radioButtons.length > 0) {
                radioButtons[index].style.color = 'red';
                index++;
            }
            incorrectGuesses++;
            reset();
            start(); // Restart the game
        }
    }
    setTimeout(() => {
        if ([...phraseBox.children].every(btn => btn.value !== "               #84B41E")) {
            if (radioButtons.length > 0) {
                radioButtons[index].style.color = 'green';
            }
            alert("Congratulations! You've guessed the phrase!");
            correctGuesses++;
            index++;
            reset();
            start();
        }
    }, 100);
}
function reset() {
    boxInput.forEach(button => {
        button.style.backgroundColor = 'transparent';
        button.value = '';
        defaultColors();
    });
}
function gameFinished() {
    const start = document.getElementById("start");
    const container = document.getElementById("container");
    const gameEnd = document.getElementById("end");

    container.style.visibility = "hidden";
    start.style.visibility = "hidden";
    gameEnd.style.visibility = "visible";

    correctElement.innerText = correctGuesses;
    incorrectElement.innerText = incorrectGuesses;

    const percentage = ((correctGuesses / phrases.length) * 100).toFixed(2);
    percentageElement.innerText = `${percentage}%`;

    // usedPhrasesContainer.innerHTML = usedPhrases.join("<br>");
    usedPhrasesContainer.innerHTML = usedPhrases
        .map((phrase, index) => ` ${index + 1}) ${phrase}`)
        .join("<br>");
}

