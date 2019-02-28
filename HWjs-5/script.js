/* --------------------------------- ЗАДАНИЕ №1 ---------------------------------*/
var $chessBoard = document.getElementById('chessBoard')
var $table = document.createElement('table')
var $blackIndicator = false
    /* ---------- Ряд буквенных обозначений --------------*/
function abcRow() {
    var $tr = document.createElement('tr')
    var $number = document.createElement('td')
    $number.textContent = ''
    $tr.appendChild($number)
    for (var j = 72; j >= 65; j--) {
        var $td = document.createElement('td')
        $td.textContent = String.fromCharCode(j)
        $tr.appendChild($td)
    }
    $table.appendChild($tr)
}
/* -------------- Колонка номерных обозначений ---------*/
function numberColumn(i) {
    var $number = document.createElement('td')
    $number.textContent = i
    $tr.appendChild($number)
}
/* ---------- Генерация доски с обозначениями-----------*/
abcRow() /* верхний буквенный ряд */
for (var i = 1; i < 9; i++) {
    var $tr = document.createElement('tr')
    numberColumn(i) /* левая номерная колонка */
    for (var j = 72; j >= 65; j--) {
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
        {type: 'jersey' , price: 800 , count: 1}, 
        {type: 'pants', price: 1500, count: 1}, 
        {type: 'sweatshirt', price: 2000, count: 1}
]
    /* ------------------------ Добавления товара при нажатии-------------------*/
function addToCart(goods) {
    cart.push(goods)
}
/* --------------------------- Вывод результата в виде текста.------------------*/
document.getElementById('cart').textContent = 'В корзине пусто. Добавьте товар и рассчитайте стоимость.';

function write(text) {
    document.getElementById('cart').textContent = text
}
/* -----------------------------  Очистка корзины ------------------------------*/
function clearCart(cart) {
    document.getElementById('cart').textContent = 'В корзине пусто. Добавьте товар и рассчитайте стоимость.'
    cart.splice(0, cart.length)
}
/* --------------------------------- Подсчёт суммы ------------------------------*/
function countBasketPrice(cartSum) {
    var countCart = 0
    var sumPriceCart = 0
    for (var i = 0; i < cartSum.length; i++) {
        sumPriceCart += cartSum[i].price
        countCart += cartSum[i].count
    }
    write('Итого: ' + countCart + ' шт. стоимостью ' + sumPriceCart + ' рублей. ');
}