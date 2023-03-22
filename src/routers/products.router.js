const express = require('express');
const { productsController } = require('../controllers');
const hasName = require('../middlewares/hasName');

const router = express.Router();

router.get('/:id', productsController.findById);

router.put('/:id', hasName, productsController.updateById);

router.get('/', productsController.findAll);

router.post('/', hasName, productsController.insert);

module.exports = router;