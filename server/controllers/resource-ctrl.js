const Resource = require('../models/resource-model')

createResource = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a resource',
        })
    }

    const resource = new Resource(body)

    if (!resource) {
        return res.status(400).json({ success: false, error: err })
    }

    resource
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: resource._id,
                message: 'Resource created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Resource not created!',
            })
        })
}

updateResource = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Resource.findOne({ _id: req.params.id }, (err, resource) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Resource not found!',
            })
        }
        resource.name = body.name
        resource.time = body.time
        resource.rating = body.rating
        resource
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: resource._id,
                    message: 'Resource updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Resource not updated!',
                })
            })
    })
}

deleteResource = async (req, res) => {
    await Resource.findOneAndDelete({ _id: req.params.id }, (err, resource) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!resource) {
            return res
                .status(404)
                .json({ success: false, error: `Resource not found` })
        }

        return res.status(200).json({ success: true, data: resource })
    }).catch(err => console.log(err))
}

getResourceById = async (req, res) => {
    await Resource.findOne({ _id: req.params.id }, (err, resource) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!resource) {
            return res
                .status(404)
                .json({ success: false, error: `Resource not found` })
        }
        return res.status(200).json({ success: true, data: resource })
    }).catch(err => console.log(err))
}

getResources = async (req, res) => {
    await Resource.find({}, (err, resources) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!resources.length) {
            return res
                .status(404)
                .json({ success: false, error: `Resource not found` })
        }
        return res.status(200).json({ success: true, data: resources })
    }).catch(err => console.log(err))
}

module.exports = {
    createResource,
    updateResource,
    deleteResource,
    getResources,
    getResourceById,
}