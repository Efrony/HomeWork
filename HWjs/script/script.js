function case1() {
    var temperatureF
    var temperatureC
    while (true) {
        temperatureC = +prompt('Введите температуру в градусах по Цельсию. Не забывайте, что минимальная температура по Цельсию составляет -273,15 °С ')
        if ((temperatureC.isNaN() == false) && (temperatureC > -273.15)) {
            break
        }
    }
    temperatureF = (9 / 5) * temperatureC + 32
    alert(temperatureC + ' °С = ' + temperatureF + '°F')
}