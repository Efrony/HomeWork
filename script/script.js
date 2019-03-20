var product = [
    {article: '000001', name: 'Mango People T-shirt', price: 52.00},
    {article: '000002', name: 'Mango People Blouse', price: 68.00},
    {article: '000003', name: 'Mango People Jacket', price: 48},
    {article: '000004', name: 'Mango People Dress', price: 37},
    {article: '000005', name: 'Mango People Dress', price: 67},
    {article: '000006', name: 'Mango People Blazer', price: 62},
    {article: '000007', name: 'Mango People Pants', price: 75},
    {article: '000008', name: 'Mango People Sweatshirt', price: 45}
]

var cart = [
    {article: '000001', name: 'Mango People T-shirt', price: 52.00, count: 1},
    {article: '000002', name: 'Mango People Blouse', price: 68.00, count: 3}
]


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
    renderHtmlCart() {  // разметку элемента в корзине
        return `<figure>
                    <img src="img/product/${this.article}.jpg" alt="productFoto">
                    <figcaption>${this.name}<p>$ ${this.price}</p><p>$ ${this.count}</p></figcaption>
                </figure>`
    }
}

class CreateProductList { // класс, создающий объект (экземпляр) с методом полученния массива товаров с сервера, и методом вывода этого списка по одному товару через CreateProductItem.renderHtml
    constructor() {
        this.productList = [] 
        this.cartList = []
    }
    getProductListServer() {
        this.productList = product  //запрашиваем товары для каталога
    }
    getCartListServer() {
        this.cartList = cart // //запрашиваем товары для корзины
    }
    /*----------------------взависимости от списка создётся каталог или корзина----------------*/
    сreateHtmlCatalog() {    
        var htmlString = '';
         this.productList.forEach(function(productItem) { //для каждого из массива выполнить функцию...
                var productItem = new CreateProductItem(productItem.article, productItem.name, productItem.price, productItem.count)  // на основе класса CreateProductItem создать объект (экземпляр) и присвоить его переменной productItem
                htmlString += productItem.renderHtmlCatalog()  // у только что созданного эксемпляра взять разметку и присвоить его строке html 
            })
        document.getElementById('product').innerHTML = htmlString 
    }
    сreateHtmlCart() {    
        var htmlString = '';
         this.cartList.forEach(function(productItem) { 
                var productItem = new CreateProductItem(productItem.article, productItem.name, productItem.price, productItem.count)  
                htmlString += productItem.renderHtmlCart() 
            })
        document.getElementById('cart').innerHTML = htmlString 
    }
}






function init () {
    const createProducs = new CreateProductList() // создаём экземпляр класса создающего список товара
    createProducs.getProductListServer() // вызываем у этого экземпляра метод получающий список товаров с сервера 
    createProducs.сreateHtmlCatalog() // вызываем метод генерирующий разметку каждого товара поочерёдно
    createProducs.getCartListServer()
    createProducs.сreateHtmlCart()
} 

window.addEventListener('load', init)