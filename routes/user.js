
const controller = require("../controllers/user")
const express = require("express")
const { Router } = require("express")

const router = express.Router()

//rotas de administrador
router.post("/", controller.new)
router.get("/:id", controller.getOne)
router.put("/", controller.update)


module.exports = router
