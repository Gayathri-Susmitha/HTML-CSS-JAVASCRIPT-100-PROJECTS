let para='The quick brown fox jumps over the lazy dog. Sphinx of black quartz, judge my vow. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump !';

const sentence=document.getElementById('sentence');
const typedField=document.getElementById('input');
const startBtn=document.getElementById('start-btn');
const tickingTime=document.getElementById('timer');
const resultDiv=document.getElementById('result');
const typingSpeed=document.getElementById('typing-speed');
const typingAccuracy=document.getElementById('accuracy');
const restartBtn=document.getElementById('restart-btn');

let time=30;
let intervalID;

function startTimer(){
    clearInterval(intervalID);
    tickingTime.textContent=`00:${time}`;
    intervalID=setInterval(function(){
        time--;
        if(time>=10)
        tickingTime.textContent=`00:${time}`;
        else if(time<10 && time>=0)
        tickingTime.textContent=`00:0${time}`;

        if(time<=0)
        {
           endTimer();

        }

    },1000);
}

function endTimer(){
    clearInterval(intervalID);
    typedField.disabled=true;
    resultDiv.style.display="block";
    startBtn.disabled=true;
    typingCalc();
}


function startTest(){
    clearInterval(intervalID);
    sentence.textContent = para;
    time=30;
    sentence.style.display='block';
    startTimer();
    typedField.disabled=false;
    startBtn.disabled=true;
}

function retakeTest(){
    clearInterval(intervalID);
    startBtn.disabled=false;
    resultDiv.style.display="none";
    typedField.value='';
    typedField.disabled=true;
}

let correctWords=0;
function typingCalc(){
    const typedText=typedField.value;
    const originalText=para;

    const typedWords=typedText.split(' ').filter(function(word){
        return word!=='';
    });

    const originalWords=originalText.split(' ').filter(function(word){
        return word!=='';
    });

    let correctWords=0;
    for(let i=0;i<typedWords.length;i++){
        if(typedWords[i]===originalWords[i])
            correctWords++;
    }

    let correctCharacters=0;
    for(let i=0;i<typedText.length;i++){
        if (typedText[i] === originalText[i]) {
            correctCharacters++;
        }
    }

    const speed=(correctWords/30)*60;
    const accuracy=((correctCharacters/typedText.length)*100).toFixed(2);

    typingSpeed.textContent = `Typing Speed: ${speed} WPM`;
    typingAccuracy.textContent = `Accuracy: ${accuracy}%`;
}


startBtn.addEventListener('click',startTest);

restartBtn.addEventListener('click',retakeTest);
