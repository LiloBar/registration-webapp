"use strict";
let express = require('express');
let expressHandlebars = require('express-handlebars');
let bodyParser = require('body-parser');
let flash = require('express-flash');
let session = require('express-session');
const pg = require("pg");
const Pool = pg.Pool;

let RegNumber = require('./registration');


let app = express();


app.use(session({
  secret: 'This line is to display an error message',
  resave: false,
  saveUninitialized: true
}));

app.use(flash());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use(express.static('public'));

app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
let useSSL = false;
if (process.env.DATABASE_URL) {
  useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:coder123@localhost:5432/registrations';

const pool = new Pool({
  connectionString,
  ssl: useSSL
});

const registrations = RegNumber(pool)

app.post("/reg_numbers", async function(req ,res){

let text = req.body.text;
let message = await registrations.inputReg(text);
let display = await registrations.allCars();

  res.render("index" , {display, message})
  
})


app.get('/', async function (req, res) {


  res.render('index');

});



app.get('/filter/:town', async function (req, res) {

        let town = req.params.town;

        res.render('index', {
          display: await registrations.regFilter(town)
        });

      });

      app.get('/reset', async function (req, res, next) {
        try {
          await registrations.resetDataBase()
      
      
          res.render('index')
        } catch (err) {
          return next(err)
        }
      
      });

let PORT = process.env.PORT || 3008;
app.listen(PORT, function() {
  console.log('App starting on port', PORT);
});
  




