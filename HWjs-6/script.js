
var cart = []
var product = [
        {
            'Название товара': 'Футболка',
            _name: 'jersey',
            _price: 800,
            _count: 1,
            _color: 'red',
            Цвет: 'Красный',
            Размер: 'S'
        }, {
            'Название товара': 'Штаны',
            _name: 'pants',
            _price: 1500,
            _count: 1,
            _color: 'black',
            Цвет: 'Чёрный',
            Размер: 'M'
        }, {
            'Название товара': 'Толстовка',
            _name: 'sweatshirt',
            _price: 2000,
            _count: 1,
            _color: 'blue',
            Цвет: 'Синий',
            Размер: 'L'
        }, {
            'Название товара': 'Футболка',
            _name: 'jersey',
            _price: 800,
            _count: 1,
            _color: 'black',
            Цвет: 'Черный',
            Размер: 'M'
        }, {
            'Название товара': 'Толстовка',
            _name: 'sweatshirt',
            _price: 1500,
            _count: 1,
            _color: 'red',
            Цвет: 'Красный',
            Размер: 'M',
        }, {
            'Название товара': 'Штаны',
            _name: 'pants',
            _price: 1500,
            _count: 1,
            _color: 'green',
            Цвет: 'Зеленый',
            Размер: 'M',
        }

]
/* ------------------------------- ЗАДАНИЕ №1 ---------------------------*/

    /* --------------- Вывод результата в виде текста.------------*/
function messageCart(text) {
    document.getElementById('cart').textContent = text
}

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
    cartUser.length = 0 /*cartUser.splice(0, cartUser.length)*/
}
function handleClearCart() {
    clearCart(cart)
}

/*$clear.setAttribute('onclick', 'clearCart(cart)')*/

/* ------------------------------- ЗАДАНИЕ №2 ---------------------------*/

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
        /* -------- Кнопка объекта "Купить"  --------*/
    var $button = document.createElement('button')
    $button.textContent = 'Купить ' + productItem['_price'] + ' руб.'
    var addToCartAtribute = ('addToCart(product[' + indexItem + '],cart)')
    $button.setAttribute('onclick', addToCartAtribute)
    $elem.appendChild($button)
    /* -------- Маленькая картинка в каталоге  --------*/
    var $smallImg = document.createElement('img')
    $smallImg.classList.add('smallImg')
    var src = 'img/small/' + productItem['_name'] + '_' + productItem['_color'] + '.jpg'
    $smallImg.src = src
    $elem.insertBefore($smallImg, $button)
    
}
/* ---- Функция визуализирующая все объекты каталога----*/
function catalogVisual(productObject) {
    for (i = 0; i < productObject.length; i++) {
        catalogVisualItem(productObject[i], i)
    }
}
/* ---- Функция отображения большого изображения в блоке ----*/

function changeBigPicture(event) {
    var $previev = document.getElementById('previev')
    $previev.innerHTML = ''
    var $eventElement = event.target
    
    var srcList = $eventElement.src.split('/')
    var src = ''
    srcList[srcList.indexOf('small')] = 'big'

    
    
}



function init() {
    messageCart('В корзине пусто.')
    var $clear = document.getElementById('clear')
    $clear.textContent = 'Очистить корзину'
    $clear.addEventListener('click', handleClearCart)
    catalogVisual(product)
    var images = document.getElementsByClassName("smallImg")
    for (var i = 0; i < images.length; i++) {
        images[i].onclick = changeBigPicture
    }
}

window.addEventListener('load', init)
