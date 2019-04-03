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
        deleteToCart(event) { // удаление товара из корзины
            const idProduct = event.target.parentElement.parentElement
            const inCartList = this.cartList.find(item => item.article == idProduct.id)
            const inCartListIndex = this.cartList.findIndex(item => item.article == idProduct.id)
            fetch('http://localhost:3000/cart/' + inCartList.id, {
                method: 'DELETE',
            }).then(() => {
                this.cartList.splice(inCartListIndex, 1)
                alert('Товар удалён из корзины')
            })
        },
        countInput(event) { // изменение количества через поле ввода
            const idProduct = event.target.parentElement.parentElement
            const inCartList = this.cartList.find(item => item.article == idProduct.id)
            fetch('http://localhost:3000/cart/' + inCartList.id, {
                method: 'PATCH',
                body: JSON.stringify({
                    count: +event.target.value,
                }),
                headers: {
                    'Content-type': 'application/json',
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
    }
})

