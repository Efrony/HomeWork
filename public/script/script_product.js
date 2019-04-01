const app = new Vue({
    el: '#app',
    data: {
        productList: [],
        cartList: [],
        filtredList: [],
        searchInput: '',
        handleSearchInput: ''
    },
    computed: {
        filtredItems() {
            const regexp = new RegExp(this.handleSearchInput, 'i')
            return  this.productList.filter((item) => regexp.test(item.name))
        }
    },
    methods: {
        buttonInput () { //передача input после нажатия кнопки
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
                console.log('добавлен+1')

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
                console.log('добавлен')
            }
        }

    },
    mounted() {
        fetch('http://localhost:3000/product')
            .then(response => response.json())
            .then((product) => {
                    this.productList = product
                    this.filtredList = product
                },
                (error) => console.log(error))

        this.filtredList = [{ // удалить .......
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
        ]
        this.productList = [{ // удалить .......
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
        ]
        // ...............................................

        fetch('http://localhost:3000/cart').then(response => response.json())
            .then((cart) => this.cartList = cart, (error) => console.log(error))
    }

})