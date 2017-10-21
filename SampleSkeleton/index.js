const express = require('express');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');
mongoose.Promise = global.Promise;

const env = process.env.NODE_ENV || 'development';
const port = process.env.NODE_ENV || 3000;
const app = express();

app.engine('.hbs', handlebars({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.set('view engine', '.hbs');
app.use(express.static('./static'));

app.get('/', (req, res) => {
    res.render('home/index');
});

mongoose.connect('mongodb://localhost:27017')
    .then(() => {
        console.log('Database ready');
        app.listen(3000);
        console.log('Listening on port ' + port);
    });