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

        addToCart(event) { //добавление товара в корзину
            const idProduct = event.target.parentElement.parentElement.id
            const inProductList = this.productList.find(item => item.article == idProduct)
            const inCartList = this.cartList.find(item => item.article == idProduct)
            if (inCartList) {
                inCartList.count++
                fetch('http://localhost:3000/cart/' + inCartList.id, { // если товар  в корзине на сервере, добавляем количество ++
                    method: 'PATCH',
                    body: JSON.stringify({
                        count: inCartList.count,
                    }),
                    headers: {
                        'Content-type': 'application/json',
                    }
                }).then(() => alert('Товар уже был добавлен в корзину. Увеличено количество товара.'))

            } else {
                fetch('http://localhost:3000/cart', { // если товара нет в корзине на сервере, создаём новый товар
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
    },
    mounted() {
        fetch('http://localhost:3000/product')
            .then(response => response.json())
            .then((product) => this.productList = product, (error) => console.log(error))
        fetch('http://localhost:3000/cart').then(response => response.json())
            .then((cart) => this.cartList = cart, (error) => console.log(error))
    }
})