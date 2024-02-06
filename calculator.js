let numericButtons = document.querySelectorAll('.numeric-btn');
let opButtons = document.querySelectorAll('.op-btn');
let currentScreen = document.querySelector('.screen .current');
let previousScreen = document.querySelector('.screen .previous');

let clearButton = document.querySelector('.clear');
let backspaceButton = document.querySelector('.backspace');
let evaluateButton = document.querySelector('.eval-btn');
function operate(num1, op, num2){
    console.log(`Recieved: ${num1} ${op} ${num2}`);
    let result;
    if(op === '+') 
        result =  num1 + num2;
    if(op === '-')
        result =  num1 - num2;
    if(op === '*')
        result =  num1 * num2;
    if(op === '/')
        result =  num1 / num2;
    console.log(`Recieved: ${num1} ${op} ${num2} returned ${result}`);
    return result;
}
function appendToScreen(text){
    currentScreen.textContent += text;
}
function putOnScreen(text){
    currentScreen.textContent = text;
}
function putOnPreviousScreen(text){
    previousScreen.textContent = text;
}

let currentInput = "";
let previousInput = "";
let op = "";
let previousOp = "";
function digitClicked(e){
    //console.log(buffer);
    currentInput += e.target.textContent;
    appendToScreen(e.target.textContent);
}

function opClicked(e){
    if (previousInput == ''){ //operator pressed for first time
        previousOp = e.target.textContent;
        previousInput = currentInput;
        putOnPreviousScreen(previousInput+' '+previousOp);
        putOnScreen('');
        currentInput = '';   
    }
    else if(op == ""){
        op = e.target.textContent;
        if(currentInput === ''){
            previousOp = op;
            putOnPreviousScreen(previousInput+' '+previousOp);
            op = "";
        }
        else {
            let result = operate(Number(previousInput), previousOp, Number(currentInput));
            previousInput = result;
            putOnPreviousScreen(previousInput+' '+op);
            putOnScreen('');
            currentInput = "";
            previousOp = op; 
            op = "";
        }
    }

}

function evaluate(){
    let result = operate(Number(previousInput), previousOp, Number(currentInput));
    putOnScreen(result);
    putOnPreviousScreen('');
    return result;
}


evaluateButton.addEventListener('click', evaluate);

clearButton.addEventListener('click', (e)=>{
    currentScreen.textContent = '';
    previousInput = "";
    currentInput = "";
    op = "";
    previousOp = "";
    putOnPreviousScreen('');
});

backspaceButton.addEventListener('click',(e)=>{
    currentScreen.textContent = currentScreen.textContent.slice(0,-1);
    currentInput = currentScreen.textContent;
});

numericButtons.forEach((button) => {
    button.addEventListener('click',digitClicked);
});

opButtons.forEach((button) => {
    button.addEventListener('click',opClicked);
});