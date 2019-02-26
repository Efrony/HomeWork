/* --------------------------------- ЗАДАНИЕ №1 ---------------------------------*/
function testingPrime(number) {
    var testPrime = true
    
    for (var digit = 2; digit <= 9; digit++) {
        if (number > digit) {
            if (number % digit == 0)  testPrime = false 
        }
    }
    if ((number == 0) || (number == 1))  testPrime = false
    return testPrime
}

function case1() {
    var primeNumbers = []
    var number = 0
    while (number <= 100) {
        if (testingPrime(number))  primeNumbers.push(number)
        number++
    }
    alert('Всего получается ' + primeNumbers.length + ' простых чисел:\n' + primeNumbers)
}
/* --------------------------------- ЗАДАНИЕ №3 ---------------------------------*/
var cart = []
var count = 0
var sumPrice = 0

function jersey() {
    cart.push(['jersey', 800, 1])
}

function pants() {
    cart.push(['pants', 1500, 1])
}

function sweatshirt() {
    cart.push(['sweatshirt', 2000, 1])
}

function write(text) {
    document.getElementById("cart").innerHTML = text;
}

function clearCart() {
    document.getElementById("cart").innerHTML = 'В корзине пусто. Добавьте товар и рассчитайте стоимость.'
    cart.splice(0, cart.length)
}

function countBasketPrice() {
    for (var i in cart) {
        sumPrice += cart[i][1]
        count += cart[i][2]
    }
    write('Итого: ' + count + ' шт. стоимостью ' + sumPrice + ' рублей. ')
    sumPrice = 0
    count = 0
}
/* --------------------------------- ЗАДАНИЕ №4 ---------------------------------*/
function case4() {
    for (var a = 0; a <= 9; alert(a++)) {}
}
/* --------------------------------- ЗАДАНИЕ №5 ---------------------------------*/
function case5() {
    for (var a = '*'; a.length <= 20; a += '*') console.log(a)
}