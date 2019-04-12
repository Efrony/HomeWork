const login = new Vue({
    el: '#login',
    data: {
        API_URL: 'http://localhost:3001',
        loginEmail: '',
        loginPassword: '',
        logincache: ''
    },
    methods: {
        checkLogin() {
            fetch(this.API_URL + '/accounts/', {
                method: 'GET',
                body: JSON.stringify({
                    email: this.loginPassword,
                    password: this.loginPassword
                }),
                headers: {'Content-type': 'application/json'}
            }).then(res => res.json())
            .then(identity => {
                localStorage.setItem('email', identity.email)
                localStorage.setItem('cipher', identity.cipher)
            })
        }
    }
})