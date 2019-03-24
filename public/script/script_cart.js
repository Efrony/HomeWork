/*------------------------- Вывод каталога -------------------------*/
class CreateCartItem { //класс, создающий объект с указанными свойствами продукта и с методом renderHtml, который возвращающает разметку
    constructor(article, name, price, count) {
        this.article = article
        this.name = name
        this.price = price
        this.count = count
    }
    renderHtmlCart() { // разметку элемента в корзине
        return `<div class="productItem">
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
                    <div class="action"><img src="img/cart/delete.png" alt="del"></div>
                </div>`
    }
}
class CreateCartList { // класс, создающий объект (экземпляр) с методом полученния массива товаров с сервера, и методом вывода этого списка по одному товару через CreateProductItem.renderHtml
    constructor() {
        this.cartList = []
    }
    getCartListServer(cart) {
        this.cartList = cart
    }
    sumCart() { // суммарная стоимость всех продуктов в корзине
        var sumPrice = this.cartList.reduce(function (sum, item) {
            return sum + (item.price * item.count)
        }, 0)
        document.getElementById('priceTotal').innerHTML = `Sub total&nbsp;&nbsp;&nbsp;&nbsp;$ ${sumPrice}
                    <p>GRAND TOTAL <span id="grandTotal">&nbsp;&nbsp;&nbsp;$ ${sumPrice}</span></p>`
    }
    сreateHtmlCart() {
        var htmlString = '';
        this.cartList.forEach(function (productItem) {
            var productItem = new CreateCartItem(productItem.article, productItem.name, productItem.price, productItem.count)
            htmlString += productItem.renderHtmlCart()
        })
        document.getElementById('productCart').innerHTML = htmlString
    }
}

function sendRequest(url) {
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
        .then((cart) => createCart.getCartListServer(cart), (error) => console.log(error))  // вызываем у этого экземпляра метод получающий список товаров с сервера 
        .then(() => createCart.сreateHtmlCart()) // вызываем метод генерирующий разметку каждого товара поочерёдно
        .then(() => createCart.sumCart()) // суммарная стоимость всех продуктов
}
window.addEventListener('load', init)