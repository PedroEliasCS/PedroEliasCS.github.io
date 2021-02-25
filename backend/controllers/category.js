const slugify = require('slugify')
const { findByIdAndUpdate } = require("../models/Category")
const Category = require("../models/Category")

const controller = {}

controller.new = async (req, res) => {
    try {
        let category = req.body
        category.slug = slugify(category.title)
        await Category.create(category)
        res.status(201).end()
    }
    catch (err) {
        console.error(err)
        res.status(500).end()
    }
}

controller.list = async (req, res) => {
    try {
        res.status(404).send('invalido')
        //let data = await Category.find()
        //res.send(data)
    }
    catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
}

controller.getOne = async (req, res) => {
    const id = req.params.id
    let obj = await Category.findById(id).populate('category', "title")

    if (obj) res.send(obj)
    else res.status(404).end()
}

controller.update = async (req, res) => {
    try {
        const id = req.body._id
        let obj = await Category.findByIdAndUpdate(id, req.body)

        if (obj) res.status(204).end()
        else res.status(404).end()
    }
    catch (err) {
        console.error(err)
        res.status(500).end()
    }
}

/*

controller.delete = async (req, res) => {
    try {
        const id = req.body._id
        let obj = await Category.findByIdAndDelete(id)

        if (obj) res.status(204).end()
        else res.status(404).end()
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
}

*/

module.exports = controller