//------------------ ЗАДАНИЕ 1 -------------------------
const str = "aren't fdsfdffdf 'fdfdfdfd!' ffdfsf 'hjghjghjhj.' dfsfdsfds5 '5fdsfdsfds5' dfdfsf 'fdsfdsfd8?' dfsfdf."
const changeCommas = /(\B')|('\B)/g
console.log(str.replace(changeCommas, '"'))

//------------------ ЗАДАНИЕ 2 -------------------------

var $formy = document.formy

function check() {
    var errorForm = ''
    if (!/[a-zA-Z]/.test($formy.name.value)) {
        errorForm += 'Имя должно состоять только из букв. <br>'
        $formy.name.style.outline = "1px solid red"; 
    } else $formy.name.style.outline = "1px solid green";

    if (!/^\+7\(\d{3}\)\d{3}-\d{4}$/.test($formy.phone.value)) {
        errorForm += 'Телефон должен быть в формате +7(000)000-0000 <br>'
        $formy.phone.style.outline = "1px solid red"; 
    } else $formy.phone.style.outline = "1px solid green";

    if (!/^[a-zA-Z0-9.-]+@[a-zA-Z0-9]+\.[a-zA-Z]{0,3}$/.test($formy.email.value)) {
        errorForm += 'E-mail должен быть в формате mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru. <br>'
        $formy.email.style.outline = "1px solid red"; 
    } else $formy.email.style.outline = "1px solid green";

    if (!/.+/.test($formy.message.value)) {
        errorForm += 'Поле сообщения не может быть пустым <br>'
        $formy.message.style.outline = "1px solid red"; 
    } else $formy.message.style.outline = "1px solid green";

    if (errorForm != '') {
        errorForm += 'Заполните все формы корректно.'
        document.getElementById('errorMessage').innerHTML = errorForm
        return false
    }

    alert('Сообщение отправлено!')
    return true


}


/*         Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить. При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
        a.  Имя содержит только буквы.
        b.  Телефон имеет вид +7(000)000-0000.
        c.  E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
        d.  Текст произвольный.
        e.  Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой и сообщить пользователю об ошибке.
        */