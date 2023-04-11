const path = require('path')

// встановлюємо express
const express = require('express')
const app = express()

// встановлюємо директорію для віддачі статичного контенту (каталог проекту)
app.use(express.static(__dirname))

// налаштовуємо роботу із шаблонізаотором
app.set('views', path.join(__dirname, '/static/views'))
app.set('view engine', 'pug')

// налаштовуємо маршрутизацію
app.get('/', function (request, response) {
  response.render('pages/index', { title: 'Homee' })
})
app.get('/soldtickets', function (request, response) {
  response.render('pages/soldtickets', { title: 'SoldTickets' })
})
app.get('/ticket', function (_request, response) {
  response.render('pages/ticket', { title: 'Ticket' })
})
app.get('/train', function (_request, response) {
  response.render('pages/train', { title: 'Train' })
})
app.get('/passenger', function (_request, response) {
  response.render('pages/passenger', { title: 'Passenger' })
})

// запускаємо аплікацію
app.listen(process.env.PORT || 8080)