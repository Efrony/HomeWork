const API_URL = 'http://localhost:3000'

Vue.component('product-list-component', {
    props: ['product_list', 'add_to_cart'],
    template: `
    <div class="productItems" id="product" >
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

Vue.component('search-component', {
    props: ['search_input', 'button_input'],
    template: `
    <div class="search">
        <button class="browse">Browse <i class="fas fa-caret-down"></i></button>
        <input @keyup.enter="button_input(search_input)" v-model="search_input" type="search" placeholder="Search for Item...">
        <button  @click.prevent="button_input(search_input)"  type="button" class="searchButton"><i class="fas fa-search"></i></button>
    </div>`
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
        }
    },
    methods: {
        buttonInput(searchInput) { //передача input после нажатия кнопки
            console.log('поиск!')
            this.handleSearchInput = searchInput
        },

        addToCart(productItem) { //добавление товара в корзину
            const inCartList = this.cartList.find(item => item.article === productItem.article)
            if (inCartList) {    
                fetch(API_URL + '/cart/' + inCartList.id, { // если товар  в корзине на сервере, добавляем количество ++
                    method: 'PATCH',
                    body: JSON.stringify({count: inCartList.count+1}),
                    headers: {'Content-type': 'application/json'}
                }).then(() => {
                    alert('Товар уже был добавлен в корзину. Увеличено количество товара.')
                    inCartList.count++
                })
            } else {
                fetch(API_URL + '/cart/', { // если товара нет в корзине на сервере, создаём новый товар
                    method: 'POST',
                    body: JSON.stringify({...productItem,count: 1}),
                    headers: {'Content-type': 'application/json'}
                }).then(() => {
                    alert('Товар добавлен в корзину!')
                    var copyObjCart = Object.assign({}, productItem)
                    copyObjCart.count = 1
                    this.cartList.push(copyObjCart)
                    })
            }
        }
    },
    mounted() {
        fetch(API_URL + '/product')
            .then(response => response.json())
            .then((product) => this.productList = product, (error) => console.log(error))
        fetch(API_URL + '/cart').then(response => response.json())
            .then((cart) => this.cartList = cart, (error) => console.log(error))
    }
})