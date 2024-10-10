const hangmanImage = document.querySelector('.hangman-box img')
const keyboardDiv = document.querySelector(".keyboard")
const wordDisp = document.querySelector(".word-display")
const hintDisp = document.querySelector(".hint-text b")
const guessText = document.querySelector(".guess-text b")
const button = document.querySelector("button")
const gameModel = document.querySelector(".game-model")
const playAgainBtn = document.querySelector(".play-again")

let correctLetter = []
let currentWord,wrongGuess =0;
const maxGuess = 6

function resetGame()
{
    console.log("Hello")
    correctLetter = []
    wrongGuess = 0
    wordDisp.innerHTML = currentWord.split("").map(()=>`<li class="letter"></li>`).join("")
    gameModel.classList.remove("show")
    // gameModel.classList.add("Game")
    hangmanImage.src ="./images/hangman-"+wrongGuess+".svg"
    guessText.innerText = `${wrongGuess} / ${maxGuess}`
    // keyboardDiv.querySelectorAll("button").forEach(btn=>btn.disabled=false)
}


const getRandomWord = ()=>{

    //SELECTING A RANDOM WORD AND HINT FROM THE WORDLIST
    const a = Math.random()*wordList.length
    const{word,hint} = wordList[Math.floor(a)]
    console.log(word)

    currentWord = word
    //displaying the hint in the browser
    hintDisp.innerText = hint

    //creating the space of the word as per the word length
    wordDisp.innerHTML = word.split("").map(()=>`<li class="letter"></li>`).join("")
}


const initGame = (clickedLetter) => {
    //CHECKING IF THE CLICKEDLETTER EXIST IN THE CURRENTWORD
    if(currentWord.includes(clickedLetter))
    {

        //SHOWING ALL THE CORRECT LETTERS ON THE BROWSER
        [...currentWord].forEach((letter,index)=>{
            if(letter === clickedLetter)
            {
                correctLetter.push(letter)
                wordDisp.querySelectorAll("li")[index].innerText = letter
                wordDisp.querySelectorAll("li")[index].classList.add("guessed")
            }
        })
    }
    else{
        //IF THE LETTER IS WRONG THEN UPDATE THE IMAGE ON THE BRWOSER
        wrongGuess++
        hangmanImage.src ="./images/hangman-"+wrongGuess+".svg"
    }
    button.disabled = true;
    guessText.innerText = `${wrongGuess} / ${maxGuess}`

    if(wrongGuess === maxGuess)
    {
        return gameOver(false)
    }
    if(correctLetter.length === currentWord.length)
    {
        // console.log(correctLetter)
        return gameOver(true)
    }
}

const gameOver= (isVictory)=>{
    setTimeout(()=>{
        const modelText = isVictory?`You found the word:` : `The correct word was: `
        gameModel.querySelector("img").src = `./images/${isVictory?'victory': 'lost'}.gif`

        gameModel.querySelector("h4").innerText = `${isVictory ? 'Congratulations!': 'Game Over!'}`
        
        gameModel.querySelector("p").innerHTML = `${modelText} <b>${currentWord}</b>`

        gameModel.classList.add("show")
    },300)
}


//CREATING KEYBOARD BUTTONS
for (let i = 97; i <=122; i++)
{
    function display(e)
    {
        initGame(e) 
    }   
}

getRandomWord();

function again()
{
    console.log("Clicked")
    // getRandomWord()
    // resetGame()
}