var namberImg = 0
var cart = [] 
var product = [
        {'Название товара': 'Футболка', _name: 'jersey', _name: 'jersey', _price: 800, _count: 1, _color: 'red', Цвет: 'Красный', Размер: 'S'}, 
        {'Название товара': 'Штаны', _name: 'pants', _price: 1500, _count: 1, _color: 'black', Цвет: 'Чёрный', Размер: 'M'},
        {'Название товара': 'Толстовка', _name: 'sweatshirt', _price: 2000, _count: 1, _color: 'blue', Цвет: 'Синий', Размер: 'L'},
        {'Название товара': 'Футболка', _name: 'jersey', _price: 800, _count: 1, _color: 'black', Цвет: 'Черный', Размер: 'M'},
        {'Название товара': 'Толстовка', _name: 'sweatshirt', _price: 1500, _count: 1, _color: 'red', Цвет: 'Красный', Размер: 'M'},
        {'Название товара': 'Штаны', _name: 'pants', _price: 1500, _count: 1, _color: 'green', Цвет: 'Зеленый', Размер: 'M'}
]
/* --------------- Вывод текста.------------*/
function messageCart(text) {
    document.getElementById('cart').textContent = text
}
/* ----------------------- Подсчёт суммы --------------------*/
function countBasketPrice(cartUser) {
    var countCart = 0
    var sumPriceCart = 0
    for (var i = 0; i < cartUser.length; i++) {
        sumPriceCart += cartUser[i]._price * cartUser[i]._count
        countCart += cartUser[i]._count
    }
    messageCart('Итого: ' + countCart + ' шт. стоимостью ' + sumPriceCart + ' рублей. ')
}
/* -------------- Добавления товара при нажатии-------------*/
function addToCart(goods, cartUser) {
    if (cartUser.includes(goods)) {
        cartUser[cartUser.indexOf(goods)]['_count']++ //если товар есть в корзине, count + 1
            var isInclude = true  
    } else {
        cartUser.push(goods)  //если товара нет , добавляем объект в корзину
        var isInclude = false
    }
    cartVisual(goods, cartUser, isInclude)  //визуализация товаров корзины
    countBasketPrice(cartUser)  
    document.getElementById('clear').classList.remove('invisible') //появляется кнопка "очистить корзину
    document.getElementById('inDelivery').classList.remove('invisible') //появляется кнопка "Указать адрес доставки ...
}
/* ------------------  Очистка корзины ----------------------*/
function handleClearCart() {
    messageCart('В корзине пусто.')
    for (k = 0; k < cart.length; k++) cart[k]['_count'] = 1; //восстанавливаем count = 1 во всех объектах ...
    cart.length = 0 
    var $cartVisual = document.getElementById('cartVisual') //удаление визуальной части корзины ...
    var $elemProduct = $cartVisual.children
    while ($elemProduct.length > 1) $cartVisual.removeChild($elemProduct[1]) // кроме children шапки(шаблона)
    $cartVisual.classList.add('invisible') // исчезает шапка таблицы корзины
    document.getElementById('clear').classList.add('invisible')  //кнопка Очистить корзину снова исчезает 
    document.getElementById('inDelivery').classList.add('invisible')  // кнопка "Указать адрес доставки"  исчезает при пустой корзине
    document.getElementById('inComment').classList.add('invisible')  // кнопка "Указать комментарий"  исчезает при пустой корзине
    document.getElementById('submit').classList.add('invisible') // кнопка "Отправить заказ"  исчезает при пустой корзине
}
/* ------------------ Удаление одного товара ----------------------*/
function handleClearProduct(event) {
    var $cartVisual = document.getElementById('cartVisual')
    var $deleteString = event.target.parentElement // выделяем строку, на которой был клик по крестику
    for (g = +$deleteString.id + 1; g < $cartVisual.children.length - 1; g++) // при удалении номер(id) следующих по списку уменьшается на 1
        $cartVisual.children[g + 1].setAttribute('id', +$cartVisual.children[g + 1].id - 1)
    $cartVisual.removeChild($deleteString) // удаление узла продукта из визуального списка корзины
    cart[+$deleteString.id]['_count'] = 1 // //восстанавливаем count = 1 у объекта
    cart.splice(+$deleteString.id, 1) // удаление объекта из массива корзины
    countBasketPrice(cart) // пересчёт корзины
    if ($cartVisual.children.length == 1) { //если в корзине остаётся одна шапка
        $cartVisual.classList.add('invisible') // исчезает шапка таблицы корзины
        document.getElementById('clear').classList.add('invisible') //кнопка Очистить корзину снова исчезает
        document.getElementById('inDelivery').classList.add('invisible')   // кнопка "Указать адрес доставки"  исчезает при пустой корзине
        document.getElementById('inComment').classList.add('invisible')  // кнопка "Указать комментарий"  исчезает при пустой корзине
        document.getElementById('submit').classList.add('invisible') // кнопка "Отправить заказ"  исчезает при пустой корзине
        messageCart('В корзине пусто.')
    }
}
/* ------------------ Визуализация корзины ----------------------*/
function cartVisual(goods, cartUser, isInclude) {
    var $cartVisual = document.getElementById('cartVisual')
    var $cartProduct = document.getElementsByClassName('cartProduct')
    if (!isInclude) var $elemProduct = $cartProduct[0].cloneNode(true) //если объекта небыло в корзине, клонируем шаблон
    else  var $elemProduct = $cartProduct[cartUser.indexOf(goods)+1]  // иначе берется переменная с соответствующим  индексом. (+1 изза шаблона[0])
    $elemProduct.querySelector('._count').textContent = goods['_count']
    $elemProduct.querySelector('._name').textContent = goods['Название товара']
    $elemProduct.querySelector('._color').textContent = goods['Цвет']
    $elemProduct.querySelector('._price').textContent = goods['_price']
    $elemProduct.querySelector('.sumProduct').textContent = +goods['_price'] * +goods['_count']
    $elemProduct.setAttribute('id', cartUser.indexOf(goods)) // передаём в id номер в массиве корзины
    if (!isInclude) $cartVisual.appendChild($elemProduct) //если объекта небыло в корзине, добавляем шаблон
    $cartVisual.classList.remove('invisible') //  шапка таблицы корзины становится видимой
    var $deleteProduct = document.getElementsByClassName('deleteProduct')  //удаление товара при нажатии на крестик ... 
    $deleteProduct[cartUser.indexOf(goods)+1].addEventListener('click', handleClearProduct)//
}
/* ---------Визуализация одного объекта каталога------------*/
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
    $elem.setAttribute('tabindex', indexItem)
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
    var src = 'img/small/' + productItem['_name'] + '_' + productItem['_color'] + '_' + '0' + '.jpg'
    $smallImg.src = src
    $elem.insertBefore($smallImg, $button)
}
/* ---- Визуализация всех объектов каталога----*/
function catalogVisual(productObject) {
    for (i = 0; i < productObject.length; i++) catalogVisualItem(productObject[i], i)
}
/* ---- Отображение большого изображения в блоке ----*/
function changeBigPicture(event) {
    var $previev = document.getElementById('previev')
    $previev.innerHTML = ''
    if (event.target.tagName === 'IMG') var $eventElement = event.target
    else if (event.target.tagName === 'DIV') var $eventElement = event.target.querySelector('img')
    else if (event.target.tagName === 'BUTTON') var $eventElement = event.target.parentElement.querySelector('img')
    var srcEnd = $eventElement.src.split('/').pop()
    var src = 'img/big/' + srcEnd
    var $bigImg = document.createElement('img')
    $bigImg.src = src
    $previev.appendChild($bigImg)
} 
/* ---- Открытие модального окна ----*/
function openModalWindow(event) {
    var $modalWindow = document.getElementById('modalWindow')
    var $previev = document.getElementById('previev')
    if ($previev.querySelector('img')) {
        var src = $previev.querySelector('img').src
        $modalWindow.src = src
    } 
}
/* ---- Переключение изображения в модальном окне ----*/
function arrowFoto(event) {
    event.preventDefault()
    var $modalWindow = document.getElementById('modalWindow')
    var srcEnd = $modalWindow.src.split('/').pop()
    if (event.target.id === 'rightArrowFoto' || event.keyCode == 39) {
        if (namberImg == 2) namberImg = -1
        src = 'img/big/' + srcEnd.split('_').splice(0, 2).join('_') + '_' + ++namberImg + '.jpg'
    }
    if (event.target.id === 'leftArrowFoto' || event.keyCode == 37) {
        if (namberImg == 0) namberImg = 3
        src = 'img/big/' + srcEnd.split('_').splice(0, 2).join('_') + '_' + --namberImg + '.jpg'
    }
    $modalWindow.src = src
}
/* ---- Сворачивание и разворачивание разделов Корзина, Доставка, Комментарий ----*/
function inDelivery(event) {
    event.target .parentElement.removeAttribute('open') //сворачивание текущего раздела при нажатии на кнопку
    document.getElementById('delivery').setAttribute('open','open') // разворачивание следующего раздела
    document.getElementById('inComment').classList.remove('invisible') // появление контента следующего раздела
}
function inComment(event) {
    event.target .parentElement.removeAttribute('open') //сворачивание текущего раздела при нажатии на кнопку
    document.getElementById('comment').setAttribute('open','open') // разворачивание следующего раздела
    document.getElementById('submit').classList.remove('invisible') // появление контента следующего раздела
}
/* ---- Функция объединяющая загрузку всего js после загрузки html ----*/
function init() {
    messageCart('В корзине пусто.') // вывод сообщения о пустой корзине по умолчанию
    document.getElementById('clear').textContent = 'Очистить корзину'  // кнопка очистки корзины ...
    document.getElementById('clear').addEventListener('click', handleClearCart) //
    catalogVisual(product)  // визуализация каталога
    var imagesItem = document.getElementsByClassName('productItem') // при клике на карточку товара появляется превью ...
    for (var j = 0; j < imagesItem.length; j++) imagesItem[j].onclick = changeBigPicture // 
    document.getElementById('previev') .addEventListener('click', openModalWindow) // при клике на превью поялвятеся модальное окно ...
    document.getElementById('rightArrowFoto').addEventListener('click', arrowFoto) //стрелки превью...
    document.getElementById('leftArrowFoto').addEventListener('click', arrowFoto) //
    document.getElementsByClassName('deleteProduct')[0].addEventListener('click', handleClearCart)  // крестик в шапке удаляет весь товар...
    document.getElementById('inDelivery').addEventListener('click', inDelivery) // при нажатии кнопки Далее открывается Доставка
    document.getElementById('inComment').addEventListener('click', inComment)  // при нажатии кнопки Далее открывается Комметарий
    window.addEventListener('keydown', arrowFoto) // перелистывание картинок клавишами
}
window.addEventListener('load', init)

