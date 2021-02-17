const slugify = require('slugify')
const { findByIdAndUpdate } = require("../models/Comment")
const Comment = require("../models/Comment")

const controller = {}

controller.new = async (req, res) => {
    try {
        let comment = req.body
        comment.slug = slugify(comment.title)
        await Comment.create(comment)
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
        //let data = await Comment.find()
        //res.send(data)
    }
    catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
}

controller.getOne = async (req, res) => {
    const id = req.params.id
    let obj = await Comment.findById(id)

    if (obj) res.send(obj)
    else res.status(404).end()
}

controller.update = async (req, res) => {
    try {
        const id = req.body._id
        let obj = await Comment.findByIdAndUpdate(id, req.body)

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
        let obj = await Comment.findByIdAndDelete(id)

        if (obj) res.status(204).end()
        else res.status(404).end()
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
}

*/

module.exports = controller