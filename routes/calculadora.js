var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/calculadora', function(req, res, next) {
  res.render('./calculadora/calculadora');
});

module.exports = router;
