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
                        <input type="text" value="${this.count}" class ="countInput">
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
    getCartListServer() {
        return fetch('http://localhost:3000/cart').then(response => response.json())
            .then((cart) => this.cartList = cart, (error) => console.log(error))
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
        for (var i = 0; i < $buttonsDelCart.length; i++) {
            $buttonsDelCart[i].addEventListener('click', this.deleteToCart.bind(this))
            document.getElementsByClassName('countInput')[i].addEventListener('change', this.countInput.bind(this))
        }
    }
    countInput(event) { // изменение количества через поле ввода
        const idProduct = event.target.parentElement.parentElement
        const inCartList = this.cartList.find(item => item.article == idProduct.id)
        inCartList.count = +event.target.value
        this.сreateHtmlCart()
        this.sumCart()
        fetch('http://localhost:3000/cart/' + inCartList.id, {
            method: 'PATCH',
            body: JSON.stringify({
                count: inCartList.count,
            }),
            headers: {
                'Content-type': 'application/json',
            }
        }).then(() => alert('Количество изменено.'))


    }
    deleteToCart(event) { // удаление товара из корзины
        const idProduct = event.target.parentElement.parentElement
        const inCartList = this.cartList.find(item => item.article == idProduct.id)
        inCartList.count = 0
        idProduct.remove()
        this.sumCart()
        fetch('http://localhost:3000/cart/' + inCartList.id, {
            method: 'DELETE',
        }).then(() => alert('Товар удалён из корзины'))
    }


}

function init() {
    const createCart = new CreateCartList() // создаём экземпляр класса создающего список товара
    createCart.getCartListServer()
        .then(() => createCart.сreateHtmlCart()) //  метод генерирующий разметку каждого товара поочерёдно
        .then(() => createCart.sumCart()) // суммарная стоимость всех продуктов
}
window.addEventListener('load', init)