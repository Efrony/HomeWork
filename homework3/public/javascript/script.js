function sendRequest(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            callback(JSON.parse(xhr.responseText));
        }
    }
}

class GoodsItem {
    constructor(name, price, cover) {
        this.cover = cover;
        this.name = name;
        this.price = price;
    }
    render() {
        return `<div class='featuredItem'>
                    <div class='featuredImgWrap'>
                        <div class='featuredBuy'>
                            <button>
                                <img  src='images/addToCart.png' alt="">Add to Cart
                            </button>
                        </div>
                        <img src=${this.cover}>
                    </div>
                    <div class='featuredNameAndPrice'>
                        <div class='featuredItemName'>
                            ${this.name}
                        </div>
                        <div class='featuredItemPrice'>
                            $${this.price.toFixed(2)}
                        </div>
                    </div>
                </div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods(callback) {
        sendRequest('http://localhost:3000/products.json', (products) => {
            this.goods = products.map(item => new GoodsItem(item.name, item.price, item.cover));
            callback();
        });
    }

    render() {
        const itemsHtml = this.goods.map(item => item.render());
        return itemsHtml.join('');
    }

    totalPrice() {
        return this.goods.reduce((sum, item) => sum + item.price, 0);
    }
}

class CartItem {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.sum = this.price * this.quantity;
    }
    render() {
        return `<div id='cartProduct' class='cartProduct'>
                    <div class='name'>${this.name}</div>
                    <div class='price'>${this.price}</div>
                    <div class='quantity'>${this.quantity}</div>
                    <div class='sum'>${this.sum}</div>
                    <button class='deleteProduct'>X</button>
                </div>`;
    }
}

class CartList {
    constructor() {
        this.cart = [];
    }

    getCart(callback) {
        sendRequest('http://localhost:3000/cart.json', (cart) => {
            this.cart = cart.map(cartItem => new CartItem(cartItem.name, cartItem.price, cartItem.quantity));
            callback();
        });
    }

    render() { // отображение корзины на экране браузера
        const cartItemsHtml = this.cart.map(cartItem => cartItem.render());
        return cartItemsHtml.join('');
    }

    increaseItems() { //метод для увеличения количества товаров в корзине 

    }

    removeItems() { //метод для удаления товаров из корзины 

    }

    totalCart() { // метод подсчета суммы корзины

    }

    discountCart() { // метод для оформления скидки на товары в корзине

    }

    orderCart() { // подготовка корзины к оформлению заказа и непосредственно сам заказ

    }
}

function init() {
    const goods = new GoodsList();
    goods.fetchGoods(() => {
        document.querySelector('.featuredItems').innerHTML = goods.render();
        console.log('Общая стоимость товаров каталога равна ' + goods.totalPrice());
    });
    const cart = new CartList();
    cart.getCart(() => {
        document.querySelector('.cartItems').innerHTML = cart.render();
    });
}
window.addEventListener('load', init)