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
            this.cartList = [ //-----------------------TEST----------------------
                {
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
                  "count": 5
                }]
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
