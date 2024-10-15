const screen = document.querySelector('#screen-calculator');
const memory = document.querySelector('#screen-calculator-operator');
const btns = document.querySelectorAll('.btn');

let firstNumber;
let secondNumber;
let operationAcual;

let canClear = false;

function resetScreens() {
    firstNumber = undefined;
    secondNumber = undefined;

    screen.textContent = '0';
    memory.textContent = ' ';
    canClear = false;
}

function operacionesTrigonometricas(typeOfFuntion) {

    if (typeOfFuntion == 'PI') screen.textContent = Math.PI.toFixed(4);

    if (typeOfFuntion == 'e') screen.textContent = Math.E.toFixed(4);

    if (screen.textContent > 0) {
        memory.innerHTML = `${typeOfFuntion}(${screen.textContent})`;

        // HALLAR RADIANES PARA LAS FUNCIONES SIN(), COS(), TAN()
        let grados = parseInt(screen.textContent);
        let radianes = grados * (Math.PI / 180);

        if (typeOfFuntion == 'sin') screen.textContent = Math.sin(radianes).toFixed(4);

        if (typeOfFuntion == 'cos') screen.textContent = Math.cos(radianes).toFixed(4);

        if (typeOfFuntion == 'tan') screen.textContent = Math.tan(radianes).toFixed(4);

        if (typeOfFuntion == 'sqrt') screen.textContent = Math.sqrt(parseInt(screen.textContent)).toFixed(4);

        if (typeOfFuntion == 'pow') screen.textContent = Math.pow(parseInt(screen.textContent));

        if (typeOfFuntion == 'log') screen.textContent = Math.log(parseInt(screen.textContent)).toFixed(4);
    }
    canClear = true;
}

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1; // Caso base: 0! y 1! son 1
    }
    return n * factorial(n - 1); // Llamada recursiva
}

function inputScreen(key) {
    // NO REPITE PUNTO HE IMPRIME LOS NUMEROS
    if (screen.innerHTML.split('').find(string => string == '.') == key) {
        return
    } else {
        if(key == '.' && screen.textContent == 0){
            screen.textContent = '0.';
        }else {
            screen.textContent += key;
        }
    }
}

function asignarPrimerNumero(){
    firstNumber = screen.textContent.split('').find(caracter => caracter == '.') == '.'? parseFloat(screen.textContent): parseInt(screen.textContent);

    screen.textContent = '0';
}

function asignarsegundoNumero(){
    secondNumber = screen.textContent.split('').find(caracter => caracter == '.') == '.'? parseFloat(screen.textContent): parseInt(screen.textContent);
}

function cambiarOperador(newOperacion){
    console.log(newOperacion, operationAcual, screen.textContent, firstNumber)
    if(screen.textContent > 0 && newOperacion == operationAcual){
        return true;
    } else {
        memory.textContent = `${firstNumber} ${newOperacion}`
        return false
    }
}

function operacionesSimples(operacion) {
    canClear = false;
    console.log(operacion)
    if(operacion == 'sumar'){
        if (!firstNumber && !secondNumber) {
            asignarPrimerNumero();
            memory.textContent = `${firstNumber} +`;
            operationAcual = operacion;
    
        } else if (firstNumber && !secondNumber) {
            cambiarOperador(operacion);
            asignarsegundoNumero();
    
            memory.textContent = `${firstNumber + secondNumber} +`;
            firstNumber += secondNumber;
            secondNumber = 0;
            screen.textContent = '0';
        }
    }else if(operacion == 'restar'){
        if (!firstNumber && !secondNumber) {
            asignarPrimerNumero();
            memory.textContent = `${firstNumber} -`;
            operationAcual = operacion;
    
        } else if (firstNumber && !secondNumber) {
            if (cambiarOperador(operacion)){

            }
            asignarsegundoNumero();
    
            memory.textContent = `${firstNumber - secondNumber} -`;
            firstNumber -= secondNumber;
            secondNumber = 0;
            screen.textContent = '0';
        }
    }else if(operacion == 'multiplicar'){
        if (!firstNumber && !secondNumber) {
            asignarPrimerNumero();
            memory.textContent = `${firstNumber} x`;
            operationAcual = operacion;
    
        } else if (firstNumber && !secondNumber) {
            cambiarOperador(operacion);
            asignarsegundoNumero();
    
            memory.textContent = `${firstNumber * secondNumber} x`;
            firstNumber *= secondNumber;
            secondNumber = 0;
            screen.textContent = '0';
        }
    }else if(operacion == 'dividir'){
        if (!firstNumber && !secondNumber) {
            asignarPrimerNumero();
            memory.textContent = `${firstNumber} ÷`;
            operationAcual = operacion;
    
        } else if (firstNumber && !secondNumber) {
            cambiarOperador(operacion);
            asignarsegundoNumero();
    
            memory.textContent = `${firstNumber / secondNumber} ÷`;
            firstNumber /= secondNumber;
            secondNumber = 0;
            screen.textContent = '0';
        }
    }
}

function resultado(){
    asignarsegundoNumero();

    if(operationAcual == 'sumar'){
        screen.textContent = firstNumber + secondNumber;
        memory.textContent = ' ';
    }

    if(operationAcual == 'restar'){
        screen.textContent = firstNumber - secondNumber;
        memory.textContent = ' ';
    }

    if(operationAcual == 'multiplicar'){
        screen.textContent = firstNumber * secondNumber;
        memory.textContent = ' ';
    }

    if(operationAcual == 'dividir'){
        screen.textContent = firstNumber / secondNumber;
        memory.textContent = ' ';
    }
    canClear = true
}
btns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.textContent < 10 && btn.textContent >= 0 || btn.textContent == '.') {
            if (canClear == true) resetScreens();
            // SI AL INICIAR ES CERO LO ELIMINA Y COLOCA EL QUE SE DIGITO
            if (screen.textContent == '0') screen.textContent = '';
            inputScreen(btn.textContent);
        }

        if (btn.value == 'sumar' ||
            btn.value == 'restar' ||
            btn.value == 'multiplicar' ||
            btn.value == 'dividir') operacionesSimples(btn.value);

        if (btn.textContent == 'CE') resetScreens();

        if (btn.textContent == 'AC') {
            let array = screen.textContent.split('');
            array.pop()
            screen.textContent = array.join('');
        }

        if (btn.value == 'factorial') {
            memory.innerHTML = `factorial(${screen.textContent})`;
            canClear = true;
            screen.textContent = factorial(parseInt(screen.textContent));
        }

        // OPERACIONES CIENTIFICAS
        if (btn.value == 'sin' ||
            btn.value == 'cos' ||
            btn.value == 'tan' ||
            btn.value == 'PI' ||
            btn.value == 'log' ||
            btn.value == 'sqrt' ||
            btn.value == 'e' ||
            btn.value == 'pow') operacionesTrigonometricas(btn.value);
        
        if(btn.value == 'btn-iqual') resultado();
    })
});