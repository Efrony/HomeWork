Vue.component('cart-list-component', {
    props: ['cart_list'],
    methods: {
        clear_cart() {
            fetch(this.API_URL + '/cart/', {method: 'PUT'})
            .then(() => this.cart_list.splice(0, this.cart_list.length))
        }
    },
    template: `
    <div>
        <div>
            <div v-if="cart_list.length == 0" class="newArrivalsBlock">
                <div class="newArrivals">
                    <p>the cart is empty...</p>
                    <nav>add <span>product</span> to cart</nav>
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
                    <cart-item-component v-for="product_item in cart_list" :product_item ="product_item" :cart_list="cart_list"></cart-item-component>
                </div>
            </div>
        </div>
        <div class="buttonCart">
            <a @click.prevent="clear_cart" href="#">
                <div class="clearCart">cLEAR SHOPPING CART</div>
            </a>
                <a href="man.html">
                <div class="continueCart">cONTINUE sHOPPING</div>
            </a>
        </div>
    </div>
    `
})
Vue.component('cart-item-component', {
    props: ['product_item', 'count_input', 'cart_list'],
    data() {
        return {}
    },
    methods: {
        delete_to_cart(product_item) { // удаление товара из корзины
            const inCartListIndex = this.cart_list.findIndex(item => item.article == product_item.article)
            fetch(this.API_URL + '/cart/' + product_item.id, {method: 'DELETE'})
                .then(response => response.json())
                .then(deletedItem => {
                    this.cart_list.splice(inCartListIndex, 1)
                    alert(deletedItem.name + ' удален из корзины')
                })
        },
        count_input(event) { // изменение количества через поле ввода
            const idProduct = event.target.parentElement.parentElement
            const inCartList = this.cart_list.find(item => item.article == idProduct.id)
            fetch(this.API_URL + '/cart/' + inCartList.id, {
                    method: 'PATCH',
                    body: JSON.stringify({count: +event.target.value}),
                    headers: {'Content-type': 'application/json'}
                }).then(response => response.json())
                .then(changedItem => inCartList.count = changedItem.count)
        }
    },
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
        API_URL: 'http://localhost:3001',
        cartList: []
    },
    mounted() {
        fetch(this.API_URL + '/cart')
            .then(response => response.json())
            .then(cart => this.cartList = cart)
        },
    computed: {
        sumCart() {
            return this.cartList.reduce(function (sum, item) {
                return sum + (item.price * item.count)
            }, 0)
        },
        countCart() {
            return this.cartList.reduce(function (sum, item) {
                return sum + item.count
            }, 0)
        },
        isAuth() {
            return false
            /*
            if (localStorage.getItem('email') && localStorage.getItem('cipher')) {
                fetch(this.API_URL + '/accounts/', {
                    method: 'GET',
                    body: JSON.stringify({
                        email: localStorage.getItem('email'),
                        cipher: localStorage.getItem('cipher')
                    }),
                    headers: {
                        'Content-type': 'application/json'
                    }
                }).then(res => {
                    if (res.status == 200) {
                        return true
                    } 
                    if (res.status == 403) {
                        return false
                    } 
                })
            } else {
                return false
            }*/

        }
    },
})