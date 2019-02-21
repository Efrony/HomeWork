/* --------------------------------- ЗАДАНИЕ №1 ---------------------------------*/
var primeNumber = []

function case1() {
    var number = 1
    while (number < 100) {
        number++
        var testPrime = 0
        for (var digit = 2; digit <= 9; digit++) {
            if (number > digit) {
                if (number % digit == 0) {
                    testPrime++
                }
            }
        }
        if (testPrime == 0) {
            primeNumber.push(number)
        }
    }
    alert('Всего получается ' + primeNumber.length + ' простых чисел:\n' + primeNumber)
    primeNumber = []
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
function case4() {}
/* --------------------------------- ЗАДАНИЕ №5 ---------------------------------*/
function case5() {}