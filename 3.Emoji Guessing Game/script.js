const mappedEmoji=[
    {emoji:'🙂', description:'smiley'},
    {emoji:'⭐', description:'star'},
    {emoji:'❤️', description:'heart'},
    {emoji:'🐒', description:'monkey'},
    {emoji:'🍕', description:'pizza'}
];

let curIndex=0;
let score=0;
let time=30;
let intervalId;

const emojiDisplaySpace=document.getElementById("emoji-display");
const answerOutput=document.getElementById("answer");
const finalScore=document.getElementById("score");
const guessInput=document.querySelector("input");
const tickingTime=document.getElementById("timer");
const restartBtn = document.getElementById("btn"); 

function displayEmoji(){
    emojiDisplaySpace.textContent=mappedEmoji[curIndex].emoji;
}

function nextEmoji(){
    answerOutput.textContent='';
    curIndex++;
    if(curIndex<mappedEmoji.length){
        displayEmoji();
    }
    else
    {
        endQuiz();
    }
    
}

function endQuiz(){
     clearInterval(intervalId);
    emojiDisplaySpace.textContent='🎉🥳';
    answerOutput.textContent="You've completed the Game!!";
    guessInput.disabled = true;
    restartBtn.hidden = false;
    restartBtn.addEventListener('click',restartQuiz);
}

function guessLogic(){
    const userans=guessInput.value.trim().toLowerCase();
   const correctAns=mappedEmoji[curIndex].description;
   if(userans===correctAns){
    answerOutput.textContent="Correct!";
        score++;
    finalScore.textContent=`Score:${score}`;

   }
   else{
    answerOutput.textContent="Wrong!";
    finalScore.textContent=`Score:${score}`;

   }
    guessInput.value='';
    guessInput.focus();
    setTimeout(function(){
    nextEmoji();
    },1000);
   

}

function startTimer(){
    clearInterval(intervalId); 
    //time = 30;
    tickingTime.textContent=`${time}s`;
    intervalId=setInterval(function(){
        if(time>0)
        {
            time--;
             tickingTime.textContent=`${time}s`;
        }
        else
        {
            clearInterval(intervalId);
            guessInput.disabled=true;
        }
    },1000);
}

function restartQuiz(){
    curIndex=0;
    score=0;
    time=30;
    finalScore.textContent=`Score:${score}`;
    answerOutput.textContent='';
    guessInput.disabled=false;
     guessInput.focus();
     restartBtn.hidden = true; 
    displayEmoji();
     startTimer();
     
}
guessInput.addEventListener('keydown',function(event){
    if(event.key==='Enter')
        guessLogic();
})

document.addEventListener('DOMContentLoaded',function(){
    displayEmoji();
    startTimer();
})

restartBtn.addEventListener('click', restartQuiz);





