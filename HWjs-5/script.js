/* --------------------------------- ЗАДАНИЕ №1 ---------------------------------*/
var $chessBoard = document.getElementById('chessBoard')
var $table = document.createElement('table')
var $blackIndicator = false
    /* ---------- Ряд буквенных обозначений --------------*/
function abcRow() {
    var $tr = document.createElement('tr')
    var $number = document.createElement('td')
    $number.textContent = ''
    $number.classList.add('borderStyle')
    $tr.appendChild($number)
    for (var j = 65; j <= 72; j++) {
        var $td = document.createElement('td')
        $td.textContent = String.fromCharCode(j)
        $tr.appendChild($td)
        $td.classList.add('borderStyle')
    }
    var $number = document.createElement('td')
    $number.textContent = ''
    $number.classList.add('borderStyle')
    $tr.appendChild($number)
    $table.appendChild($tr)
}
/* -------------- Колонка номерных обозначений ---------*/
function numberColumn(i) {
    var $number = document.createElement('td')
    $number.textContent = i
    $tr.appendChild($number)
    $number.classList.add('borderStyle')
}
/* ---------- Генерация доски с обозначениями-----------*/
abcRow() /* верхний буквенный ряд */
for (var i = 8; i > 0; i--) {
    var $tr = document.createElement('tr')
    numberColumn(i) /* левая номерная колонка */
    for (var j = 65; j <= 72; j++) {
        var $td = document.createElement('td')
        $td.textContent = String.fromCharCode(j) + i
        $tr.appendChild($td)
        if ($blackIndicator) {
            $td.classList.add('siriusBlack') /* добавляем черный */
        }
        else {
            $td.classList.add('siriusWhite') /* добавляем белый */
        }
        $blackIndicator = !$blackIndicator
    }
    numberColumn(i) /* правая номерная колонка */
    $table.appendChild($tr)
    $blackIndicator = !$blackIndicator
}
abcRow() /* нижний буквенный ряд */
$table.classList.add('noBorderTable') /*-------убираем отступы таблицы---------*/
$chessBoard.appendChild($table)



/* --------------------------------- ЗАДАНИЕ №2 ---------------------------------*/
var cart = []
var product = [
        {type: 'jersey', price: 800, count: 1, color: 'red'} ,
        {type: 'pants', price: 1500, count: 1, color: 'black'},
        {type: 'sweatshirt', price: 2000, count: 1, color: 'blue'}
]
/* --------------- Вывод результата в виде текста.------------*/
document.getElementById('cart').textContent = 'В корзине пусто. Добавьте товар и рассчитайте стоимость.';

function write(text) {
    document.getElementById('cart').textContent = text
}
/* ------------------  Очистка корзины ----------------------*/
function clearCart(cartSum) {
    document.getElementById('cart').textContent = 'В корзине пусто. Добавьте товар и рассчитайте стоимость.'
    cartSum.splice(0, cartSum.length)
}
/* ----------------------- Подсчёт суммы --------------------*/
function countBasketPrice(cartSum) {
    var countCart = 0
    var sumPriceCart = 0
    for (var i = 0; i < cartSum.length; i++) {
        sumPriceCart += cartSum[i].price
        countCart += cartSum[i].count
    }
    write('Итого: ' + countCart + ' шт. стоимостью ' + sumPriceCart + ' рублей. ');
}
/* ---------------- Добавления товара при нажатии-------------*/
function addToCart(goods) {
    cart.push(goods)
    countBasketPrice(cart)
}
