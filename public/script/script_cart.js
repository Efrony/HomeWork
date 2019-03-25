/*------------------------- Вывод каталога -------------------------*/
class CreateCartItem { //передача получаемых параметров в разметку 
    constructor(article, name, price, count) {
        this.article = article
        this.name = name
        this.price = price
        this.count = count
    }
    renderHtmlCart() { // разметку элемента в корзине
        return `<div class="productItem" id="${this.article}">
                    <figure>
                        <a href="#"><img src="img/product/${this.article}.jpg" alt="${this.article}"></a>
                        <figcaption>${this.name}
                            <p><b>Color:</b> Red
                                <br><b>Size:</b> Xll</p>
                        </figcaption>
                    </figure>
                    <div class="unitePrice">$ ${this.price}</div>
                    <div class="quantity">
                        <div>${this.count}</div>
                    </div>
                    <div class="shipping">FREE</div>
                    <div class="subtotal">$ ${this.price * this.count}</div>
                    <div class="action"><img class="deleteButton" src="img/cart/delete.png" alt="del"></div>
                </div>`
    }
}
class CreateCartList { 
    constructor() {
        this.cartList = []
    }
    getCartListServer(cart) { //объект cart приходит после ответа с сервера через then (в init)
        this.cartList = cart
    }
    sumCart() { // суммарная стоимость всех продуктов в корзине
        var sumPrice = this.cartList.reduce(function (sum, item) {
            return sum + (item.price * item.count)
        }, 0)
        document.getElementById('priceTotal').innerHTML = `Sub total&nbsp;&nbsp;&nbsp;&nbsp;$ ${sumPrice}
                    <p>GRAND TOTAL <span id="grandTotal">&nbsp;&nbsp;&nbsp;$ ${sumPrice}</span></p>`
    }
    сreateHtmlCart() { // создание разметки для всех товаров корзины
        var htmlString = '';
        this.cartList.forEach(function (productItem) {
            var productItem = new CreateCartItem(productItem.article, productItem.name, productItem.price, productItem.count)
            htmlString += productItem.renderHtmlCart()
        })
        document.getElementById('productCart').innerHTML = htmlString
        var $buttonsDelCart = document.getElementsByClassName('deleteButton')
        for (var i = 0; i < $buttonsDelCart.length; i++) $buttonsDelCart[i].addEventListener('click', this.deleteToCart.bind(this))
    }
    deleteToCart(event) { // удаление товара из корзины
        const idProduct = event.target.parentElement.parentElement
        const inCartList = this.cartList.find(item => item.article == idProduct.id)
        inCartList.count = 0
        idProduct.remove()
    }
}

function sendRequest(url) { // запрос на сервер
    return new Promise(function (resolve, fail) {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.send()
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status >= 400) fail('error' + xhr.status)
                else resolve(JSON.parse(xhr.responseText))
            }
        }
    })
}

function init() {
    const createCart = new CreateCartList() // создаём экземпляр класса создающего список товара
    sendRequest('http://localhost:3000/cart.json')
        .then((cart) => createCart.getCartListServer(cart), (error) => console.log(error)) // отправляем запрос на сервер, полученный список передаём в метод конструктора 
        .then(() => createCart.сreateHtmlCart()) //  метод генерирующий разметку каждого товара поочерёдно
        .then(() => createCart.sumCart()) // суммарная стоимость всех продуктов
}
window.addEventListener('load', init)