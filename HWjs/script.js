function case2() {
    var a = 2;
    var x = 1 + (a *= 2);
    alert(x)
}

function randomNumber() {
    return Math.round((Math.random() - 0.5) * 10)
}

function case3() {
    var a = randomNumber()
    var b = randomNumber()
    if (a >= 0 && b >= 0) {
        alert(Math.max(a, b) - Math.min(a, b))
    }
    else if (a < 0 && b < 0) {
        alert(a * b)
    }
}

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
    alert('плюс ' + casePlus(d, c))
    alert('минус ' + caseMinus(d, c))
    alert('умножить ' + caseUmnoj(d, c))
    alert('делить ' + caseDel(d, c))
}

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
        var answerUser = prompt('Сгенерируем два случайных числа. Пусть это будет ' + m + ' и ' + n + '. Введите одну из оперций: + - * /')
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

function case7() {}

function case8() {}