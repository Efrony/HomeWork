const fs = require('fs')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(express.static('./public'))
app.use(bodyParser.json())

/*----------------------------------------------------ЛОГ--------------------------------------------------------*/ 
function stats(object, event, info) {
    const dT = new Date();
    const dT_time = `${dT.getHours()}:${dT.getMinutes()}:${dT.getSeconds()}` // moment модуль
    const dT_Date = `${dT.getDate()}.${dT.getMonth()+1}.${dT.getFullYear()}`
    fs.readFile('./db/stats.json', 'utf-8', (err, data) => {
        const stats = JSON.parse(data)
        const string = {
            time: dT_time,
            date: dT_Date,
            object: object,
            event: event,
            info: info
        }
        stats.push(string)
        console.log(string)
        fs.writeFile('./db/stats.json', JSON.stringify(stats), () => {})
    })
}
/*----------------------------------------------------КАТАЛОГ--------------------------------------------------------*/ 
app.get('/product/', (req, res) => fs.readFile('./db/product.json', 'utf-8', (err, data) => {
    if (err) res.send('Произошла ошибка' + err)
    res.send(data)
}))

/*----------------------------------------------------КОРЗИНА--------------------------------------------------------*/ 
app.get('/cart/:cart_id/', (req, res) => fs.readFile(`./db/cart/${req.params.cart_id}.json`, 'utf-8', (err, data) => {  // получение списка корзины
    if (err) {
        fs.writeFile(`./db/cart/${req.params.cart_id}.json`, JSON.stringify([]), () => res.send([]))
    } else res.send(data)
}))

app.post('/cart/:cart_id/', (req, res) => fs.readFile(`./db/cart/${req.params.cart_id}.json`, 'utf-8', (err, data) => { // добавление нового товара в корзину
    if (err) res.send('Произошла ошибка' + err)
    const cart = JSON.parse(data)
    cart.push(req.body)
    stats(req.params.cart_id, 'добавлен', req.body.article)
    fs.writeFile(`./db/cart/${req.params.cart_id}.json`, JSON.stringify(cart), () => res.send(req.body))
}))

app.patch('/cart/:cart_id/:id', (req, res) => fs.readFile(`./db/cart/${req.params.cart_id}.json`, 'utf-8', (err, data) => { // изменение количества товара в корзине
    if (err) res.send('Произошла ошибка' + err)
    const cart = JSON.parse(data)
    const inCartListItem = cart.find(item => item.id == req.params.id)
    inCartListItem.count = req.body.count
    stats(req.params.cart_id, 'изменён', inCartListItem.article)
    fs.writeFile(`./db/cart/${req.params.cart_id}.json`, JSON.stringify(cart), () => res.send(inCartListItem))
}))

app.delete('/cart/:cart_id/:id', (req, res) => fs.readFile(`./db/cart/${req.params.cart_id}.json`, 'utf-8', (err, data) => { // удаление товара из корзины
    if (err) res.send('Произошла ошибка' + err)
    const cart = JSON.parse(data)
    const inCartListIndex = cart.findIndex(item => item.id == req.params.id)
    const deletedItem = cart.splice(inCartListIndex, 1)
    stats(req.params.cart_id, 'удалён', deletedItem[0].article)
    fs.writeFile(`./db/cart/${req.params.cart_id}.json`, JSON.stringify(cart), () => res.send(deletedItem[0]))
}))

app.put('/cart/:cart_id/', (req, res) => fs.writeFile(`./db/cart/${req.params.cart_id}.json`, JSON.stringify([]), () => { // полная очистка корзины
    stats(req.params.cart_id, 'Корзина пользователя очищена', '')
    res.send([])
}))

/*----------------------------------------------------РЕГИСТРАЦИЯ--------------------------------------------------------*/ 

app.post('/accounts/', (req, res) => fs.readFile('./db/accounts.json', 'utf-8', (err, data) => { //регистрация
    if (err) res.send('Произошла ошибка' + err)
    const accBody = req.body
    const accounts = JSON.parse(data)
    if (inAccounts = accounts.find((account) => accBody.email == account.email)) {
        res.status(403).send(accBody.email)
    } else {
        accBody.id = accounts.length + 1
        accounts.push(accBody)
        stats(accBody.email,'регистрация нового пользователя')
        fs.writeFile('./db/accounts.json', JSON.stringify(accounts), () => res.status(200).send(accBody))
    }
}))

/*----------------------------------------------------АВТОРИЗАЦИЯ--------------------------------------------------------*/ 
app.patch('/login/:email', (req, res) => fs.readFile('./db/accounts.json', 'utf-8', (err, data) => {  
    if (err) res.send('Произошла ошибка' + err)
    const accounts = JSON.parse(data)
    const inAccountList = accounts.find(account => account.email == req.body.email)
    if (!inAccountList) res.status(403).send(req.body.email) // пользователь с такие e-mail не зарегистрирован
    else {
        if (inAccountList.password != req.body.password) res.status(403).send(req.body.email) // неверный пароль
        else {
            if (!inAccountList.cookie.pass) { // если пользователь нигде не авторизован генерируем ключ вместо пароля
                const d_t = new Date()
                var cookie = 'pass_'+ d_t.getTime()
                inAccountList.cookie.pass = cookie
            }
            if (!inAccountList.cookie.cart_id) {// если у пользователя нет номера корзины, закрепляется номер из localSrorage
                inAccountList.cookie.cart_id = req.body.cookie.cart_id 
            } 
            stats(req.body.email,'авторизация пользователя')
            fs.writeFile('./db/accounts.json', JSON.stringify(accounts), () => {
                res.status(200).send({
                    email: inAccountList.email, 
                    cookie: {
                        pass: inAccountList.cookie.pass,
                        cart_id: inAccountList.cookie.cart_id
                    }
                })
            })
        }
    }
}))

app.patch('/logout/:email', (req, res) => fs.readFile('./db/accounts.json', 'utf-8', (err, data) => {  // выход из аккаунта
    if (err) res.send('Произошла ошибка' + err)
    const accounts = JSON.parse(data)
    const inAccountList = accounts.find((account) => account.email == req.body.email) 
    inAccountList.cookie.pass = null
    stats(req.body.email,'выход пользователя' )
    fs.writeFile('./db/accounts.json', JSON.stringify(accounts), () => res.status(200).send())
}))

/*----------------------------------------------------КОММЕНТАРИИ--------------------------------------------------------*/ 
app.get('/comments/', (req, res) => fs.readFile('./db/comments.json', 'utf-8', (err, data) => { // получение списка комментариев
    if (err) res.send('Произошла ошибка' + err)
    res.send(data)
}))

app.post('/comments/', (req, res) => fs.readFile('./db/comments.json', 'utf-8', (err, data) => { // добавление нового комментария
    if (err) res.send('Произошла ошибка' + err)
    const comment = req.body
    const comments = JSON.parse(data)
    comment.id = comments.length + 1
    comments.push(comment)
    stats(comment.email,'добавлен комментарий', comment.message)
    fs.writeFile('./db/comments.json', JSON.stringify(comments), () => res.status(200).send(comment))
}))

app.delete('/comments/:id', (req, res) => fs.readFile('./db/comments.json', 'utf-8', (err, data) => { // удаление комментария
    if (err) res.send('Произошла ошибка' + err)
    const comments = JSON.parse(data)
    const inCommentListIndex = comments.findIndex(item => item.id == req.params.id)
    const deletedItem = comments.splice(inCommentListIndex, 1)
    stats(req.params.id,'удалён комментарий', deletedItem[0].message)
    fs.writeFile('./db/comments.json', JSON.stringify(comments), () => res.send(deletedItem[0]))
}))


app.patch('/comments/:id', (req, res) => fs.readFile('./db/comments.json', 'utf-8', (err, data) => {  // одобрение комментария 
    if (err) res.send('Произошла ошибка' + err)
    const comments = JSON.parse(data)
    const inCommentList = comments.find(item => item.id == req.params.id) 
    inCommentList.approved = true
    stats(req.params.id,'одобрен комментарий', inCommentList.message)
    fs.writeFile('./db/comments.json', JSON.stringify(comments), () => res.send(inCommentList))
}))

app.listen(3001, () => console.log('СЕРВЕР ЗАПУЩЕН. Порт: 3001. ПЕРЕЙТИ http://localhost:3001/'))