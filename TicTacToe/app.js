let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn")
let newGameBtn=document.querySelector("#new-btn")
let msgContainer=document.querySelector(".msg-container")
let msg=document.querySelector("#msg")


let turnO=true; // true for O and false for X
let count=0; 

const winPatterns =[
    [0,1,2] ,[3,4,5] , [6,7,8] , // Horizontal
    [1,4,7] , [2,5,8] , [0,3,6] , // Vertical
    [0,4,8] , [2,4,6] ,// Diagonal
] ; 

const resetGame = () => {
    turnO = true; // Reset turn to O
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
      //  console.log("Box was Clicked !");
       // box.innerText=turnO;
count++; 
    if(turnO) {
        box.innerText = "O";
        box.style.color = "blue"; 
        turnO = false; 
    }else{
        box.innerText = "X";
        box.style.color = "red";
        turnO = true; 
    }

    box.disabled=true; //It helps to avoid change in the choice after the first click i.e. it want allow double click to the same button/box

    let isWinner=checkWinner();
    });
});

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};
const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = ""; // Clear the text in the boxes
    }
};

const showWinner=(winner)=>{
    msg.innerText=`Congratulations!!! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showDraw=(winner)=>{
    msg.innerText=`Match Draw!!!`;
    msgContainer.classList.remove("hide");
};

const checkWinner = () => {

    for(let pattern of winPatterns){
       // console.log(pattern[0],pattern[1],pattern[2]);
        // console.log(boxes[pattern[0]],boxes[pattern[1]],boxes[pattern[2]])
        //console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);

        let pos1Val= boxes[pattern[0]].innerText;
        let pos2Val= boxes[pattern[1]].innerText;
        let pos3Val= boxes[pattern[2]].innerText;

        
        if (pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if (pos1Val === pos2Val && pos2Val === pos3Val){
               // console.log("Winner");
               showWinner(pos1Val);
               return true;
            }else if (count === 9) {
                showDraw();
            }
        }
    }

};


resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);

