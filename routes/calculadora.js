var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./calculadora/calculadora');
});
/*
router.get("/:categoria/:page", async (req, res) => {
  try {
      let vet = []
      let page = req.params.page
      //skip define o numero de elementos a serem exibidos
      let offset = 0
      let skip = 3
      let categoria = req.params.categoria
      res.send(categoria + '/' + page)
      return
      let obj = await Category.findOne({
          "slug": slug
      })
      
      vet = await Article.find({
          "category": obj._id
      }).populate('category', "title").populate('author', "name aboutMe")
      if(isNaN(page) || page == 1){
          offset = 0
      } else {
          offset = (parseInt(page) - 1) * skip
      }
      vet = vet.slice(offset, offset + skip)
      res.send(vet)
  } catch (err) {
      console.error(err)
      res.status(500).send(err)
  }
})

*/
module.exports = router;
