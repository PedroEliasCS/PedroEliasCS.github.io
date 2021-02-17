const controller = require("../controllers/calculation")
const express = require("express")


const router = express.Router()

//rotas de administrador
router.post("/admin", controller.new)
router.get("/admin/", controller.list)
router.get("/admin/:id", controller.getOne)
router.put("/admin", controller.update)
router.delete("/admin", controller.delete)

//rotas de usuários
router.get("/", controller.list)
router.get("/:page", controller.getPage)

module.exports = router
