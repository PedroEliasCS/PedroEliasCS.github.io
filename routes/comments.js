
const controller = require("../controllers/comment")
const express = require("express")
const Calculation = require('../models/Calculation')
const Comment = require('../models/Comment')

const router = express.Router()

router.post("/", controller.new)
router.get("/:id", controller.getOne)
router.put("/", controller.update)
router.get("/", controller.list)


router.get("/:slug/:page", async (req, res) => {
    try {
        console.log('dentro')
        let vet = []
        let page = req.params.page
        //skip define o numero de elementos a serem exibidos
        let offset = 0
        let skip = 5
        let slug = req.params.slug
        let obj = await Calculation.findOne({
            "slug": slug
        })
        
        vet = await Comment.find({
            "calculation": obj._id
        }).populate("user", "name")
        
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


module.exports = router
