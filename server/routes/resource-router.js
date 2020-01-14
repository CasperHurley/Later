const express = require('express')

const ResourceCtrl = require('../controllers/resource-ctrl')

const router = express.Router()

router.post('/resource', ResourceCtrl.createResource)
router.put('/resource/:id', ResourceCtrl.updateResource)
router.delete('/resource/:id', ResourceCtrl.deleteResource)
router.get('/resource/:id', ResourceCtrl.getResourceById)
router.get('/resources', ResourceCtrl.getResources)

module.exports = router