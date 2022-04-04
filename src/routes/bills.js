const express = require('express')
const router = express.Router()

router.get('/:typedLine', require('../services/listByTypedLine'))

module.exports = router