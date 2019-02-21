/* --------------------------------- ЗАДАНИЕ №1 ---------------------------------*/
var primeNumber = []

function case1() {
    var number = 0
    while (number <= 100) {
        number++
        var testPrime = 0
        for (var digit = 1; digit <= 100; digit++) {
            if (number >= digit) {
                if (number % digit == 0) {
                    testPrime++
                }
            }
            else {
                break;
            }
        }
        if (testPrime == 2) {
            primeNumber.push(number)
        }
    }
    alert(primeNumber)
    primeNumber = []
}
/* --------------------------------- ЗАДАНИЕ №2 ---------------------------------*/
function case2() {}
/* --------------------------------- ЗАДАНИЕ №3 ---------------------------------*/

var cart = []

function write(text) {
    document.getElementById("cart").innerHTML = text;
}

function jersey() {
    cart.push(['jersey',800,1])
}

function pants() {
    cart.push(['pants',1500,1])
}

function sweatshirt() {
    cart.push(['sweatshirt',2000,1])
}


function countBasketPrice() {
    var count = 0
    var sumPrice = 0

    for (var i in cart) {
        sumPrice += cart[i][1]
        count += cart[i][2]
    }
    alert (count + ' ' + sumPrice)
    
}
/* --------------------------------- ЗАДАНИЕ №4 ---------------------------------*/
function case4() {}
/* --------------------------------- ЗАДАНИЕ №5 ---------------------------------*/
function case5() {}