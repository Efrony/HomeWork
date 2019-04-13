Vue.component('sum-cart-component', {
    props: ['cart_list', 'api_url'],
    computed: {
        sumCart() {
            return this.cart_list.reduce(function (sum, item) {
                return sum + (item.price * item.count)
            }, 0)
        }
    },
    template: `
    <div class="price" id="priceTotal">
        Sub total &nbsp;&nbsp;&nbsp;&nbsp;$ {{sumCart}}
        <p>GRAND TOTAL 
            <span id="grandTotal">
                &nbsp;&nbsp;&nbsp;$ {{sumCart}}
            </span>
        </p>
    </div>`
})

Vue.component('count-cart-component', {
    props: ['cart_list', 'api_url'],
    computed: {
        countCart() {
            return this.cart_list.reduce(function (sum, item) {
                return sum + item.count
            }, 0)
        }
    },
    template: `<div class="cartCount" v-if="countCart != 0">{{countCart}}</div>`
})

Vue.component('authorized-component', {
    props: ['api_url'],
    computed: {
        isAuth() {
            return false
            /*
            if (localStorage.getItem('email') && localStorage.getItem('cipher')) {
                fetch(this.api_url + '/accounts/', {
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
    template: 
    `
    <div>
        <slot name="section_login" v-if="isAuth"></slot>
        <slot name="section_logout" v-if="!isAuth"></slot>
        <slot name="exit_login" v-if="isAuth"></slot>
    </div>
    `
})


Vue.component('cart-list-component', {
    props: ['cart_list', 'api_url'],
    methods: {
        clear_cart() {
            fetch(this.api_url + '/cart/', {
                    method: 'PUT'
                })
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
                    <cart-item-component v-for="product_item in cart_list" :product_item ="product_item" :cart_list="cart_list" :api_url="api_url"></cart-item-component>
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
    props: ['product_item', 'cart_list', 'api_url'],
    methods: {
        delete_to_cart(product_item) { // удаление товара из корзины
            const inCartListIndex = this.cart_list.findIndex(item => item.article == product_item.article)
            fetch(this.api_url + '/cart/' + product_item.id, {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(deletedItem => {
                    this.cart_list.splice(inCartListIndex, 1)
                    alert(deletedItem.name + ' удален из корзины')
                })
        },
        count_input(event) { // изменение количества через поле ввода
            const idProduct = event.target.parentElement.parentElement
            const inCartList = this.cart_list.find(item => item.article == idProduct.id)
            fetch(this.api_url + '/cart/' + inCartList.id, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        count: +event.target.value
                    }),
                    headers: {
                        'Content-type': 'application/json'
                    }
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


Vue.component('login-component', {
    props: ['api_url'],
    data() {
        return {
            loginEmail: '',
            loginPassword: '',
            logincache: '',
            errorsLogin: ''
        }
    },
    methods: {
        checkLogin() {
            this.errors = ''
            fetch(this.api_url + '/accounts/', {
                    method: 'GET',
                    body: JSON.stringify({
                        email: this.loginPassword,
                        password: this.loginPassword
                    }),
                    headers: {
                        'Content-type': 'application/json'
                    }
                }).then(res => {
                    if (res.status == 403) {
                        this.errorsLogin += `Неверно указан логин или пароль`
                        document.loginForm.email.className = "invalidForm";
                        document.loginForm.password.className = "invalidForm";
                    } else {
                        return res
                    }
                })
                .then(res => res.json())
                .then(identity => {
                    localStorage.setItem('email', identity.email)
                    localStorage.setItem('cipher', identity.cipher)
                })
        }
    },
    template: `
                <form id="login" @submit="checkLogin" class="data-2" name="loginForm">
                    <h5>sign in</h5>
                    <p class="point">Already registed?</p>
                    <p class="about">Please log in below</p>
                    <p class="point inp">
                        EMAIL ADDRESS
                        <span class="red">*</span>
                    </p>
                    <input v-model="loginEmail" type="email" name="email" required>
                    <p class="point inp">
                        PASSWORD
                        <span class="red">*</span>
                    </p>
                    <input v-model="loginPassword" type="password" name="password" required>
                    <p v-if="errorsLogin" id="errors">{{errorsLogin}}</p>
                    <p>
                        <span class="red">* Required Fileds</span>
                    </p>
                    <input type="submit" value="LOG IN">
                </form>
                `
})

Vue.component('registr-component', {
    props: ['api_url'],
    data() {
        return {
            name: null,
            email: null,
            password: null,
            phone: null,
            gender: null,
            errors: ''
        }
    },
    methods: {
        checkRegisrt(e) {
            e.preventDefault()
            const $registrForms = document.registr
            this.errors = ''
            if (!/[a-zA-Z]/.test(this.name) || !this.name) {
                this.errors += 'Имя должно состоять только из букв. '
                $registrForms.name.className = "invalidForm";
            } else $registrForms.name.className = "validForm";

            if (!/^[a-zA-Z0-9.-_]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(this.email)) {
                this.errors += 'E-mail должен быть в формате mymail@mail.ru . '
                $registrForms.email.className = "invalidForm";
            } else $registrForms.email.className = "validForm";

            if (!/.{4,}/.test(this.password) || !this.password) {
                this.errors += 'Пароль не может быть короче 4 символов.'
                $registrForms.password.className = "invalidForm";
            } else $registrForms.password.className = "validForm";

            if (!this.errors) {
                fetch(this.api_url + '/accounts/', {
                        method: 'POST',
                        body: JSON.stringify({
                            name: this.name,
                            email: this.email,
                            password: this.password,
                            phone: this.phone,
                            gender: this.gender
                        }),
                        headers: {
                            'Content-type': 'application/json'
                        }
                    })
                    .then(res => {
                        if (res.status == 200) {
                            alert('Регистрация прошла успешно')
                            $registrForms.email.className = "validForm";
                            //$registrForms.submit() /////////////////////////////////////////test
                        } else {
                            this.errors += `Пользователь с e-mail ${this.email} уже существует`
                            $registrForms.email.className = "invalidForm";
                        }
                    })
            }
        }
    },
    template: `
    <form @submit="checkRegisrt" name="registr" id="registr" class="data-1">
        <h5>register</h5>
        <p class="point">register and save time!</p>
        <p class="about">Register with us for future convenience</p>
        <p class="about"> >> Fast and easy checkout</p>
        <p class="about aboutLast"> >> Easy access to your order history and status</p>
        <p class="point inp">
            NAME
            <span class="red">*</span>
        </p>
        <input v-model="name" type="text" name="name">
        <p class="point inp">
            EMAIL ADDRESS
            <span class="red">*</span>
        </p>
        <input v-model="email" type="email" name="email">
        <p class="point inp">
            PASSWORD
            <span class="red">*</span>
        </p>
        <input v-model="password" type="password" name="password">
        <p class="point inp">
            PHONE
        </p>
        <input v-model="phone" type="text" name="phone">

        <div class="point">
            <p class="point inp">
                GENDER
            </p>
            <input v-model="gender" type="radio" name='choice' id="ch-1" value="m" checked><label
                for="ch-1">
                M</label>
            <br>
            <input v-model="gender" type="radio" name='choice' id="ch-2" value="w" checked><label
                for="ch-2">
                W</label>
        </div>
        <p>
            <span class="red">* Required Fileds</span>
        </p>
        <p v-if="errors" id="errors">{{errors}}</p>

        <input type="submit" value="register">
    </form>
    `
})




const login_cache = new Vue({
    el: '#login_cache',
    data: {
        API_URL: 'http://localhost:3001',
        cartList: []
    },
    mounted() {
        fetch(this.API_URL + '/cart')
            .then(response => response.json())
            .then(cart => this.cartList = cart)
    }
})