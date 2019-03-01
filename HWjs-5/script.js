/* --------------------------------- ЗАДАНИЕ №1 ---------------------------------*/
var $chessBoard = document.getElementById('chessBoard')
var $table = document.createElement('table')
var $blackIndicator = false

/* --- Функция создания child с указанием тега, контента, класса стилей и родителя----*/
function createChild(teg, content, classStyle, parent) {
    var $elem = document.createElement(teg)
    $elem.textContent = content
    $elem.classList.add(classStyle)
    parent.appendChild($elem)
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
        name: 'Футболка'
        , price: 800
        , count: 1
        , color: 'red'
        , size: 'S'
        }
        , {
        name: 'Штаны'
        , price: 1500
        , count: 1
        , color: 'black'
        , size: 'M'
        }
        , {
        name: 'Толстовка'
        , price: 2000
        , count: 1
        , color: 'blue'
        , size: 'L'
        }
]
/* --------------- Вывод результата в виде текста.------------*/

function messageCart(text) {
    document.getElementById('cart').textContent = text
}

messageCart('В корзине пусто. Добавьте товар и рассчитайте стоимость.')

/* ----------------------- Подсчёт суммы --------------------*/
function countBasketPrice(cartUser) {
    var countCart = 0
    var sumPriceCart = 0
    for (var i = 0; i < cartUser.length; i++) {
        sumPriceCart += cartUser[i].price
        countCart += cartUser[i].count
    }
    messageCart('Итого: ' + countCart + ' шт. стоимостью ' + sumPriceCart + ' рублей. ')
}
/* ---------------- Добавления товара при нажатии-------------*/
function addToCart(goods, cartUser) {
    cartUser.push(goods)
    countBasketPrice(cartUser)
}
/* ------------------  Очистка корзины ----------------------*/
function clearCart(cartUser) {
    messageCart('В корзине пусто. Добавьте товар и рассчитайте стоимость.')
    cartUser.splice(0, cartUser.length)
}

/* --------------------------------- ЗАДАНИЕ №3 ---------------------------------*/

function catalogVisual(productItem,i) {
    var content = ''
    for (j in productItem) {
        content +=  j + ': ' + productItem[j] +'<br>'
    }
    var $elem = document.createElement('div')
    $elem.innerHTML = content
    $elem.classList.add('productItem')
    catalog.appendChild($elem)
    
    var addToCartAtribute = ('addToCart(product[' + i + '],cart)')
    var $button = document.createElement('button')
    $button.textContent = 'Добавить в корзину '+ productItem['price'] + 'руб.'
    $button.setAttribute('onclick', addToCartAtribute);
    $elem.appendChild($button)
}


for (i = 0; i < product.length; i++) {
    catalogVisual(product[i],i)
}
