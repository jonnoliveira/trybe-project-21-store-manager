const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

// router.post('/', salesController.insertSale);

router.get('/:id', salesController.findById);

router.get('/', salesController.findAll);

module.exports = router;