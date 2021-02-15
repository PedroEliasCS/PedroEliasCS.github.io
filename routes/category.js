const controller = require("../controllers/category")
const express = require("express")
const { Router } = require("express")

const   router = express.Router()

//rotas de administrador
router.post("/admin", controller.new)
router.get("/admin", controller.list)
// não funciona

router.get("/admin/:id", controller.getOne)
router.put("/admin", controller.update)
//router.delete("/admin", controller.delete)

//rotas de usuários
router.get("/", controller.list)
// não funciona

router.get("/:id", controller.getOne)
//rota para retornar os artigos pertencentes á uma categoria
//router.get("/:slug", controller.getSlug)

module.exports = router