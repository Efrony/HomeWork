/* --------------------------------- ЗАДАНИЕ №2 ---------------------------------*/
function case2() {
    var a = 2;
    var x = 1 + (a *= 2);
    alert(x)
}

function randomNumber() {
    return Math.round((Math.random() - 0.5) * 10)
}


/* --------------------------------- ЗАДАНИЕ №3 ---------------------------------*/
function case3() {
    var a = randomNumber()
    var b = randomNumber()
    alert('Объявим две случайные переменные.\n Пусть они будут в промежуткt [-5; 5]:\n' + 'a = ' + a + '\n' + 'b = ' + b)
    if (a >= 0 && b >= 0) {
        alert('Так как оба числа положительные высчитываем разность: ' + (+Math.max(a, b) - +Math.min(a, b)))
    }
    else if (a < 0 && b < 0) {
        alert('Так как оба числа отрицательные высчитываем произведение: ' + (+a * +b))
    }
    else {
        alert('Так как числа разных знаков высчитываем сумму: ' + (+a + +b))
    }
}


/* --------------------------------- ЗАДАНИЕ №4 ---------------------------------*/
function case4() {
    while (true) {
        var a = +prompt('Введите значение "a" от  0 до 15 включительно')
        if (a >= 0 && a <= 15 && a) break
    }
    switch (a) {
    case 0:
        alert(a++)
    case 1:
        alert(a++)
    case 2:
        alert(a++)
    case 3:
        alert(a++)
    case 4:
        alert(a++)
    case 5:
        alert(a++)
    case 6:
        alert(a++)
    case 7:
        alert(a++)
    case 8:
        alert(a++)
    case 9:
        alert(a++)
    case 10:
        alert(a++)
    case 11:
        alert(a++)
    case 12:
        alert(a++)
    case 13:
        alert(a++)
    case 14:
        alert(a++)
    case 15:
        alert(a)
    }
}


/* --------------------------------- ЗАДАНИЕ №5 ---------------------------------*/
function casePlus(firstNumber, secondNumber) {
    return firstNumber + secondNumber
}

function caseMinus(firstNumber, secondNumber) {
    return firstNumber - secondNumber
}

function caseUmnoj(firstNumber, secondNumber) {
    return firstNumber * secondNumber
}

function caseDel(firstNumber, secondNumber) {
    return firstNumber / secondNumber
}

function case5() {
    var d = randomNumber()
    var c = randomNumber()
    alert('На примерe ' + d + ' и ' + c + ' показатели следующие')
    alert('Сложение: ' + casePlus(d, c))
    alert('Разница: ' + caseMinus(d, c))
    alert('Произведение: ' + caseUmnoj(d, c))
    alert('Деление: ' + caseDel(d, c))
}


/* --------------------------------- ЗАДАНИЕ №6 ---------------------------------*/
function mathOperation(arg1, arg2, operation) {
    switch (operation) {
    case '+':
        return casePlus(arg1, arg2)
    case '-':
        return caseMinus(arg1, arg2)
    case '*':
        return caseUmnoj(arg1, arg2)
    case '/':
        return caseDel(arg1, arg2)
    }
}

function case6() {
    var m = randomNumber()
    var n = randomNumber()
    var testSwitch = true
    while (testSwitch) {
        var answerUser = prompt('Сгенерируем два случайных числа. \n Пусть это будет ' + m + ' и ' + n + '. \n Введите одну из оперций: + - * /')
        switch (answerUser) {
        case '+':
        case '-':
        case '*':
        case '/':
            testSwitch = false
        }
    }
    alert(m + ' ' + answerUser + ' ' + n + ' = ' + mathOperation(m, n, answerUser))
}


/* --------------------------------- ЗАДАНИЕ №7 ---------------------------------*/
function case7() {
    alert('0 == null: '+ (0 == null) + '\n' + 
          '0 > null: '+ (0 > null) + '\n' + 
          '0 < null: '+ (0 < null) + '\n' +
          '0 === null: '+ (0 === null) + '\n' +
          '0 != null: '+ (0 != null) + '\n' +
          '0 <= null: '+ (0 <= null) + '\n' + 
          '0 >= null: '+ (0 >= null) + '\n' +
         'WHAT !?!? Как я понял, это связано с преобразованием типов этих значений при сравнивании различными знаками. Сильно углубляться не стал, там дебри =)')
}


/* --------------------------------- ЗАДАНИЕ №8 ---------------------------------*/
function power(val, pow) {
    if (pow >= 0) {
        if (pow == 0) return 1
        else if (pow == 1) return val
        else {
            pow--
            return val * power(val, pow)
        }
    } else {
        if (pow == -1) return 1/val
        else {
            pow++
            return 1/val * power(val, pow)
        }
    }
}


function case8() {
    var x = randomNumber()
    var y = randomNumber()
    alert('Сгенерируем два случайных числа. \n Пусть это будет ' + x + ' в степени ' + y)
    alert('Ответ: ' + power(x, y))
}