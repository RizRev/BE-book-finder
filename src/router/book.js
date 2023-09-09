const express = require("express");
const router = express.Router();
const {bookController} = require("../controller/book")

router.get('/all', bookController.getBook);
router.post('/', bookController.postFavorite);
router.delete('/:id',bookController.deleteFavorite);

module.exports = router