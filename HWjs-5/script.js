/* --------------------------------- ЗАДАНИЕ №1 ---------------------------------*/
var $chessBoard = document.getElementById('chessBoard')
var $table = document.createElement('table')
var $blackIndicator = false

/* --- Функция создания child с указанием тега, контента, класса стилей и родителя----*/
function createChild(teg, content, classStyle, parent) {
    var $elem = document.createElement(teg)
    $elem.textContent = content
    $elem.classList.add(classStyle)
    $tr.appendChild($elem)
}

/* ------ Верхний буквенный ряд с пробелами побокам ------ */
var $tr = document.createElement('tr')
createChild('td', '', 'borderStyle', $tr)
for (var j = 65; j <= 72; j++) {
    createChild('td', String.fromCharCode(j), 'borderStyle', $tr)
}
createChild('td', '', 'borderStyle', $tr)
$table.appendChild($tr)

/* ------------------------- Доска  ---------------------- */
for (var i = 8; i > 0; i--) {
    var $tr = document.createElement('tr')
    createChild('td', i, 'borderStyle', $tr) /* левая номерная колонка */
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
    createChild('td', i, 'borderStyle', $tr) /* правая номерная колонка */
    $table.appendChild($tr)
    $blackIndicator = !$blackIndicator
}

/* ------ Нижний буквенный ряд с пробелами побокам ------ */
var $tr = document.createElement('tr')
createChild('td', '', 'borderStyle', $tr)
for (var j = 65; j <= 72; j++) {
    createChild('td', String.fromCharCode(j), 'borderStyle', $tr)
}
createChild('td', '', 'borderStyle', $tr)
$table.appendChild($tr) 

/*-------убираем отступы таблицы---------*/
$table.classList.add('noBorderTable') 
$chessBoard.appendChild($table)


/* --------------------------------- ЗАДАНИЕ №2 ---------------------------------*/
var cart = []
var product = [
        {
              type: 'jersey'
            , price: 800
            , count: 1
            , color: 'red'
        }
        , {
              type: 'pants'
            , price: 1500
            , count: 1
            , color: 'black'
        }
        , {
              type: 'sweatshirt'
            , price: 2000
            , count: 1
            , color: 'blue'
        }
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