import {ANSWERS, DICTIONARY} from './dictionary.js'
let wordCounter = 1;
let wordLimit = 6;
let correctWord = "";
setAnswer();
//Add the function to the bar on the page
const form = document.getElementById('form');
form.addEventListener("submit", inputSubmit)

form.addEventListener("animationend",(e)=>{
    form.classList.remove("apply-shake");
})

//Picks a random word to be the correct Answer
function setAnswer(){
    //pick a word from the answers dictionary.
    correctWord = ANSWERS[Math.floor(Math.random()*ANSWERS.length)].toUpperCase();
    //console.log("ANSWER: ",correctWord)
}

//Checks if a guessed word is in dictionary
function validateWord(guess){
    //check if guess is in the dictionary 
    return (DICTIONARY.includes(guess.toLowerCase()) || ANSWERS.includes(guess.toLowerCase()))
}

//Take input from user
function inputSubmit(event) {
    //Get input from bar
    let input = document.getElementById("input").value.toUpperCase();
    document.getElementById("input").value = "";
    //console.log(input);

    //validate word
    if (validateWord(input)) {
        //fill it into the word 
        fillWord(input, wordCounter);
    }
    else{
        //word isnt valid, give some feedback
        //shake the screen a bit 
        form.classList.add("apply-shake");
        
    }

    //Prevent page change  
    event.preventDefault();

    //If last word is filled, remove the bar. 
    if (wordCounter > wordLimit) {
        document.getElementsByClassName("input")[0].style.visibility = "hidden";
    }
}

//Display input on the screen
function fillWord(filling, wordNum) {
    //Dont fill more words after the limit.
    if (wordCounter <= wordLimit) {

        //Get all the letters out of the word
        let word = document.getElementsByClassName("word" + wordNum)[0].children;
        
        //Copy correctWord
        let correct = correctWord;

        //compare input to correctWord


        //Only fill 5 letters, one per box
        for (let x = 0; x < 5; x++) {
            //Put letter in box
            word[x].innerHTML = filling[x]

            //If letter matches place in correct, make it green
            if (filling[x] === correct[x]) {
                word[x].style.backgroundColor = "green";
                correct = correct.replace(filling[x], "_")
            }
            //If letter is in the word, but not correct, make yellow.
            else if (correct.includes(filling[x])) {
                correct = correct.replace(filling[x], "_")
                word[x].style.backgroundColor = "yellow";
            }
            else {
                word[x].style.backgroundColor = "red";
            }
           
        }
        checkWin(filling);

        //inc word counter
        wordCounter++;
    }
}

//Display a winning or losing message
function checkWin(guess) {
    if (guess === correctWord.toUpperCase()) {
        document.getElementsByClassName("game")[0].style.opacity = .5;
        document.body.style.backgroundColor = "pink";
        document.body.innerHTML += "<p align='center'>YOU GOT IT BABE <br> JUST " + wordCounter + " TRIES</p>"
        + "<br> <button onclick='location.reload()'>REPLAY</button>"
    }
    else if (wordCounter >= wordLimit) {
        document.getElementsByClassName("game")[0].style.opacity = .5;
        document.body.style.backgroundColor = "gray";
        document.body.innerHTML += "<p align='center'>Missed it this time... <br> It was " + correctWord + ". :/</p>"
        + "<br> <button onclick='location.reload()'>REPLAY</button>"
    }
}



