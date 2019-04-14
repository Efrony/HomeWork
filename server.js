const fs = require('fs')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(express.static('./public'))
app.use(bodyParser.json())


function stats(event, article) {
    const dT = new Date();
    const dT_time = `${dT.getHours()}:${dT.getMinutes()}:${dT.getSeconds()}` // moment модуль
    const dT_Date = `${dT.getDate()}.${dT.getMonth()+1}.${dT.getFullYear()}`
    fs.readFile('./db/stats.json', 'utf-8', (err, data) => {
        const stats = JSON.parse(data)
        const string = {
            time: dT_time,
            date: dT_Date,
            event: event,
            article: article
        }
        stats.push(string)
        console.log(string)
        fs.writeFile('./db/stats.json', JSON.stringify(stats), () => {})
    })
}

app.get('/product', (req, res) => fs.readFile('./db/product.json', 'utf-8', (err, data) => {
    if (err) res.send('Произошла ошибка' + err)
    res.send(data)
}))

app.get('/cart', (req, res) => fs.readFile('./db/cart.json', 'utf-8', (err, data) => {
    if (err) res.send('Произошла ошибка' + err)
    res.send(data)
}))

app.post('/cart', (req, res) => fs.readFile('./db/cart.json', 'utf-8', (err, data) => {
    if (err) res.send('Произошла ошибка' + err)
    const cart = JSON.parse(data)
    cart.push(req.body)
    stats('добавлен', req.body.article)
    fs.writeFile('./db/cart.json', JSON.stringify(cart), () => res.send(req.body))
}))

app.patch('/cart/:id', (req, res) => fs.readFile('./db/cart.json', 'utf-8', (err, data) => {
    if (err) res.send('Произошла ошибка' + err)

    let cart = JSON.parse(data)
    const inCartListItem = cart.find(item => item.id == req.params.id)
    inCartListItem.count = req.body.count
    stats('изменён', inCartListItem.article)
    fs.writeFile('./db/cart.json', JSON.stringify(cart), () => res.send(inCartListItem))
}))


app.delete('/cart/:id', (req, res) => fs.readFile('./db/cart.json', 'utf-8', (err, data) => {
    if (err) res.send('Произошла ошибка' + err)
    const cart = JSON.parse(data)
    const inCartListIndex = cart.findIndex(item => item.id == req.params.id)
    const deletedItem = cart.splice(inCartListIndex, 1)
    stats('удалён', deletedItem[0].article)
    fs.writeFile('./db/cart.json', JSON.stringify(cart), () => res.send(deletedItem[0]))
}))

app.put('/cart/', (req, res) => fs.writeFile('./db/cart.json', JSON.stringify([]), () => {
    stats('Корзина очищена', '')
    res.send([])
}))

app.post('/accounts/', (req, res) => fs.readFile('./db/accounts.json', 'utf-8', (err, data) => { //регистрация
    if (err) res.send('Произошла ошибка' + err)
    const accBody = req.body
    const accounts = JSON.parse(data)
    if (inAccounts = accounts.find((account) => accBody.email == account.email)) {
        res.status(403).send(accBody.email)
    } else {
        accBody.id = accounts.length + 1
        accounts.push(accBody)
        stats('новый пользователь', accBody.email)
        fs.writeFile('./db/accounts.json', JSON.stringify(accounts), () => res.status(200).send(accBody))
    }
}))

app.patch('/login/:email', (req, res) => fs.readFile('./db/accounts.json', 'utf-8', (err, data) => {  // авторизация 
    if (err) res.send('Произошла ошибка' + err)
    const accounts = JSON.parse(data)
    const inAccountList = accounts.find(account => account.email == req.body.email)
    if (!inAccountList) res.status(403).send(req.body.email) // пользователь с такие e-mail не зарегистрирован
    else {
        if (inAccountList.password != req.body.password) res.status(403).send(req.body.email) // неверный пароль
        else {
            if (!inAccountList.cipher) { // если пользователь нигде не авторизован генерируем ключ
                var cipher = ''
                for(var i = 0; i < 20; i++) cipher += Math.round(Math.random()*10)
                inAccountList.cipher = cipher
            }
            fs.writeFile('./db/accounts.json', JSON.stringify(accounts), () => res.status(200).send({email: inAccountList.email, cipher: inAccountList.cipher}))
        }
    }
}))

app.patch('/logout/:email', (req, res) => fs.readFile('./db/accounts.json', 'utf-8', (err, data) => {  // выход 
    if (err) res.send('Произошла ошибка' + err)
    const accounts = JSON.parse(data)
    const inAccountList = accounts.find((account) => account.email == req.body.email) 
    inAccountList.cipher = null
    fs.writeFile('./db/accounts.json', JSON.stringify(accounts), () => res.status(200).send())
}))


app.listen(3001, () => console.log('СЕРВЕР ЗАПУЩЕН. Порт: 3001. ПЕРЕЙТИ http://localhost:3001/'))