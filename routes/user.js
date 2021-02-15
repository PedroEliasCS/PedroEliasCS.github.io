
const controller = require("../controllers/user")
const express = require("express")


const router = express.Router()

router.post("/", controller.new)
router.get("/:id", controller.getOne)
router.put("/", controller.update)
router.get("/", controller.list)

module.exports = router
