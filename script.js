//------------------ ЗАДАНИЕ 1 -------------------------
const str = "aren't fdsfdffdf 'fdfdfdfd!' ffdfsf 'hjghjghjhj.' dfsfdsfds5 '5fdsfdsfds5' dfdfsf 'fdsfdsfd8?' dfsfdf."
const changeCommas = /(\B')|('\B)/g
console.log(str.replace(changeCommas, '"'))

//------------------ ЗАДАНИЕ 2 -------------------------

var validation = {
    regexp: {
        name: /[a-zA-Z]/,
        phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
        email: /^[a-zA-Z0-9.-]+@[a-zA-Z0-9]+\.[a-zA-Z]{0,3}$/,
        message: /.+/
    },
    error: {
        name: 'Имя должно состоять только из букв. <br>',
        phone: 'Телефон должен быть в формате +7(000)000-0000 <br>',
        email: 'E-mail должен быть в формате mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru. <br>',
        message: 'Поле сообщения не может быть пустым <br>'
    },
    on: field => field.style.outline = "1px solid green",
    off: field => field.style.outline = "1px solid red",

    check: () => {
        var errorForm = ''
        document.formy.querySelectorAll('input, textarea').forEach(field => {
            if (!validation.regexp[field.id].test(field.value)) {
                errorForm += validation.error[field.id]
                validation.off(field)
            } else validation.on(field)
        })
        if (errorForm != '') {
            errorForm += 'Заполните все формы корректно.'
            document.getElementById('errorMessage').innerHTML = errorForm
            return false
        }
        alert('Сообщение отправлено!')
        return true
    }
}