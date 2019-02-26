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
var jersey = {
    type: 'jersey',
    price: 800,
    count: 1}
var pants = {
    type: 'pants',
    price: 1500,
    count: 1}
var sweatshirt = {
    type: 'sweatshirt',
    price: 2000,
    count: 1}
    /* ------- Добавления товара при нажатии-------*/
function addToCart(goods) {
    cart.push(goods)
}
/* ------- Вывод результата в виде текста. Очистка корзины -------*/
function write(text) {
    document.getElementById("cart").innerHTML = text
}

function clearCart(cart) {
    document.getElementById("cart").innerHTML = 'В корзине пусто. Добавьте товар и рассчитайте стоимость.'
    cart.splice(0, cart.length)
}
/* ------- Подсчёт суммы -------*/
function countBasketPrice(cartSum) {
    var countCart = 0
    var sumPriceCart = 0
    for (var i = 0; i < cartSum.length; i++) {
        sumPriceCart += cartSum[i].price
        countCart += cartSum[i].count
    }
    write('Итого: ' + countCart + ' шт. стоимостью ' + sumPriceCart + ' рублей. ');
}