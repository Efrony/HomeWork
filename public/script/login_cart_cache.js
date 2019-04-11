const API_URL = 'http://localhost:3001'
const loginCar = new Vue({
    el: '#loginCart',
    data: {
        cartList: []
    },
    mounted() {
        fetch(API_URL + '/cart')
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
        }
    },
})
