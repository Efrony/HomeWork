/* --------------------------------- ЗАДАНИЕ №1 ---------------------------------*/
var $chessBoard = document.getElementById('chessBoard')
var $table = document.createElement('table')
var $blackIndicator = false
var $figureWhite = ['rookW', 'knightW', 'bishopW', 'kingW', 'queenW', 'bishopW', 'knightW','rookW']
var $figureBlack = ['rookB', 'knightB', 'bishopB', 'kingB', 'queenB', 'bishopB', 'knightB','rookB']

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
        if (i == 1) {$td.classList.add($figureWhite.pop())} /*--присвоение класса с названием белой фигуры--*/
        if (i == 8) {$td.classList.add($figureBlack.pop())} /*--присвоение класса с названием черной фигуры--*/
        if (i == 7) {$td.classList.add('pawnB')} /*--присвоение класса черной пешки--*/
        if (i == 2) {$td.classList.add('pawnW')} /*--присвоение класса белой пешки--*/
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
    /* --------------- Вывод результата в виде текста.------------*/
function messageCart(text) {
    document.getElementById('cart').textContent = text
}
messageCart('В корзине пусто.')
    /* ----------------------- Подсчёт суммы --------------------*/
function countBasketPrice(cartUser) {
    var countCart = 0
    var sumPriceCart = 0
    for (var i = 0; i < cartUser.length; i++) {
        sumPriceCart += cartUser[i]._price
        countCart += cartUser[i]._count
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
    messageCart('В корзине пусто.')
    cartUser.splice(0, cartUser.length)
}

var $clear = document.getElementById('clear')
$clear.setAttribute('onclick', 'clearCart(cart)')


/* ------------------------------------- ЗАДАНИЕ №3 ---------------------------------------*/
var cart = []
var product = [
        {
            'Название товара': 'Футболка'
            , _price: 800
            , _count: 1
            , Цвет: 'Красный'
            , Размер: 'S'
        }
        , {
            'Название товара': 'Штаны'
            , _price: 1500
            , _count: 1
            , Цвет: 'Чёрный'
            , Размер: 'M'
        }
        , {
            'Название товара': 'Толстовка'
            , _price: 2000
            , _count: 1
            , Цвет: 'Синий'
            , Размер: 'L'
        }, {
            'Название товара': 'Футболка'
            , _price: 800
            , _count: 1
            , Цвет: 'Черный'
            , Размер: 'M'
        }
        , {
            'Название товара': 'Штаны'
            , _price: 1500
            , _count: 1
            , Цвет: 'Красный'
            , Размер: 'M'
        }, {
            'Название товара': 'Штаны'
            , _price: 1500
            , _count: 1
            , Цвет: 'Зеленый'
            , Размер: 'M'
        }

]
    /* ----Функция визуализирующая один объект каталога----*/
function catalogVisualItem(productItem, indexItem) {
    /* ------- Вывод атрибутов объекта без префикса '_' -------*/
    var content = ''
    for (j in productItem) {
        if (j[0] == '_') continue
        content += j + ': ' + productItem[j] + '<br>'
    }
    var $elem = document.createElement('div')
    $elem.innerHTML = content
    $elem.classList.add('productItem')
    catalog.appendChild($elem)
        /* -------- Кнопка объекта "Добавить"  --------*/
    var addToCartAtribute = ('addToCart(product[' + indexItem + '],cart)')
    var $button = document.createElement('button')
    $button.textContent = 'Добавить в корзину ' + productItem['_price'] + 'руб.'
    $button.setAttribute('onclick', addToCartAtribute);
    $elem.appendChild($button)
}
/* ---- Функция визуализирующая все объекты каталога----*/
function catalogVisual(productObject) {
    for (i = 0; i < productObject.length; i++) {
        catalogVisualItem(productObject[i], i)
    }
}
catalogVisual(product)