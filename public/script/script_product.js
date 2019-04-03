const API_URL = 'http://localhost:3000'

Vue.component('product-list-component', {
    props: ['product_list', 'add_to_cart'],
    template: `
    <div class="productItems" id="product" >
        <product-item-component v-for="product_item in product_list" :product_item ="product_item" :add_to_cart="add_to_cart" ></product-item-component>
    </div>
    `
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
    </a>   
     `
})

const app = new Vue({
    el: '#app',
    data: {
        productList: [],
        cartList: [],
        searchInput: '',
        handleSearchInput: ''
    },
    computed: {
        filtredItems() {
            const regexp = new RegExp(this.handleSearchInput, 'i')
            return this.productList.filter((item) => regexp.test(item.name))
        }
    },
    methods: {
        buttonInput() { //передача input после нажатия кнопки
            this.handleSearchInput = this.searchInput
        },

        addToCart(productItem) { //добавление товара в корзину
            const inCartList = this.cartList.find(item => item.article === productItem.article)
            if (inCartList) {
                inCartList.count++
                fetch(API_URL + '/cart/' + inCartList.id, { // если товар  в корзине на сервере, добавляем количество ++
                    method: 'PATCH',
                    body: JSON.stringify({count: inCartList.count}),
                    headers: {'Content-type': 'application/json',}
                }).then(() => alert('Товар уже был добавлен в корзину. Увеличено количество товара.'))
                console.log( this.cartList)
            } else {
                fetch(API_URL + '/cart/', { // если товара нет в корзине на сервере, создаём новый товар
                    method: 'POST',
                    body: JSON.stringify({...productItem, count: 1}), 
                    headers: {'Content-type': 'application/json'}
                }).then(() => alert('Товар добавлен в корзину!'))
                console.log(this.cartList)
                var copyObjCart = Object.assign({}, productItem)
                copyObjCart.count = 1
                this.cartList.push(copyObjCart)
            }
        }
    },
    mounted() {
        fetch(API_URL)
            .then(response => response.json())
            .then((product) => this.productList = product, (error) => console.log(error))
        fetch(API_URL + '/cart/').then(response => response.json())
            .then((cart) => this.cartList = cart, (error) => console.log(error))
            this.productList = [
                {
                  "id": 1,
                  "article": "000001",
                  "name": "Mango People T-shirt",
                  "price": 52
                },
                {
                  "id": 2,
                  "article": "000002",
                  "name": "Mango People Blouse",
                  "price": 68
                },
                {
                  "id": 3,
                  "article": "000003",
                  "name": "Mango People Jacket",
                  "price": 48
                },
                {
                  "id": 4,
                  "article": "000004",
                  "name": "Mango People Dress",
                  "price": 37
                },
                {
                  "id": 5,
                  "article": "000005",
                  "name": "Mango People Dress",
                  "price": 67
                },
                {
                  "id": 6,
                  "article": "000006",
                  "name": "Mango People Blazer",
                  "price": 62
                },
                {
                  "id": 7,
                  "article": "000007",
                  "name": "Mango People Pants",
                  "price": 75
                },
                {
                  "id": 8,
                  "article": "000008",
                  "name": "Mango People Sweatshirt",
                  "price": 45
                }
              ],
              this.cartList =  [
                {
                  "article": "000001",
                  "name": "Mango People T-shirt",
                  "price": 52,
                  "id": 1,
                  "count": 1
                },
                {
                  "article": "000007",
                  "name": "Mango People Pants",
                  "price": 75,
                  "id": 7,
                  "count": 1
                }
              ]
    }
})