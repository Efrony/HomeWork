/* --------------------------------- ЗАДАНИЕ №1 ---------------------------------*/
var primeNumber = []

function case1() {
    for (var number = 1; number <= 100; number++) {
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
function case3() {}
/* --------------------------------- ЗАДАНИЕ №4 ---------------------------------*/
function case4() {}
/* --------------------------------- ЗАДАНИЕ №5 ---------------------------------*/
function case5() {}