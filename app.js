/**
 * Module dependencies.
 */

const express = require('express');

const app = express();
const nunjucks = require('nunjucks'); // templating frame
const dotenv = require('dotenv'); // for config varible


const home = require('./routes/home');
const about = require('./routes/about');

dotenv.config({
  path: './config.env',
});

app.set('view engine', 'html');

nunjucks.configure(['views/'], { // setting a default views folder for templates
  autoescape: false,
  express: app,
});


app.use('/', require('./middleware'));

app.use('/', home);
app.use('/about', about);


// load port on 3000

app.listen(process.env.PORT, () => {
  console.log(`Start your browser on ${process.env.PORT}`);
});
