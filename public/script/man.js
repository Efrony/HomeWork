
const app = new Vue({
    el: '#app',
    data: {
        API_URL: 'http://localhost:3001',
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
                fetch(this.API_URL + '/cart/' + inCartList.id, { // если товар  в корзине на сервере, добавляем количество ++
                    method: 'PATCH',
                    body: JSON.stringify({count: inCartList.count + 1}),
                    headers: {'Content-type': 'application/json'}
                }).then((response) => response.json())
                .then((response) =>{
                    alert('Товар уже был добавлен в корзину. Увеличено количество товара.')
                    inCartList.count = response.count
                })
            } else {
                fetch(this.API_URL + '/cart/', { // если товара нет в корзине на сервере, создаём новый товар
                    method: 'POST',
                    body: JSON.stringify({...productItem, count: 1}),
                    headers: {'Content-type': 'application/json'}
                }).then((response) => response.json())
                .then((createdItem) => {
                    alert('Товар добавлен в корзину!')
                    this.cartList.push(createdItem)
                    })
            }
        },
        isAuth() {
            return true
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
    mounted() {
        fetch(this.API_URL + '/product')
            .then(response => response.json())
            .then((product) => this.productList = product)
        fetch(this.API_URL + '/cart').then(response => response.json())
            .then((cart) => this.cartList = cart)
    }
})

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
