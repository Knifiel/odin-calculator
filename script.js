const display = document.querySelector(".display");

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener("click", event =>{
        input(button.dataset.but);
    });
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
        case "clear":
        firstOperand.value = "0";
        secondOperand.value = "";
        operator.value = "";
        currentOperand = firstOperand;
        updateDisplay();
        break;

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
            
        case "back":
            if(currentOperand.value.length == 1){
                break;
            } else {
                currentOperand.value = currentOperand.value.slice(0, -1);
                updateDisplay();
                break;
            }

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
        if(currentOperand.value == "0"){
            currentOperand.value = button;
        } else if (firstOperand.value == "-"){
            currentOperand.value += button;
        } else {
            currentOperand.value += button;
        }
        updateDisplay();
        break;
        
        case "-":
            if(secondOperand.value != ""){
                operate(button);
                break;
            }
        if((firstOperand.value == "0") || (firstOperand.value == "-")){
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
        if(firstOperand.value == "-"){
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
        } else {
            break;
        }
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

//prepare results for next calculation
firstOperand.value = result;
secondOperand.value = '';    
currentOperand = firstOperand;

//check what operator was used. pass any operator besides "=" as operator for next calculation
if((/[\+\-\*\/]/).test(button)){
    operator.value = button;
} else {
    operator.value = '';        
}
updateDisplay();
}

//update displayed values
function updateDisplay(){
    display.textContent = firstOperand.value + operator.value + secondOperand.value;
}