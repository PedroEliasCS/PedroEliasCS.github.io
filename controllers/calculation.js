const slugify = require('slugify')//
//const { findByIdAndUpdate } = require("../models/Calculation")
const Calculation = require("../models/Calculation")
//const Category = require('../models/Category')

const controller = {}

controller.new = async (req, res) => {
    try {
        let calculation = req.body
        calculation.slug = slugify(calculation.title)
        await Calculation.create(calculation)
        res.status(201).end()
    }
    catch (err) {
        console.error(err)
        res.status(500).end()
    }
}

controller.list = async (req, res) => {
    try {
     res.send('invalido')
    }
    catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
}

controller.getPage = async (req, res) => {
    try {
        const page = req.params.page
        const options = {
            page: page,
            limit: 3,
            collation: {
                locale: 'en',
            },
            populate: 'author category'

        }
        let data = await Calculation.paginate({}, options)
        res.send(data)
    } catch (err) {
        console.error(err)
        res.status(404).end()
    }
}

controller.getOne = async (req, res) => {
    const id = req.params.id
    let obj = await Calculation.findById(id)

    if (obj) res.send(obj)
    else res.status(404).end()
}

controller.update = async (req, res) => {
    try {
        const id = req.body._id
        let obj = await Calculation.findByIdAndUpdate(id, req.body)

        if (obj) res.status(204).end()
        else res.status(404).end()
    }
    catch (err) {
        console.error(err)
        res.status(500).end()
    }
}

controller.delete = async (req, res) => {
    try {
        const id = req.body._id
        let obj = await Calculation.findByIdAndDelete(id)

        if (obj) res.status(204).end()
        else res.status(404).end()
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
}

module.exports = controller