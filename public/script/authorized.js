const auth = new Vue({
    el: '#auth',
    data: {
        API_URL: 'http://localhost:3001',
    },
    computed: {
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
    }
})

