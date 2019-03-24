

/*------------------------- Вывод каталога -------------------------*/
class CreateProductItem {  //класс, создающий объект с указанными свойствами продукта и с методом renderHtml, который возвращающает разметку
    constructor(article, name, price, count) {
        this.article = article
        this.name = name
        this.price = price
        this.count = count
    }
    renderHtmlCatalog() {  // метод возвращающий разметку элемента в каталоге
        return `<figure class="productItem">
                    <img src="img/product/${this.article}.jpg" alt="productFoto">
                    <div class="shadowHover">
                        <button class="addToCart">&ensp;Add to Cart</button>
                    </div>
                    <figcaption>${this.name}<p>$ ${this.price}</p></figcaption>
                    </figure>`
    }
}

class CreateProductList { // класс, создающий объект (экземпляр) с методом полученния массива товаров с сервера, и методом вывода этого списка по одному товару через CreateProductItem.renderHtml
    constructor() {
        this.productList = [] 
    }
    getProductListServer(product) {
        this.productList = product  //запрашиваем товары для каталога
    }
    sumCart() { // суммарная стоимость всех продуктов в корзине
        var sumPrice = this.cartList.reduce(function(sum, item) {
            return sum + (item.price * item.count)}, 0)
    }
    сreateHtmlCatalog() {    
        var htmlString = '';
         this.productList.forEach(function(productItem) { //для каждого из массива выполнить функцию...
                var productItem = new CreateProductItem(productItem.article, productItem.name, productItem.price, productItem.count)  // на основе класса CreateProductItem создать объект (экземпляр) и присвоить его переменной productItem
                htmlString += productItem.renderHtmlCatalog()  // у только что созданного эксемпляра взять разметку и присвоить его строке html 
            })
        document.getElementById('product').innerHTML = htmlString 
    }
}

function sendRequest(url) {
    return new Promise(function (resolve, fail) {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.send()
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) resolve(JSON.parse(xhr.responseText))
        }
    })
}

function init() {
    const createProducs = new CreateProductList() // создаём экземпляр класса создающего список товара
    sendRequest('http://localhost:3000/product.json').then((product) => createProducs.getProductListServer(product)) // вызываем у этого экземпляра метод получающий список товаров с сервера  
        .then(() => createProducs.сreateHtmlCatalog()) // вызываем метод генерирующий разметку каждого товара поочерёдно
}



window.addEventListener('load', init)