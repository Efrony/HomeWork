/* --------------------------------- ЗАДАНИЕ №1 ---------------------------------*/
function numberObject(num) {
    var numObj = {}
    if ((num < 0) || (num > 999)) return console.log(numObj)
    numObj.hundreds = parseInt(num / 100)
    numObj.tens = parseInt((num % 100) / 10)
    numObj.units = parseInt((num % 100) % 10)
    return console.log(numObj)
}

function case1() {
    var number
    while (isNaN(number)) {
        number = parseInt(prompt('Введите число от 0 до 999'))
    }
    numberObject(number)
}
/* --------------------------------- ЗАДАНИЕ №2 ---------------------------------*/
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