function temperature() {
    var temperatureF
    var temperatureC
    while (true) {
        temperatureC = +prompt('Введите температуру в градусах по Цельсию. Не забывайте, что минимальная температура по Цельсию составляет -273,15 °С ')
        if (!isNaN(temperatureC) && temperatureC >= -273.15 && temperatureC) {
            break
        } else {
            alert('Температуру по Цельсию необходимо ввести в виде числа, которое больше или равно -273,15 °С')
        }
    }
    temperatureF = (9 / 5) * temperatureC + 32
    alert(temperatureC + ' °С = ' + temperatureF + '°F')
}

function nameAdmin() {
    var name = 'Василий'
    var admin = name
    alert(admin)
}

function js1000() {
    var numberData = 1000
    var stringData = '108'
    alert('Итак, чему же будет равно JS-выражение 1000 + "108"?')
    alert('А вот чему! ' + numberData + stringData + ' Старанно, я думал, будет NaN!')
}