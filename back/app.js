var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mysql = require('mysql');
var cors = require('cors');

var db = mysql.createConnection({
  host:'localhost', 
  port:'3306', 
  user:'debian-sys-maint', 
  password:'hfqxMcHwng5k3STz', 
  database:'goods'
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.post('/new', (req, res) => {
      db.query(`INSERT INTO goods (name, price, quantity, total) VALUES (?,?,?,?)`, [req.body.name, req.body.price, req.body.quantity, req.body.total], (err, data) => {
        if(err){
          res.status(400);
          console.log('Failed', err)
          res.end();
        }else{
          res.status(200);
          res.end();
        }
      })
})

app.post('/list', (req, res) => {
  db.query('SELECT * FROM goods', (err, data) => {
    if(err){
      res.status(400);
      console.log('Failed', err)
      res.end();
    }else{
      res.status(200);
      res.send(data);
    }
  })
})

app.post('/get', (req, res) => {
  db.query('SELECT * FROM goods WHERE id=' + req.body.id, (err, data) => {
    if(err){
      res.status(400);
      console.log('Failed', err)
      res.end();
    }else{
      res.status(200);
      res.send(data[0]);
    }
  })
})

app.post('/update', (req, res) => {
  db.query(`UPDATE goods SET name=?, price=?, quantity=?, total=? WHERE id=?`, [req.body.name, req.body.price, req.body.quantity, req.body.total, req.body.id], (err, data) => {
    if(err){
      res.status(400);
      console.log('Failed', err)
      res.end();
    }else{
      res.status(200);
      res.end();
    }
  })
})

app.post('/delete', (req, res) => {
  db.query('DELETE FROM goods WHERE id=' + req.body.id, (err, data) => {
    if(err){
      res.status(400);
      console.log('Failed', err)
      res.end();
    }else{
      res.status(200);
      res.send(data);
    }
  })
})

app.post('/count', (req, res) => {
  db.query('SELECT count(total) FROM goods WHERE total <= 50', (err, c1) => {
    if(err){
      res.status(400);
      console.log('Failed', err)
      res.end();
    }else{
      db.query('SELECT count(total) FROM goods WHERE total > 50 AND total <= 100', (err, c2) => {
        if(err){
          res.status(400);
          console.log('Failed', err)
          res.end();
        }else{
          db.query('SELECT count(total) FROM goods WHERE total > 100 AND total <= 150', (err, c3) => {
            if(err){
              res.status(400);
              console.log('Failed', err)
              res.end();
            }else{
              db.query('SELECT count(total) FROM goods WHERE total > 150 AND total <= 200', (err, c4) => {
                if(err){
                  res.status(400);
                  console.log('Failed', err)
                  res.end();
                }else{
                  db.query('SELECT count(total) FROM goods WHERE total > 200 AND total <= 250', (err, c5) => {
                    if(err){
                      res.status(400);
                      console.log('Failed', err)
                      res.end();
                    }else{
                      db.query('SELECT count(total) FROM goods WHERE total > 50 AND total <= 100', (err, c6) => {
                        if(err){
                          res.status(400);
                          console.log('Failed', err)
                          res.end();
                        }else{
                          db.query('SELECT count(total) FROM goods WHERE total > 300', (err, c7) => {
                            if(err){
                              res.status(400);
                              console.log('Failed', err)
                              res.end();
                            }else{
                              res.status(200);
                              res.send([c1[0]['count(total)'], c2[0]['count(total)'], c3[0]['count(total)'], c4[0]['count(total)'], c5[0]['count(total)'], c6[0]['count(total)'], c7[0]['count(total)']]);
                            }
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  })
})
module.exports = app;
