const express = require('express');
const { productsController } = require('../controllers');

const router = express.Router();

router.get('/:id', productsController.findById);

router.get('/', productsController.findAll);

module.exports = router;