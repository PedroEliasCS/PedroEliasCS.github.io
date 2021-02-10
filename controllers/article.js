const slugify = require('slugify')
const { findByIdAndUpdate } = require("../models/Article")
const Article = require("../models/Article")
const Category = require('../models/Category')

const controller = {}

controller.new = async (req, res) => {
    try {
        let article = req.body
        article.slug = slugify(article.title)
        await Article.create(article)
        res.status(201).end()
    }
    catch (err) {
        console.error(err)
        res.status(500).end()
    }
}

controller.list = async (req, res) => {
    try {
        let data = await Article.find().populate('category', "title").populate('author', "name aboutMe")
        res.send(data)
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
        let data = await Article.paginate({}, options)
        res.send(data)
    } catch (err) {
        console.error(err)
        res.status(404).end()
    }
}

controller.getOne = async (req, res) => {
    const id = req.params.id
    let obj = await Article.findById(id)

    if (obj) res.send(obj)
    else res.status(404).end()
}

controller.update = async (req, res) => {
    try {
        const id = req.body._id
        let obj = await Article.findByIdAndUpdate(id, req.body)

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
        let obj = await Article.findByIdAndDelete(id)

        if (obj) res.status(204).end()
        else res.status(404).end()
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
}

module.exports = controller