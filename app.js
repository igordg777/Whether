const express = require("express");
const app = express();

const path = require('path');
// urlencoded.
app.use(express.urlencoded({ extended: true }));
// json.
app.use(express.json());

// Подключаем статику
app.use(express.static(path.join(__dirname, 'public')));

// Подключаем views(hbs)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Отображаем главную страницу с использованием шаблона "index.hbs"
app.get('/', function (req, res) {
    res.render('index', req.query);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on " + port));