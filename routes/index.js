var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* POST new user. */
router.post('/new/member', function(req, res, next) {
  res.json({ title: 'Express' });
});

module.exports = router;
