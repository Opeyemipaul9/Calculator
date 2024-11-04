const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn  = document.getElementById('clear-btn');

// calculate first and second values depending on operators
const calculate = {
    '/' : (firstNumber, secondNumber)=> firstNumber / secondNumber,

    '*' : (firstNumber, secondNumber)=> firstNumber * secondNumber,

    '+' : (firstNumber, secondNumber)=> firstNumber + secondNumber,

    '-' : (firstNumber, secondNumber)=> firstNumber - secondNumber,

    '=' : (firstNumber, secondNumber)=>  secondNumber,
}

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number){
    // replace current display value of first value is entered
    if(awaitingNextValue){
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    }else{
    // if current display is 0 , replace it , if not add number
    const displayValue =  calculatorDisplay.textContent
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    
    }
}

// adding decimals
function addDecimal(){
    // if operator pressed , dont add decimal
    if(awaitingNextValue)
     return;
    // if no decimal , add one
    if(!calculatorDisplay.textContent.includes('.'))[
       calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
    ]
}

function useOperator(operator){
    const currentValue = Number(calculatorDisplay.textContent);
   
    // prevent multiple operators
    if(operatorValue && awaitingNextValue) { 
     operatorValue = operator
     return;
    }

    // Assign firstValue if no Value
    if(!firstValue){
     firstValue = currentValue;
    }else{
        const calculation = calculate[operatorValue](firstValue, currentValue)
        console.log(firstValue,  currentValue);
        console.log('calculation', calculation);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }

    // Ready for next value, store operator
    awaitingNextValue = true;
    operatorValue = operator;   
}

// Reset Display
function resetAll(){
 firstValue = 0;
 operatorValue = '';
 awaitingNextValue = false;
 calculatorDisplay.textContent = '0';
}


// Add Event listeners for numbers , operatord , decimal buttons
inputBtns.forEach((button) =>{
    if(button.classList.length === 0){
        button.addEventListener('click',() => sendNumberValue(button.value));
    } else if(button.classList.contains('operator')){
        button.addEventListener('click',() => useOperator(button.value)); 
    }
    else if(button.classList.contains('decimal')){
        button.addEventListener('click',() => addDecimal()); 
    }

});

// Event listener to reset Buttons
clearBtn.addEventListener('click' , resetAll);