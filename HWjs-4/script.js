/* --------------------------------- ЗАДАНИЕ №1 ---------------------------------*/
function numberObject(num) {
    var numObj = {}
    if ((num < 0) || (num > 999)) return console.log(numObj)
    numObj.hundreds = parseInt(num / 100)
    numObj.tens = parseInt((num % 100) / 10)
    numObj.units = parseInt((num % 100) % 10)
    return numObj
}

function case1() {
    var number
    while (isNaN(number)) {
        number = parseInt(prompt('Введите число от 0 до 999'))
    }
    console.log(numberObject(number))
}
/* --------------------------------- ЗАДАНИЕ №2 ---------------------------------*/

var cart = []

/* ------- Добавления товара при нажатии-------*/
function jersey() {
    cart.push(['jersey', 800, 1])
}

function pants() {
    cart.push(['pants', 1500, 1])
}

function sweatshirt() {
    cart.push(['sweatshirt', 2000, 1])
}

/* ------- Вывод результата в виде текста. Очистка корзины -------*/
function write(text) {
    document.getElementById("cart").innerHTML = text;
}

function clearCart() {
    document.getElementById("cart").innerHTML = 'В корзине пусто. Добавьте товар и рассчитайте стоимость.'
    cart.splice(0, cart.length)
}

/* ------- Подсчёт суммы -------*/
function countBasketPrice(cartSum) {
    var count = 0
    var sumPrice = 0
    for (var i in cartSum) {
        sumPrice += cartSum[i][1]
        count += cartSum[i][2]
    }
    write('Итого: ' + count + ' шт. стоимостью ' + sumPrice + ' рублей. ')

}