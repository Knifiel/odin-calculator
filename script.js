const display = document.querySelector(".display");

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener("click", event =>{
        button.classList.add('pushed');
        input(button.dataset.but);
    });
})
function removePushed(e){
    if(e.propertyName !== "transform") return; // skip it if it's not a transform
    this.classList.remove('pushed'); 
  }

  buttons.forEach(button => button.addEventListener('transitionend', removePushed));


//keyboard support
window.addEventListener("keydown", key =>{
    switch(true){
    case ((/[0-9\.\-\+\*\/\=]/).test(key.key)):
        input(key.key);
        document.querySelector(`[data-but="${key.key}"]`).classList.add('pushed');
        break;    
    case ((key.key === "Backspace")||(key.key === "Delete")):
        input("back");
        document.querySelector(`[data-but="back"]`).classList.add('pushed');
        break;
    case (key.key === "Enter"):
        input('=');
        document.querySelector(`[data-but="="]`).classList.add('pushed');
        break;
    case ((key.key === "c")||(key.key === "Escape")):
        input("clear");
        document.querySelector(`[data-but="clear"]`).classList.add('pushed');
        break;}
})

const firstOperand = {
    value: "0",
};
const secondOperand = {
    value: "",
};
const operator = {
    value: "",
};
let currentOperand = firstOperand;

updateDisplay();

//Main input logic
function input(button){
    switch(button){
        //Clear operator - set all variable names to starting ones 
        case "clear":
        firstOperand.value = "0";
        secondOperand.value = "";
        operator.value = "";
        currentOperand = firstOperand;
        updateDisplay();
        break;

        //decimal operator
        case ".":
        if((currentOperand.value == "0")||(currentOperand.value == '')){
            currentOperand.value = '0.';
        } else if(firstOperand.value == "-"){
            currentOperand.value = '-0.';
        } else if((/\./).test(currentOperand.value)){ 
            break;
        } else {
            currentOperand.value += button;
        }
        updateDisplay();
        break;
            
        //backspace operator - do nothing if current operand is empty, otherwise remove last digit.
        case "back":
            if(currentOperand.value.length == 0){
                break;
            } else {
                currentOperand.value = currentOperand.value.slice(0, -1);
                updateDisplay();
                break;
            }


        //number inputs
        case '0': 
        case '1':
        case '2': 
        case '3': 
        case '4': 
        case '5': 
        case '6':
        case '7':
        case '8':
        case '9':
        if(currentOperand.value == "0"){ //if first operand is still at zero, assign pressed button instead of concatenating to it
            currentOperand.value = button;
        } else if (firstOperand.value == "-"){
            currentOperand.value += button;
        } else {
            currentOperand.value += button;
        }
        updateDisplay();
        break;
        
        //operators
        //first case for any operator checks if second operand isn't empty string and calls operate function if true
        case "-":
            if(secondOperand.value != ""){ 
                operate(button);
                break;
            }
        if((firstOperand.value == "0") || (firstOperand.value == "-")){ // if first operand is 0 (or already negative). make it negative 
            currentOperand.value = "-";
            } else if (currentOperand.value != ""){  
            operator.value = button;
            currentOperand = secondOperand;
            }
            updateDisplay();
            break;

        
        case "+":
        if(secondOperand.value != ""){
            operate(button);
            break;
        }
        if(firstOperand.value == "-"){ // if first operand is negative, make it positive
            currentOperand.value = "0";
        } else if ((currentOperand.value != "")||(currentOperand.value = "0")){
            operator.value = button;
            currentOperand = secondOperand;
        }
        updateDisplay();
        break;
        
        case '*':
        case '/':
            if(secondOperand.value != ""){
                operate(button);
                break;
            }
            operator.value = button;
            currentOperand = secondOperand;
            updateDisplay();
            break;
        
        case '=':
        if(secondOperand.value != ""){
            operate(button);
            break;
        }
        break;
    }
}

function operate(button){
    let result;
    let a;
    let b;
    
    //parse to floats in case any of operands is a float
    if((/\./).test(firstOperand.value)||(/\./).test(secondOperand.value)){
        a = parseFloat(firstOperand.value);
        b = parseFloat(secondOperand.value);
    } else {
        a = parseInt(firstOperand.value);
        b = parseInt(secondOperand.value);
    }
    
    //math itself. cancel calculation in case of division by zero
    switch(operator.value){
        case "+":
            result = a + b;
            break;
            case "-":
                result = a - b;
                break;
                case "*":
                    result = a * b;
                    break;
                    case "/":
                        if(b == 0){
                            alert("You can't divide by zero!");
            return;
        } else {
        result = a / b;
        break;
    }
}

//prepare results for next calculation. Rounds floats to 4 decimals
firstOperand.value = (+(Math.round(result + "e+4")  + "e-4")).toString();
secondOperand.value = '';

//check what operator was used. Pass any operator besides "=" as operator for next calculation
if((/[\+\-\*\/]/).test(button)){
    operator.value = button.toString();
    currentOperand = secondOperand;
} else {
    operator.value = '';
    currentOperand = firstOperand;        
}
updateDisplay();
}

function updateDisplay(){
    display.textContent = firstOperand.value + operator.value + secondOperand.value;
}