const wordElement = document.getElementById('word');
const wrongLettersElement = document.getElementById('wrong-letters');
const hangmanElement = document.getElementById('hangman');
const letterInput = document.getElementById('letter-input');
const guessButton = document.getElementById('guess-button');
const restartButton = document.getElementById('restart-button');
const manDisplay = document.getElementById('man');
const bgDisplay = document.getElementById('page');
const gameContainer = document.getElementById('game-container');
const header = document.getElementById('header');
const gameRule = document.getElementById('game-rule');
var specialMode = false;

const words = ['pancake', 'kitten', 'stars', 'lovely', 'syrup', 'rainbow', 'flesh', 'blood'];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let correctLetters = [];
let wrongLetters = [];


function stateReset() {
    correctLetters = [];
    wrongLetters = [];
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
    updateWrongLetters();
    checkSpecialChange();
}


// modals

const modal = document.getElementById("myModal");
const modalContent = document.getElementById("modal-content");
const span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    modalContent.innerHTML = " "
    if (selectedWord != 'flesh' || selectedWord != 'blood') {
        if (specialMode = false) {
            stateReset();
        }
    }
}

//----------------------------------------

function displayWord() {
    wordElement.innerHTML = `
        ${selectedWord
            .split('')
            .map(
                letter => `
                <span class="letter">
                    ${correctLetters.includes(letter) ? letter : '_'}
                </span>
                `
            )
            .join('')}
    `;
}

function checkSpecialChange() {
    if (selectedWord == 'flesh' || selectedWord == 'blood') {
        if (wrongLetters.length >= 5) {
            specialMode = true;


            setTimeout(() => {
                manDisplay.src = 'images/man-shook1.png'
            }, 1000)
            setTimeout(() => {
                manDisplay.src = 'images/man-shook2.png'
            }, 500)
            manDisplay.src = 'images/man-strugle.gif'


            bgDisplay.style.backgroundImage = 'url("images/special-bg.jpg")' // change BG image
            header.style.color = 'white' // change header
            header.style.fontFamily = 'Times New Roman, Times, serif'
            gameRule.style.color = 'white'

            Object.assign(gameContainer.style, { // change game body
                border: '6px dashed black',
                backgroundColor: 'rgb(183, 31, 31)'
            });
            // change the elements inside the game body
            Object.assign(wordElement.style, {
                backgroundColor: 'black',
                color: 'red'
            });
            Object.assign(guessButton.style, {
                backgroundColor: 'black',
                color: 'red'
            });
            Object.assign(restartButton.style, {
                backgroundColor: 'black',
                color: 'red'
            });
            Object.assign(letterInput.style, {
                backgroundColor: 'black',
                color: 'red'
            });

        } else {
            specialMode = false;
            bgDisplay.style.backgroundImage = 'url("images/normal-bg.jpeg")'
            header.style.color = 'rgb(255, 0, 119)'
            header.style.fontFamily = 'cursive'
            gameRule.style.color = 'black'

            Object.assign(gameContainer.style, {
                border: '6px dashed rgb(255, 169, 175)',
                backgroundColor: '#ffdcdc'
            });

            Object.assign(wordElement.style, {
                backgroundColor: 'rgb(255, 169, 175)',
                color: 'white'
            });
            Object.assign(guessButton.style, {
                backgroundColor: 'rgb(255, 169, 175)',
                color: 'white'
            });
            Object.assign(restartButton.style, {
                backgroundColor: 'rgb(255, 169, 175)',
                color: 'white'
            });
            Object.assign(letterInput.style, {
                backgroundColor: 'rgb(255, 169, 175)',
                color: 'white'
            });
        }

    } else {
        specialMode = false;
        bgDisplay.style.backgroundImage = 'url("images/normal-bg.jpeg")'
        header.style.color = 'rgb(255, 0, 119)'
        header.style.fontFamily = 'cursive'
        gameRule.style.color = 'black'

        Object.assign(gameContainer.style, {
            border: '6px dashed rgb(255, 169, 175)',
            backgroundColor: '#ffdcdc'
        });

        Object.assign(wordElement.style, {
            backgroundColor: 'rgb(255, 169, 175)',
            color: 'white'
        });
        Object.assign(guessButton.style, {
            backgroundColor: 'rgb(255, 169, 175)',
            color: 'white'
        });
        Object.assign(restartButton.style, {
            backgroundColor: 'rgb(255, 169, 175)',
            color: 'white'
        });
        Object.assign(letterInput.style, {
            backgroundColor: 'rgb(255, 169, 175)',
            color: 'white'
        });
    }
}

function updateWrongLetters() {
    wrongLettersElement.innerHTML = `
        <p>Wrong Letters : 
        ${wrongLetters.join(', ')}</p>
    `;
}

function checkWin() {
    if (selectedWord.split('').every(letter => correctLetters.includes(letter))) {
        
        if (wrongLetters.length <= 1) {
            modalContent.innerHTML = "Wonderful-!! You got it perfectly!"
        } else {
            if (wrongLetters.length <= 4) {
                modalContent.innerHTML = "Good job! You got the right word!"
            } else {
                if (wrongLetters.length = 5) {
                    modalContent.innerHTML = "Phew! What a narrow victory!..."
                
                } else {modalContent.innerHTML = "something went wrong!"}
            }
        }
        modal.style.display = "block";
    }

}

function checkLose() {
    if (wrongLetters.length >= 6) {
        modalContent.innerHTML = "Uh oh! You lose, what a shame... the word was " + selectedWord + "!"
        modal.style.display = "block";
    }
}

guessButton.addEventListener('click', () => {
    const letter = letterInput.value.toLowerCase();

    if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
            correctLetters.push(letter);
            displayWord();
            checkWin();

            if (specialMode == false) {
                manDisplay.src = 'images/man-not-pleased.png'
            setTimeout(() => {
                manDisplay.src = 'images/man-normal.png'
            }, 2000)
            } else {
                manDisplay.src = 'images/man-strugle.gif'
            }
        }
    } else {
        if (!wrongLetters.includes(letter)) {
            wrongLetters.push(letter);
            updateWrongLetters();
            checkLose()
            checkSpecialChange();
            
            if (specialMode == false) {
                manDisplay.src = 'images/man-mock.png'
            setTimeout(() => {
                manDisplay.src = 'images/man-normal.png'
            }, 2000)
            } else {
                manDisplay.src = 'images/man-strugle.gif'
            }
        }
    }
    letterInput.value = '';
});

restartButton.addEventListener('click', () => {
    stateReset();
});

displayWord();
