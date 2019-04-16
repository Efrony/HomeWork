/*----------------------------------------------------СПИСКИ ТОВАРОВ-------------------------------------------------------*/ 
Vue.component('product-item-component', {   // карточка товара 
    props: ['cart_list', 'api_url', 'product_item'],
    methods: {
        add_to_cart(productItem) { 
            const cart_id = localStorage.getItem('cartNumber')
            const inCartList = this.cart_list.find(item => item.article == productItem.article)
            if (inCartList) {
                fetch(`${this.api_url}/cart/${inCartList.id}`, { 
                        method: 'PATCH',
                        body: JSON.stringify({count: inCartList.count + 1}),
                        headers: {'Content-type': 'application/json'}
                    }).then((response) => response.json())
                    .then((response) => inCartList.count = response.count)
            } else {
                fetch(`${this.api_url}/cart/`, { 
                        method: 'POST',
                        body: JSON.stringify({...productItem, count: 1}),
                        headers: {'Content-type': 'application/json'}
                    }).then((response) => response.json())
                    .then((createdItem) => this.cart_list.push(createdItem))
            }
        },
    },
    template: `
    <a  href="#">
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

Vue.component('filter-product-list-component', { // список товара после поиска
    props: ['product_list', 'cart_list', 'api_url', 'сategory'],
    computed: {filter_product() {return this.product_list.filter((item) => item.category.includes(this.сategory))}},
    template: `
    <div class="product">
        <product-item-component :cart_list="cart_list" :api_url="api_url" v-for="product_item in filter_product" :product_item="product_item"></product-item-component>
    </div>`
})

/*----------------------------------------------------ПОИСК--------------------------------------------------------*/ 
Vue.component('search-component', { 
    props: ['product_list'],
    data() {
        return {
            handleSearchInput: '',
            search_input: '',
        }
    },
    methods: {
        button_input(searchInput) { 
            this.handleSearchInput = searchInput
            this.$emit('search', this.searchItems)
        }
    },
    computed: {
        searchItems() {
            const regexp = new RegExp(this.handleSearchInput, 'i')
            return this.product_list.filter((item) => regexp.test(item.name))
        }
    },
    template: `
    <div class="search">
        <button class="browse">Browse <i class="fas fa-caret-down"></i></button>
        <input @keyup.enter="button_input(search_input)" v-model="search_input" type="search" placeholder="Search for Item...">
        <button  @click.prevent="button_input(search_input)" type="button" class="searchButton"><i class="fas fa-search"></i></button>
    </div>`
})


/*----------------------------------------------------КОРЗИНА--------------------------------------------------------*/ 
Vue.component('sum-cart-component', { // подсчёт суммы всех товаров в корзине
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

Vue.component('count-cart-component', { // количество товаров в корзине
    props: ['cart_list', 'api_url'],
    computed: {
        countCart() {
            return this.cart_list.reduce(function (sum, item) {
                return sum + item.count
            }, 0)
        }
    },
    template: `<div class="cartCount" v-if="countCart != 0">{{countCart}}</div>
    `
})

Vue.component('cart-list-component', { // список товаров в корзине
    props: ['cart_list', 'api_url'],
    methods: {
        clear_cart() {
            fetch(this.api_url + '/cart/', {method: 'PUT'})
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
Vue.component('cart-item-component', { // карточка товара в корзине
    props: ['product_item', 'cart_list', 'api_url'],
    methods: {
        delete_to_cart(product_item) { 
            const inCartListIndex = this.cart_list.findIndex(item => item.article == product_item.article)
            fetch(this.api_url + '/cart/' + product_item.id, {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(deletedItem => this.cart_list.splice(inCartListIndex, 1))
        },
        count_input(event) { 
            const idProduct = event.target.parentElement.parentElement
            const inCartList = this.cart_list.find(item => item.article == idProduct.id)
            fetch(this.api_url + '/cart/' + inCartList.id, {
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

/*----------------------------------------------------АВТОРИЗАЦИЯ--------------------------------------------------------*/ 
Vue.component('login-component', { // вход в личный кабинет
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
        checkLogin(event) {
            event.preventDefault()
            this.errorsLogin = ''
            fetch(this.api_url + '/login/' + this.loginEmail, {
                method: 'PATCH',
                body: JSON.stringify({
                    password: this.loginPassword,
                    email: this.loginEmail
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
                    res.json()
                        .then(identity => {
                            document.loginForm.email.className = "validForm";
                            document.loginForm.password.className = "validForm";
                            localStorage.setItem('email', identity.email)
                            localStorage.setItem('cookie', identity.cookie)
                            location.reload() 
                        })
                }
            })
        }
    },
    template: `
                <form id="login" @submit="checkLogin" class="data-2" name="loginForm">
                    <h5>sign in</h5>
                    <p class="point">Already registed?</p>
                    <p class="about">Please log in below</p>
                    <p class="point inp"> EMAIL ADDRESS <span class="red">*</span></p>
                    <input v-model="loginEmail" type="email" name="email" required>
                    <p class="point inp"> PASSWORD <span class="red">*</span></p>
                    <input v-model="loginPassword" type="password" name="password" required>
                    <p v-if="errorsLogin" id="errors">{{errorsLogin}}</p>
                    <p><span class="red">* Required Fileds</span></p>
                    <input type="submit" value="LOG IN">
                </form>
                `
})

Vue.component('authorized-component', {  // проверка авторизации
    props: ['api_url'],
    computed: {is_local_starage() {return localStorage.getItem("email") && localStorage.getItem("cookie")} },
    template: `
    <div>
        <slot name="login_component" v-if="is_local_starage"></slot>
        <slot name="logout_component" v-if="!is_local_starage"></slot>
    </div>`
})


Vue.component('registr-component', { // регистрация
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
                        headers: {'Content-type': 'application/json'}
                    })
                    .then(res => {
                        if (res.status == 200) {
                            alert('Регистрация прошла успешно')
                            $registrForms.email.className = "validForm";
                            location.reload() 
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
        <p class="point inp"> NAME <span class="red">*</span></p>
        <input v-model="name" type="text" name="name">
        <p class="point inp">EMAIL ADDRESS<span class="red">*</span></p>
        <input v-model="email" type="email" name="email">
        <p class="point inp"> PASSWORD <span class="red">*</span></p>
        <input v-model="password" type="password" name="password">
        <p class="point inp">PHONE</p>
        <input v-model="phone" type="text" name="phone">
        <div class="point">
            <p class="point inp">GENDER</p>
            <input v-model="gender" type="radio" name='choice' id="ch-1" value="m" checked>
            <label for="ch-1">M</label><br>
            <input v-model="gender" type="radio" name='choice' id="ch-2" value="w" checked>
            <label for="ch-2">W</label>
        </div>
        <p><span class="red">* Required Fileds</span></p>
        <p v-if="errors" id="errors">{{errors}}</p>
        <input type="submit" value="register">
    </form>`
})

Vue.component('logout-component', { // выход из личного кабинета
    props: ['api_url'],
    methods: {
        logout() {
            fetch(this.api_url + '/logout/' + localStorage.getItem('email'), {
                method: 'PATCH',
                body: JSON.stringify({ email: localStorage.getItem('email')}),
                headers: {'Content-type': 'application/json'}
            }).then( res => {
                localStorage.removeItem("email") 
                localStorage.removeItem("cookie") 
                location.reload()
            })
        }
    },
    template: `<div @click.prevent="logout" class="myAccountMenu">Exit</div>`
})


/*----------------------------------------------------КОММЕНТАРИИ--------------------------------------------------------*/ 
Vue.component('comments-list-render-component', { // список комментариев
    props: ['api_url'], 
    data() { 
        return{ 
            commentsList : [] 
        }
    },
    mounted() {
        fetch(this.api_url + '/comments/')
            .then(response => response.json())
            .then(comments => this.commentsList = comments)
    },
    template: `
    <div> 
        <comment-render-component :api_url="api_url" :comments_list="commentsList" v-for="comment in commentsList" :comment="comment"></comment-render-component>
    </div> 
    `
})

Vue.component('comment-render-component', { // комментарий с кнопками одобрить/удалить
    props: ['comment', 'comments_list', 'api_url'], 
    methods: {
        delete_comment(comment) { 
            const inCommentListIndex = this.comments_list.findIndex(item => item.id == comment.id)
            fetch(this.api_url + '/comments/' + comment.id, {
                method: 'DELETE'
                })
                .then(response => response.json())
                .then(deletedItem => this.comments_list.splice(inCommentListIndex, 1))
        },
        approved_comment(comment) { 
            const inCommentList = this.comments_list.find(item => item.id == comment.id)  ////////////////////////////// test
            fetch(this.api_url + '/comments/' + comment.id, {
                    method: 'PATCH',
                    body: JSON.stringify({approved: true}),
                    headers: {'Content-type': 'application/json'}
                }).then((response) => response.json())
                .then((response) => inCommentList.approved = response.approved)
        },
    },
    computed: {
        is_local_starage() {
            return localStorage.getItem("email") && localStorage.getItem("cookie")
        }
    },
    template: `
    <article class="comment" v-if="comment.approved || is_local_starage"> 
        “{{comment.message}}”
        <br>
        <address>
            {{comment.name}}
            <p>{{comment.date}}</p>
        </address><div class="buttons">
            <button v-if="!comment.approved && is_local_starage" @click.prevent="approved_comment(comment)">Одобрить</button>
            <button v-if="is_local_starage" @click.prevent="delete_comment(comment)">Удалить</button>
        </div>
    </article>`
})

Vue.component('comments-post-component', { // размещение нового комментария
    props: ['api_url'],
    data() {
        return{
            nameComment: null,
            emailComment: null,
            messageComment: null,
        }
    },

    methods: {
        send_comment(e) {
            e.preventDefault()
            var dT = new Date()
            fetch(this.api_url + '/comments/', {
                method: 'POST',
                body: JSON.stringify({
                    name: this.nameComment,
                    email: this.emailComment,
                    message: this.messageComment,
                    date: `${dT.getDate()}.${dT.getMonth()+1}.${dT.getFullYear()}`,
                    approved: false
                }),
                headers: {'Content-type': 'application/json'}
            })
            .then(res => { 
                if (res.status == 200) {
                    alert('Комментарий будет добавлен после одобрения')
                    location.reload()
                }
            })
        }
    },
    template: `
    <form class="data-1" @submit="send_comment">
        <h5>write a comment</h5>
        <p class="point inp">NAME <span class="red">*</span></p>
        <input v-model="nameComment" type="text" required>
        <p class="point inp">EMAIL ADDRESS <span class="red">*</span></p>
        <input v-model="emailComment" type="email" required><p class="point inp">COMMENT<span class="red">*</span></p>
        <textarea v-model="messageComment" class="areaComment" name="" id="" cols="30" rows="10" required></textarea>
        <p><span class="red">* Required Fileds</span></p>
        <input type="submit" value="SEND COMMENT">
    </form>
    `
})

/*----------------------------------------------------APP--------------------------------------------------------*/ 

const login_cache = new Vue({
    el: '#login_cache',
    data: {
        API_URL: 'http://localhost:3001',
        cartList: [],
        productList: [],
        searchedItems: [],
        email: localStorage.getItem('email'),
        cart_id: null,
    },
    methods: {
        getSearchItems(filtred) {
            this.searchItems = filtred
        },
    },
    mounted() {
        fetch(this.API_URL + '/cart')
            .then(response => response.json())
            .then(cart => this.cartList = cart)
        fetch(this.API_URL + '/product')
            .then(response => response.json())
            .then(product => this.productList = product)
            .then(() => {
                this.searchedItems = this.productList
            })
            if (!localStorage.getItem('cartNumber')) {
                var cartNumber = 'cart_'
                for(var i = 0; i < 10; i++) cartNumber += Math.round(Math.random()*10)
                localStorage.setItem('cartNumber', cartNumber)
            } else cartNumber = localStorage.getItem('cartNumber')
    },
})

