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
    {article: '000002', name: 'Mango People Blouse', price: 68.00, count: 3},
    {article: '000005', name: 'Mango People Dress', price: 67, count: 3}
]


/*------------------------- Вывод каталога -------------------------*/
class CreateCartItem {  //класс, создающий объект с указанными свойствами продукта и с методом renderHtml, который возвращающает разметку
    constructor(article, name, price, count) {
        this.article = article
        this.name = name
        this.price = price
        this.count = count
    }
    renderHtmlCart() {  // разметку элемента в корзине
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
    getCartListServer() {
        this.cartList = cart  //запрашиваем товары для корзины
    }
    sumCart() {  // суммарная стоимость всех продуктов в корзине
        var sumPrice = this.cartList.reduce(function(sum, item) {
            return sum + (item.price * item.count)}, 0)
        document.getElementById('priceTotal').innerHTML = `Sub total&nbsp;&nbsp;&nbsp;&nbsp;$ ${sumPrice}
                    <p>GRAND TOTAL <span id="grandTotal">&nbsp;&nbsp;&nbsp;$ ${sumPrice}</span></p>`
    }
    сreateHtmlCart() {    
        var htmlString = '';
         this.cartList.forEach(function(productItem) { 
                var productItem = new CreateCartItem(productItem.article, productItem.name, productItem.price, productItem.count)  
                htmlString += productItem.renderHtmlCart() 
            })
        document.getElementById('productCart').innerHTML = htmlString 
    }
}

function init () {
    const createCart = new CreateCartList() // создаём экземпляр класса создающего список товара
    createCart.getCartListServer() // вызываем у этого экземпляра метод получающий список товаров с сервера 
    createCart.сreateHtmlCart() // вызываем метод генерирующий разметку каждого товара поочерёдно
    createCart.sumCart() // суммарная стоимость всех продуктов
} 

window.addEventListener('load', init)