let boxes = document.querySelectorAll('.box')
let resetbtn = document.getElementById('reset')
let msgcontain = document.querySelector('.win-msg')
let gamebtn = document.querySelector('#new-game')
let msg = document.querySelector('#msg')


let turnO = true

const WinningPattern = [
    [0,1,2],
    [3,4,5],
    [3,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6],  
]

boxes.forEach((boxes) => {
    boxes.addEventListener("click",()=>{

        if (turnO) {
            boxes.innerText='X'
            turnO = false;
        }
        else{
            boxes.innerText='O'
            turnO = true;
        }

        boxes.disabled = true

        checkWinner();
     })
});

function checkWinner()
{
    for(pattern of WinningPattern )
    {
        let position1 = boxes[pattern[0]].innerText
        let position2 = boxes[pattern[1]].innerText
        let position3 = boxes[pattern[2]].innerText

        if (position1 != "" && position2 != "" && position3 != "")
        {
            if (position1 == position2 && position2 == position3) {
                showWinner(position1)
            }    
        }

    }
}

function showWinner(winner)
{
    msg.innerText = `Congratulations, Winner is ${winner}`
    msgcontain.classList.remove("hide");
    buttonDisabled()
}

function buttonDisabled()
{
    for(let boxDisabled of boxes)
    {
        boxDisabled.disabled = true
    }
}

function resetGame()
{
    turnO = true;
    buttonEnabled()
    msgcontain.classList.add('hide')

}
function buttonEnabled()
{
    for(boxEnabled of boxes)
    {
        boxEnabled.disabled = false
        boxEnabled.innerText = ""
    }
}

gamebtn.addEventListener("click",resetGame)
resetbtn.addEventListener('click',resetGame)