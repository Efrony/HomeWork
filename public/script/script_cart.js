const API_URL = 'http://localhost:3000'

Vue.component('cart-list-component', {
    props: ['cart_list', 'delete_to_cart', 'count_input'],
    template: `
    <div>
        <div v-if="cart_list.length == 0" class="newArrivalsBlock">
            <div class="newArrivals">
                <p>В корзине пусто...</p>
                <nav>Добавьте товар <span>в корзину</span></nav>
            </div>
        </div>
        <div v-if="cart_list.length != 0" class="cart">
            <div class="hat">
                <div>Product Details </div>
                <div>unite Price</div>
                <div>Quantity</div>
                <div>shipping</div>
                <div>Subtotal</div>
                <div>ACTION</div>
            </div>
            <div class="productCart" id="productCart">
            <cart-item-component v-for="product_item in cart_list" :product_item ="product_item" :delete_to_cart="delete_to_cart" :count_input="count_input"></cart-item-component>
            </div>
        </div>
    </div>
    `
})
Vue.component('cart-item-component', {
    props: ['product_item', 'delete_to_cart', 'count_input'],
    template: `
    <div class="productItem" :id="product_item.article">
        <figure>
            <a href="#"><img :src="'img/product/'+ product_item.article + '.jpg'" :alt="product_item.article"></a>
            <figcaption>{{product_item.name}}
                <p><b>Color:</b> Red
                <br><b>Size:</b> Xll</p>
            </figcaption>
        </figure>
        <div class="unitePrice">$ {{product_item.price}}</div>
        <div class="quantity">
            <input type="text" @change="count_input" :value="product_item.count" class="countInput">
        </div>
        <div class="shipping">FREE</div>
        <div class="subtotal">$ {{product_item.price * product_item.count}}</div>
        <div class="action"><img @click="delete_to_cart(product_item)" class="deleteButton" src="img/cart/delete.png" alt="del"></div>
    </div>`
})

const app = new Vue({
    el: '#app',
    data: {
        cartList: []
    },
    computed: {
        sumCart() {
            return this.cartList.reduce(function (sum, item) {
                return sum + (item.price * item.count)
            }, 0)
        }
    },
    methods: {
        deleteToCart(productItem) { // удаление товара из корзины
            const inCartListIndex = this.cartList.findIndex(item => item.article == productItem.article)
            fetch(API_URL + '/cart/' + productItem.id, {
                    method: 'DELETE'
                })
                .then(() => {
                    this.cartList.splice(inCartListIndex, 1)
                    alert('Товар удалён из корзины')
                })
        },
        countInput(event) { // изменение количества через поле ввода
            const idProduct = event.target.parentElement.parentElement
            const inCartList = this.cartList.find(item => item.article == idProduct.id)
            fetch(API_URL + '/cart/' + inCartList.id, {
                method: 'PATCH',
                body: JSON.stringify({
                    count: +event.target.value
                }),
                headers: {
                    'Content-type': 'application/json'
                }
            }).then(() => {
                inCartList.count = +event.target.value
                alert('Количество изменено.')
            })
        }
    },

    mounted() {
        fetch('http://localhost:3000/cart')
            .then(response => response.json())
            .then((cart) => this.cartList = cart, (error) => console.log(error))
        this.cartList = [{
                "id": 1,
                "article": "000001",
                "name": "Mango People T-shirt",
                "price": 52,
                "count": 3
            },
            {
                "id": 2,
                "article": "000002",
                "name": "Mango People Blouse",
                "price": 68,
                "count": 3
            }, {
                "id": 7,
                "article": "000007",
                "name": "Mango People Pants",
                "price": 75,
                "count": 3
            },
            {
                "id": 8,
                "article": "000008",
                "name": "Mango People Sweatshirt",
                "price": 45,
                "count": 3
            }
        ]
    }
})