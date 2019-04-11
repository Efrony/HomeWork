const API_URL = 'http://localhost:3001'

Vue.component('product-list-component', {
    props: ['product_list', 'add_to_cart'],
    template: `
    <div class="product" id="product" >
        <product-item-component v-for="product_item in product_list" :product_item ="product_item" :add_to_cart="add_to_cart" ></product-item-component>
    </div>`
})

Vue.component('product-item-component', {
    props: ['product_item', 'add_to_cart'],
    template: `
    <a href="#">
        <figure class="productItem" :id=product_item.article>
            <img :src="'img/product/'+ product_item.article + '.jpg'" alt="productFoto">
            <div class="shadowHover">
                <button  @click.prevent="add_to_cart(product_item)" class="addToCart">&ensp;Add to Cart</button>
            </div>
            <figcaption>{{product_item.name}}
                <p>$ {{product_item.price}}</p>
            </figcaption>
        </figure>
    </a>`
})

const app = new Vue({
    el: '#app',
    data: {
        productList: [],
        cartList: [],
        handleSearchInput: ''
    },
    computed: {
        filtredItems() {
            const regexp = new RegExp(this.handleSearchInput, 'i')
            return this.productList.filter((item) => regexp.test(item.name))
        },
        countCart() {
            return this.cartList.reduce(function (sum, item) {
                return sum + item.count
            }, 0)
        }
    },
    methods: {
        buttonInput(searchInput) { //передача input после нажатия кнопки
            console.log('поиск!')
            this.handleSearchInput = searchInput
        },

        addToCart(productItem) { //добавление товара в корзину
            const inCartList = this.cartList.find(item => item.article == productItem.article)
            if (inCartList) {    
                fetch(API_URL + '/cart/' + inCartList.id, { // если товар  в корзине на сервере, добавляем количество ++
                    method: 'PATCH',
                    body: JSON.stringify({count: inCartList.count + 1}),
                    headers: {'Content-type': 'application/json'}
                }).then((response) => response.json())
                .then((response) =>{
                    alert('Товар уже был добавлен в корзину. Увеличено количество товара.')
                    inCartList.count = response.count
                })
            } else {
                fetch(API_URL + '/cart/', { // если товара нет в корзине на сервере, создаём новый товар
                    method: 'POST',
                    body: JSON.stringify({...productItem, count: 1}),
                    headers: {'Content-type': 'application/json'}
                }).then((response) => response.json())
                .then((createdItem) => {
                    alert('Товар добавлен в корзину!')
                    this.cartList.push(createdItem)
                    })
            }
        }
    },
    mounted() {
        fetch(API_URL + '/product')
            .then(response => response.json())
            .then((product) => this.productList = product)
        fetch(API_URL + '/cart').then(response => response.json())
            .then((cart) => this.cartList = cart)
    }
})


/* ООП классы

class CreateProductItem { //передача получаемых параметров в разметку 
    constructor(article, name, price, count) {
        this.article = article
        this.name = name
        this.price = price
        this.count = count
    }
    renderHtmlCatalog() { // метод возвращающий разметку элемента в каталоге
        return `<a> 
                    <figure class="productItem" id="${this.article}">
                        <img src="img/product/${this.article}.jpg" alt="productFoto">
                        <div class="shadowHover">
                            <button class="addToCart">&ensp;Add to Cart</button>
                        </div>
                        <figcaption>${this.name}
                            <p>$ ${this.price}</p>
                        </figcaption>
                    </figure>
                </a>`
    }
}
class CreateProductList {
    constructor() {
        this.productList = []
        this.cartList = []
        sumCart = ''
    }
    getProductListServer() {
        return fetch('http://localhost:3001/product').then(response => response.json())
            .then((product) => this.productList = product, (error) => console.log(error))
    }
    getCartListServer() {
        return fetch('http://localhost:3001/cart').then(response => response.json())
            .then((cart) => this.cartList = cart, (error) => console.log(error))
    }
    sumCart() { // суммарная стоимость всех продуктов в корзине
        this.sumCart = this.cartList.reduce(function (sum, item) {
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
        if (inCartList) {
            inCartList.count++
            fetch('http://localhost:3001/cart/' + inCartList.id, { // если товар  в корзине на сервере, добавляем количество ++
                method: 'PATCH',
                body: JSON.stringify({
                    count: inCartList.count,
                }),
                headers: {
                    'Content-type': 'application/json',
                }
            }).then(() => alert('Товар уже был добавлен в корзину. Увеличено количество товара.'))

        } else {
            fetch('http://localhost:3001/cart', { // если товара нет в корзине на сервере, создаём новый товар
                method: 'POST',
                body: JSON.stringify({
                    article: inProductList.article,
                    name: inProductList.name,
                    price: inProductList.price,
                    id: inProductList.id,
                    count: 1
                }),
                headers: {
                    'Content-type': 'application/json',
                }
            }).then(() => alert('Товар добавлен в корзину!'))

            var copyObjCart = Object.assign({}, inProductList)
            copyObjCart.count = 1
            this.cartList.push(copyObjCart)
        }

    }
}

function init() {
    const createProducs = new CreateProductList()
    createProducs.getCartListServer()
    createProducs.getProductListServer()
        .then(() => createProducs.сreateHtmlCatalog())
}
window.addEventListener('load', init) 
*/