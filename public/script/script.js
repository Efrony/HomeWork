/*------------------------- Вывод каталога -------------------------*/
class CreateProductItem { //передача получаемых параметров в разметку 
    constructor(article, name, price, count) {
        this.article = article
        this.name = name
        this.price = price
        this.count = count
    }
    renderHtmlCatalog() { // метод возвращающий разметку элемента в каталоге
        return `<figure class="productItem" id="${this.article}">
                    <img src="img/product/${this.article}.jpg" alt="productFoto">
                    <div class="shadowHover">
                        <button class="addToCart">&ensp;Add to Cart</button>
                    </div>
                    <figcaption>${this.name}<p>$ ${this.price}</p></figcaption>
                    </figure>`
    }
}
class CreateProductList {
    constructor() {
        this.productList = []
        this.cartList = []
    }
    getProductListServer() {
        return sendRequest('http://localhost:3000/product.json')
            .then((product) => this.productList = product, (error) => console.log(error))

    }
    sumCart() { // суммарная стоимость всех продуктов в корзине
        var sumPrice = this.cartList.reduce(function (sum, item) {
            return sum + (item.price * item.count)
        }, 0)
    }
    сreateHtmlCatalog() { // создание разметки для всех товаров списка
        var htmlString = '';
        this.productList.forEach(function (productItem) {
            var productItem = new CreateProductItem(productItem.article, productItem.name, productItem.price, productItem.count)
            htmlString += productItem.renderHtmlCatalog()
        })
        document.getElementById('product').innerHTML = htmlString
        var $buttonsAddCart = document.getElementsByClassName('addToCart')
        for (var i = 0; i < $buttonsAddCart.length; i++) $buttonsAddCart[i].addEventListener('click', this.addToCart.bind(this))
    }
    addToCart(event) { //добавление товара в корзину
        const idProduct = event.target.parentElement.parentElement.id
        const inProductList = this.productList.find(item => item.article == idProduct)
        const inCartList = this.cartList.find(item => item.article == idProduct)
        if (inCartList) inCartList.count++
        else {
            var copyObjCart = Object.assign({}, inProductList)
            copyObjCart.count = 1
            this.cartList.push(copyObjCart)
        }
        console.log(this.cartList)

    }
}

function sendRequest(url) {
    return fetch(url).then(response => response.json())  // запрос на сервер

    /* return new Promise(function (resolve, fail) { 
         const xhr = new XMLHttpRequest()
         xhr.open('GET', url)
         xhr.send()
         xhr.onreadystatechange = function () {
             if (xhr.readyState === XMLHttpRequest.DONE) {
                 if (xhr.status >= 400) fail('error' + xhr.status)
                 else resolve(JSON.parse(xhr.responseText))*/
}


function init() {
    const createProducs = new CreateProductList() // создаём экземпляр класса создающего список товара
    createProducs.getProductListServer() // отправляем запрос на сервер, полученный список передаём в метод конструктора 
        .then(() => createProducs.сreateHtmlCatalog()) //  метод генерирующий разметку каждого товара поочерёдно
}
window.addEventListener('load', init)