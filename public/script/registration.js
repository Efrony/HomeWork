const API_URL1 = 'http://localhost:3001'
const registr = new Vue({
    el: '#registr',
    data: {
        name: null,
        email: null,
        password: null,
        phone: null,
        gender: null,
        errors: '',
    },
    methods: {
        checkRegisrt(e) {
            e.preventDefault()
            const $registrForms = document.registr
            this.errors = ''
            if (!/[a-zA-Z]/.test(this.name) || !this.name) {
                this.errors += 'Имя должно состоять только из букв. '
                $registrForms.name.className = "invalidForm";
            } else $registrForms.name.className  = "validForm";

            if (!/^[a-zA-Z0-9.-_]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(this.email)) {
                this.errors += 'E-mail должен быть в формате mymail@mail.ru . '
                $registrForms.email.className = "invalidForm";
            } else $registrForms.email.className  = "validForm";

            if (!/.{4,}/.test(this.password) || !this.password) {
                this.errors += 'Пароль не может быть короче 4 символов.'
                $registrForms.password.className = "invalidForm";
            } else $registrForms.password.className  = "validForm";

            if (!this.errors){
                fetch(API_URL1 + '/accounts/', {
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
                        $registrForms.email.className  = "validForm";
                    }
                    else {
                        this.errors+= `Пользователь с e-mail ${this.email} уже существует`
                        $registrForms.email.className = "invalidForm";

                       
                    } 
                })
            }
        }
    }
})
