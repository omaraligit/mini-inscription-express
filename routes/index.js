var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'miniinscription'
})

connection.connect()
/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query('SELECT count(*) AS couterAll from member', function (err, rows, fields) {
    if (err) throw err
  
    console.log('The solution is: ', rows[0].couterAll)
  })
  
  res.render('index', { title: 'Express' });
});


/* POST new user. */
router.post('/new/member', function(req, res, next) {
  res.json({ title: 'Express' });
});

module.exports = router;
