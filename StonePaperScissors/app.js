let userScore=0;
let compScore=0;

const choices=document.querySelectorAll('.choice');
const msg=document.querySelector("#msg");
const uscore=document.querySelector("#user-score")
const cscore=document.querySelector("#comp-score")

const genCompChoice=()=>{
    const options=["rock","paper","scissors"];
    const randIdx=Math.floor(Math.random()*3);
    return options[randIdx];
}

const drawGame=()=>{
   // console.log(" Draw !");
    msg.innerText=" You Draw ! ";
    msg.style.backgroundColor="#081310";
} 

const showWinner=(userWin,userChoice,compChoice)=>{
    if(userWin){
        //console.log(" You win ! " );
        msg.innerText=`You Win ! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor="green";
        userScore++;
        uscore.innerText=userScore;

    }else{
        //console.log(" You Lose ! ");
        msg.innerText=`You Lose ! Computer ${compChoice} beats Your ${userChoice}`;
        msg.style.backgroundColor="red";
        compScore++;
        cscore.innerText=compScore;
    }
}

const playGame=(userChoice)=>{
  //  console.log("user choice = ",userChoice)
    const compChoice=genCompChoice();
    console.log("computer choice = ",compChoice);

    if(userChoice==compChoice){
        drawGame();
    }else{
        let userWin=true;
        if(userChoice==='rock'){
            userWin=compChoice==='paper' ? false:true;
        }else if(userChoice==='paper'){
            userWin=compChoice==='scissors'? false:true; 
        }else{
            userWin=compChoice==='rock'?false:true;
        }
        showWinner(userWin,userChoice,compChoice);
    }
}

choices.forEach(choice => {
    choice.addEventListener('click',()=>{
    
        const userChoice = choice.getAttribute('id');
        playGame(userChoice);
    });
});